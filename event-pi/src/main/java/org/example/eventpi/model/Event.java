package org.example.eventpi.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "events")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EventType type;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private EventStatus status = EventStatus.BROUILLON;

    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "location_type")
    private LocationType locationType;

    @Column(name = "capacity_max")
    private Integer capacityMax;

    @Column(name = "cover_image_url")
    private String coverImageUrl;

    @ElementCollection
    @CollectionTable(name = "event_target_sectors",
            joinColumns = @JoinColumn(name = "event_id"))
    @Column(name = "sector")
    private List<String> targetSector;

    @ElementCollection
    @CollectionTable(name = "event_target_stages",
            joinColumns = @JoinColumn(name = "event_id"))
    @Column(name = "stage")
    private List<String> targetStage;

    @Column(name = "organizer_id")
    private Integer organizerId;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (status == null) status = EventStatus.BROUILLON;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}