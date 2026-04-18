package com.projectmentor.communityservice.forum.service;

import com.projectmentor.communityservice.forum.dto.CreatePostDTO;
import com.projectmentor.communityservice.forum.model.Comment;
import com.projectmentor.communityservice.forum.model.ForumGroup;
import com.projectmentor.communityservice.forum.model.ForumPost;
import com.projectmentor.communityservice.forum.model.PostStatus;
import com.projectmentor.communityservice.forum.repository.ForumPostRepository;
import com.projectmentor.communityservice.forum.repository.ForumGroupRepository;
import com.projectmentor.communityservice.network.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.data.mongodb.core.query.TextCriteria;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service

@RequiredArgsConstructor

public class ForumService {

    private final ForumPostRepository repository;

    private final ForumGroupRepository groupRepository;

    private final UserService userService;

    public ForumPost createPost(CreatePostDTO dto) {

        // vérifier que le groupe existe si groupId fourni et non vide
        String groupId = dto.getGroupId() == null ? null : dto.getGroupId().trim();
        if (groupId != null && groupId.isBlank()) {
            groupId = null;
        }

        String groupName = null;
        if (groupId != null) {
            ForumGroup group = groupRepository.findById(groupId)
                    .orElseThrow(() -> new RuntimeException("Group not found"));
            groupName = group.getName();
        }

        String authorName = null;
        if (dto.getAuthorId() != null) {
            try {
                authorName = userService.getUserName(Long.parseLong(dto.getAuthorId()));
            } catch (NumberFormatException ignored) {
                authorName = null;
            }
        }

        ForumPost post = ForumPost.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .tags(dto.getTags())
                .sector(dto.getSector())
                .authorId(dto.getAuthorId())
                .authorName(authorName)
                .groupId(groupId)
                .groupName(groupName)
                .status(PostStatus.OPEN)
                .viewsCount(0)
                .likesCount(0)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return repository.save(post);
    }

    public List<ForumPost> getAllPosts() {
        List<ForumPost> posts = repository.findAll();
        posts.forEach(this::enrichPostWithAuthorNames);
        return posts;
    }

    private void enrichPostWithAuthorNames(ForumPost post) {
        if (post.getAuthorId() != null) {
            // Re-fetch if name is missing or looks like a fallback (Utilisateur XX)
            if (post.getAuthorName() == null || post.getAuthorName().isEmpty() || 
                post.getAuthorName().startsWith("Utilisateur ")) {
                try {
                    post.setAuthorName(userService.getUserName(Long.parseLong(post.getAuthorId())));
                } catch (Exception ignored) {
                    // Keep original or use ID as fallback
                }
            }
        }
        
        if (post.getComments() != null) {
            post.getComments().forEach(comment -> enrichCommentWithAuthorNames(comment));
        }
    }

    private void enrichCommentWithAuthorNames(Comment comment) {
        if (comment.getAuthorId() != null) {
            // Re-fetch if name is missing or looks like a fallback (Utilisateur XX)
            if (comment.getAuthorName() == null || comment.getAuthorName().isEmpty() || 
                comment.getAuthorName().startsWith("Utilisateur ")) {
                try {
                    comment.setAuthorName(userService.getUserName(Long.parseLong(comment.getAuthorId())));
                } catch (Exception ignored) {
                    // Keep original or use ID as fallback
                }
            }
        }
        
        if (comment.getReplies() != null) {
            comment.getReplies().forEach(this::enrichCommentWithAuthorNames);
        }
    }

    public ForumPost addComment(String postId, Comment comment) {

        ForumPost post = repository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        // si la liste n'existe pas encore → on la crée
        if (post.getComments() == null) {
            post.setComments(new ArrayList<>());
        }

        comment.setCreatedAt(LocalDateTime.now());
        
        // Resolve author name
        if (comment.getAuthorId() != null) {
            try {
                comment.setAuthorName(userService.getUserName(Long.parseLong(comment.getAuthorId())));
            } catch (NumberFormatException ignored) {
                comment.setAuthorName(null);
            }
        }

        post.getComments().add(comment);

        ForumPost saved = repository.save(post);
        enrichPostWithAuthorNames(saved);
        return saved;
    }

    public ForumPost addReplyToComment(String postId, int commentIndex, Comment reply) {
        ForumPost post = repository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        if (post.getComments() == null || commentIndex < 0 || commentIndex >= post.getComments().size()) {
            throw new RuntimeException("Comment not found");
        }

        Comment parentComment = post.getComments().get(commentIndex);
        if (parentComment.getReplies() == null) {
            parentComment.setReplies(new ArrayList<>());
        }

        reply.setCreatedAt(LocalDateTime.now());
        
        // Resolve author name for reply
        if (reply.getAuthorId() != null) {
            try {
                reply.setAuthorName(userService.getUserName(Long.parseLong(reply.getAuthorId())));
            } catch (NumberFormatException ignored) {
                reply.setAuthorName(null);
            }
        }

        parentComment.getReplies().add(reply);
        ForumPost saved = repository.save(post);
        enrichPostWithAuthorNames(saved);
        return saved;
    }
    public Page<ForumPost> getPosts(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public Page<ForumPost> getPostsBySector(String sector, Pageable pageable) {
        return repository.findBySector(sector, pageable);
    }

    public ForumPost likePost(String postId, String userId) {

        ForumPost post = repository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        if (post.getLikedBy() == null) {
            post.setLikedBy(new ArrayList<>());
        }

        // si déjà liké → unlike
        if (post.getLikedBy().contains(userId)) {
            post.getLikedBy().remove(userId);
            post.setLikesCount(post.getLikesCount() - 1);
        } else {
            // sinon → like
            post.getLikedBy().add(userId);
            post.setLikesCount(post.getLikesCount() + 1);
        }

        ForumPost saved = repository.save(post);
        enrichPostWithAuthorNames(saved);
        return saved;
    }
    public ForumPost updatePost(String postId, CreatePostDTO dto) {
        ForumPost post = repository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        post.setTitle(dto.getTitle());
        post.setContent(dto.getContent());
        post.setTags(dto.getTags());
        post.setSector(dto.getSector());
        post.setUpdatedAt(LocalDateTime.now());
        ForumPost saved = repository.save(post);
        enrichPostWithAuthorNames(saved);
        return saved;
    }

    public void deletePost(String postId) {
        ForumPost post = repository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        post.setStatus(PostStatus.ARCHIVED);
        repository.save(post);
    }
    public List<ForumPost> searchPosts(String keyword) {
        TextCriteria criteria = TextCriteria
                .forDefaultLanguage()
                .matchingAny(keyword);
        List<ForumPost> posts = repository.findAllBy(criteria);
        posts.forEach(this::enrichPostWithAuthorNames);
        return posts;
    }
    public List<ForumPost> getPostsByGroup(String groupId) {
        List<ForumPost> posts = repository.findByGroupId(groupId);
        posts.forEach(this::enrichPostWithAuthorNames);
        return posts;
    }

    public Page<ForumPost> getPostsByGroupPaged(String groupId, Pageable pageable) {
        return repository.findByGroupId(groupId, pageable);
    }
}