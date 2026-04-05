package org.example.eventpi.repository;

import org.example.eventpi.model.EventProgram;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EventProgramRepository extends JpaRepository<EventProgram, Long> {
    List<EventProgram> findByEventIdOrderByOrderIndexAsc(Long eventId);
    void deleteByEventId(Long eventId);
}