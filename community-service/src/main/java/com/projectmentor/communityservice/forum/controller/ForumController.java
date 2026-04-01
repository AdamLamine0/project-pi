package com.projectmentor.communityservice.forum.controller;

import com.projectmentor.communityservice.forum.dto.CreatePostDTO;
import com.projectmentor.communityservice.forum.model.Comment;
import com.projectmentor.communityservice.forum.model.ForumPost;
import com.projectmentor.communityservice.forum.service.ForumService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/api/community/forums")

@RequiredArgsConstructor

public class ForumController {

    private final ForumService forumService;

    @PostMapping
    public ForumPost createPost(@RequestBody CreatePostDTO dto) {

        return forumService.createPost(dto);

    }

    @GetMapping
    public List<ForumPost> getAllPosts() {

        return forumService.getAllPosts();

    }

    @PostMapping("/{postId}/comments")
    public ForumPost addComment(
            @PathVariable String postId,
            @RequestBody Comment comment
    ) {
        return forumService.addComment(postId, comment);
    }
    @GetMapping("/paged")
    public Page<ForumPost> getPagedPosts(Pageable pageable) {
        return forumService.getPosts(pageable);
    }

    @GetMapping("/sector/{sector}")
    public Page<ForumPost> getBySector(
            @PathVariable String sector,
            Pageable pageable) {
        return forumService.getPostsBySector(sector, pageable);
    }
    @PutMapping("/{postId}/like")
    public ForumPost likePost(
            @PathVariable String postId,
            @RequestParam String userId) {
        return forumService.likePost(postId, userId);
    }
    @GetMapping("/search")
    public List<ForumPost> searchPosts(@RequestParam String keyword) {
        return forumService.searchPosts(keyword);
    }
    @GetMapping("/group/{groupId}")
    public List<ForumPost> getPostsByGroup(@PathVariable String groupId) {
        return forumService.getPostsByGroup(groupId);
    }

    @GetMapping("/group/{groupId}/paged")
    public Page<ForumPost> getPostsByGroupPaged(
            @PathVariable String groupId,
            Pageable pageable) {
        return forumService.getPostsByGroupPaged(groupId, pageable);
    }
}