package org.example.partenariatpi.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "transcript_lines", indexes = {
        @Index(name = "idx_transcript_meeting_id", columnList = "meetingId")
})
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class TranscriptLine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String meetingId;  // ID Zoom de la réunion

    @Column(nullable = false, length = 30)
    private String speaker;  // "Intervenant 00", "Intervenant 01"

    @Column(length = 10)
    private String language; // "FR", "EN", etc.

    @Column(columnDefinition = "TEXT", nullable = false)
    private String text;     // Texte transcrit

    @Column(nullable = false)
    private Double startTimestamp; // en secondes (ex: 12.5)

    @Column(nullable = false)
    private Double endTimestamp;   // en secondes (ex: 25.8)

    @Column(nullable = false)
    private LocalDateTime createdAt;
}