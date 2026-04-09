package org.example.eventpi.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "certificates")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Certificate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "event_id", nullable = false)
    private Long eventId;

    @Column(name = "badge_id")
    private Long badgeId;

    @Column(name = "recipient_name", length = 200)
    private String recipientName;

    @Column(name = "event_title", length = 200)
    private String eventTitle;

    @Column(name = "event_date")
    private LocalDateTime eventDate;

    @Column(name = "verification_token", unique = true, length = 100)
    private String verificationToken;

    @Column(name = "pdf_path", length = 300)
    private String pdfPath;

    @Column(name = "generated_at", updatable = false)
    private LocalDateTime generatedAt;

    @PrePersist
    protected void onCreate() {
        if (generatedAt == null) generatedAt = LocalDateTime.now();
    }
}