package org.example.partenariatpi.repository;

import org.example.partenariatpi.model.TranscriptLine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TranscriptRepository extends JpaRepository<TranscriptLine, Long> {

    // Récupérer tous les segments d'un meeting triés par temps
    List<TranscriptLine> findByMeetingIdOrderByStartTimestampAsc(String meetingId);

    // Voir si une transcription existe déjà pour ce meeting
    boolean existsByMeetingId(String meetingId);

    // Compter le nombre de segments par meeting
    long countByMeetingId(String meetingId);
}