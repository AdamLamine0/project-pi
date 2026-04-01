package com.projectmentor.communityservice.forum.model;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Comment {

    private String authorId;
    private String content;
    private LocalDateTime createdAt;

}