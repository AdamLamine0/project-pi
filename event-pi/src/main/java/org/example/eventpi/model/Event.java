package org.example.eventpi.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "events")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = {"registrations", "program", "speakers"})
@EqualsAndHashCode(exclude = {"registrations", "program", "speakers"})
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

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "event_target_sectors",
            joinColumns = @JoinColumn(name = "event_id"))
    @Column(name = "sector")
    private List<String> targetSector;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "event_target_stages",
            joinColumns = @JoinColumn(name = "event_id"))
    @Column(name = "stage")
    private List<String> targetStage;

    @Column(name = "organizer_id")
    private Integer organizerId;



    @Column(name = "organizer_role", length = 50)
    private String organizerRole;

    @Column(name = "rejection_reason", columnDefinition = "TEXT")
    private String rejectionReason;

    @Column(name = "validated_by")
    private Integer validatedBy;

    @Column(name = "validated_at")
    private LocalDateTime validatedAt;

    @Column(name = "submitted_at")
    private LocalDateTime submittedAt;



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

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL,
            fetch = FetchType.LAZY)
    private List<EventRegistration> registrations;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL,
            fetch = FetchType.LAZY, orphanRemoval = true)
    @OrderBy("orderIndex ASC")
    private List<EventProgram> program;

    @ManyToMany(mappedBy = "events", fetch = FetchType.LAZY)
    private List<Speaker> speakers;
}