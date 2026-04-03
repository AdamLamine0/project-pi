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
    private Long badgeId;          // linked badge

    // Snapshot of user info at generation time (avoids Feign calls on download)
    @Column(name = "recipient_name", nullable = false, length = 200)
    private String recipientName;

    @Column(name = "event_title", nullable = false, length = 200)
    private String eventTitle;

    @Column(name = "event_date")
    private LocalDateTime eventDate;

    // UUID token used in QR code URL for public verification
    @Column(name = "verification_token", nullable = false, unique = true,
            length = 36)
    private String verificationToken;

    @Column(name = "pdf_path", length = 500)
    private String pdfPath;        // relative path: certificates/uuid.pdf

    @Column(name = "generated_at", nullable = false)
    private LocalDateTime generatedAt;

    @PrePersist
    protected void onCreate() {
        if (generatedAt == null) generatedAt = LocalDateTime.now();
    }
}