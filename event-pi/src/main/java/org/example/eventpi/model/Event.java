package org.example.eventpi.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.BatchSize;

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

    @Column(name = "end_date")
    private LocalDateTime endDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "location_type")
    private LocationType locationType;

    @Column(name = "location", length = 300)
    private String location;

    @Column(name = "address", length = 500)
    private String address;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    @Column(name = "ticket_price")
    private Double ticketPrice;

    @Column(name = "capacity_max")
    private Integer capacityMax;

    // Tracks remaining seats; initialised from capacityMax on persist
    @Column(name = "available_places")
    private Integer availablePlaces;

    @Column(name = "is_full", nullable = false)
    @Builder.Default
    private Boolean isFull = false;

    @Column(name = "cover_image_url")
    private String coverImageUrl;

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "event_target_sectors",
            joinColumns = @JoinColumn(name = "event_id"))
    @Column(name = "sector")
    @BatchSize(size = 50)
    private List<String> targetSector;

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "event_target_stages",
            joinColumns = @JoinColumn(name = "event_id"))
    @Column(name = "stage")
    @BatchSize(size = 50)
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
        if (isFull == null) isFull = false;
        // Initialise availablePlaces from capacityMax when first saved
        if (availablePlaces == null && capacityMax != null) {
            availablePlaces = capacityMax;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // ── Capacity helpers ──────────────────────────────────────────────────

    /** Decrement one seat. Marks event full when the last seat is taken. */
    public void decrementAvailablePlaces() {
        decrementAvailablePlaces(1);
    }

    /** Decrement n seats. Marks event full when no seats remain. */
    public void decrementAvailablePlaces(int n) {
        if (capacityMax == null) return;
        int current = availablePlaces != null ? availablePlaces : 0;
        availablePlaces = Math.max(0, current - n);
        if (availablePlaces <= 0) {
            availablePlaces = 0;
            isFull = true;
        }
    }

    /** Restore one seat (on cancellation). Clears the full flag if needed. */
    public void incrementAvailablePlaces() {
        incrementAvailablePlaces(1);
    }

    /** Restore n seats (on cancellation). Clears the full flag if needed. */
    public void incrementAvailablePlaces(int n) {
        if (capacityMax == null) return;
        int current = availablePlaces != null ? availablePlaces : 0;
        availablePlaces = Math.min(capacityMax, current + n);
        if (Boolean.TRUE.equals(isFull) && availablePlaces > 0) {
            isFull = false;
        }
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