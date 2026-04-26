package org.example.eventpi.repository;

import org.example.eventpi.model.Event;
import org.example.eventpi.model.EventStatus;
import org.example.eventpi.model.EventType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    /** Acquires a row-level write lock — use inside @Transactional to prevent
     *  concurrent over-booking when multiple registrations arrive at once. */
    @Query(value = "SELECT * FROM events WHERE id = :id FOR UPDATE", nativeQuery = true)
    Optional<Event> findByIdForUpdate(Long id);

    List<Event> findByStatus(EventStatus status);
    List<Event> findByType(EventType type);
    List<Event> findByOrganizerId(Integer organizerId);

    List<Event> findByStatusOrderBySubmittedAtAsc(EventStatus status);
    List<Event> findByOrganizerIdAndStatus(Integer organizerId, EventStatus status);

    List<Event> findByOrganizerIdAndType(Integer organizerId, EventType type);

    /** Events in the same calendar week as the proposed date, excluding cancelled/rejected/draft states. */
    @Query("""
        SELECT e FROM Event e
        WHERE e.startDate BETWEEN :weekStart AND :weekEnd
          AND e.status NOT IN ('ANNULE', 'REJETE', 'BROUILLON')
        """)
    List<Event> findEventsInWeek(@Param("weekStart") LocalDateTime weekStart,
                                  @Param("weekEnd") LocalDateTime weekEnd);
}