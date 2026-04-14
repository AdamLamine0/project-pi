package org.example.eventpi.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "badges")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Badge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "event_id")
    private Long eventId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BadgeType type;

    @Column(name = "label", length = 200)
    private String label;

    @Column(name = "earned_at", nullable = false)
    private LocalDateTime earnedAt;

    @Column(name = "series_tag", length = 100)
    private String seriesTag;

    @PrePersist
    protected void onCreate() {
        if (earnedAt == null) earnedAt = LocalDateTime.now();
    }
}