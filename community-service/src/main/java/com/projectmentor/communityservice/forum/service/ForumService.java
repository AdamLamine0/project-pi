package com.projectmentor.communityservice.forum.service;

import com.projectmentor.communityservice.forum.dto.CreatePostDTO;
import com.projectmentor.communityservice.forum.model.Comment;
import com.projectmentor.communityservice.forum.model.ForumGroup;
import com.projectmentor.communityservice.forum.model.ForumPost;
import com.projectmentor.communityservice.forum.model.PostStatus;
import com.projectmentor.communityservice.forum.repository.ForumPostRepository;
import com.projectmentor.communityservice.forum.repository.ForumGroupRepository;
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

    public ForumPost createPost(CreatePostDTO dto) {

        // vérifier que le groupe existe si groupId fourni
        String groupName = null;
        if (dto.getGroupId() != null) {
            ForumGroup group = groupRepository.findById(dto.getGroupId())
                    .orElseThrow(() -> new RuntimeException("Group not found"));
            groupName = group.getName();
        }

        ForumPost post = ForumPost.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .tags(dto.getTags())
                .sector(dto.getSector())
                .authorId(dto.getAuthorId())
                .groupId(dto.getGroupId())
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
        return repository.findAll();
    }

    public ForumPost addComment(String postId, Comment comment) {

        ForumPost post = repository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        // si la liste n'existe pas encore → on la crée
        if (post.getComments() == null) {
            post.setComments(new ArrayList<>());
        }

        comment.setCreatedAt(LocalDateTime.now());

        post.getComments().add(comment);

        return repository.save(post);
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

        return repository.save(post);
    }
    public List<ForumPost> searchPosts(String keyword) {
        TextCriteria criteria = TextCriteria
                .forDefaultLanguage()
                .matchingAny(keyword);
        return repository.findAllBy(criteria);
    }
    public List<ForumPost> getPostsByGroup(String groupId) {
        return repository.findByGroupId(groupId);
    }

    public Page<ForumPost> getPostsByGroupPaged(String groupId, Pageable pageable) {
        return repository.findByGroupId(groupId, pageable);
    }
}