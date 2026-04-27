package org.example.eventpi.repository;

import org.example.eventpi.model.EventProgram;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EventProgramRepository extends JpaRepository<EventProgram, Long> {

    /** Fetches slots with their speaker in one query (avoids N+1). */
    @Query("SELECT p FROM EventProgram p LEFT JOIN FETCH p.speaker WHERE p.event.id = :eventId ORDER BY p.orderIndex ASC")
    List<EventProgram> findByEventIdWithSpeaker(@Param("eventId") Long eventId);

    List<EventProgram> findByEventIdOrderByOrderIndexAsc(Long eventId);

    void deleteByEventId(Long eventId);
}