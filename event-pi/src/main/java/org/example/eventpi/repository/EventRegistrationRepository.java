package org.example.eventpi.repository;

import org.example.eventpi.model.EventRegistration;
import org.example.eventpi.model.RegistrationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventRegistrationRepository
        extends JpaRepository<EventRegistration, Long> {

    List<EventRegistration> findByEventId(Long eventId);

    // ── Eager-fetch the event in one JOIN query — eliminates N+1 ──────────
    @Query("SELECT r FROM EventRegistration r JOIN FETCH r.event WHERE r.userId = :userId")
    List<EventRegistration> findByUserIdWithEvent(@Param("userId") Integer userId);

    Optional<EventRegistration> findByEventIdAndUserId(Long eventId, Integer userId);

    boolean existsByEventIdAndUserId(Long eventId, Integer userId);

    boolean existsByEventIdAndUserIdAndStatus(
            Long eventId, Integer userId, RegistrationStatus status);

    boolean existsByEventIdAndUserIdAndStatusNot(
            Long eventId, Integer userId, RegistrationStatus status);

    long countByEventIdAndStatus(Long eventId, RegistrationStatus status);

    Optional<EventRegistration> findFirstByEventIdAndStatusOrderByRegisteredAtAsc(
            Long eventId, RegistrationStatus status);

    // ── Count only active registrations, excluding ANNULE / LISTE_ATTENTE ─
    @Query("SELECT COUNT(r) FROM EventRegistration r WHERE r.event.id = :eventId AND r.status IN :statuses")
    long countByEventIdAndStatusIn(@Param("eventId") Long eventId,
                                   @Param("statuses") List<RegistrationStatus> statuses);

    Optional<EventRegistration> findByTicketNumber(String ticketNumber);

    @Query("SELECT r FROM EventRegistration r WHERE UPPER(SUBSTRING(r.ticketNumber, 1, 8)) = UPPER(:code)")
    Optional<EventRegistration> findByShortTicketCode(@Param("code") String code);

    @Query("SELECT r FROM EventRegistration r JOIN FETCH r.event ORDER BY r.registeredAt DESC")
    List<EventRegistration> findAllJoined();

    @Query("SELECT r FROM EventRegistration r JOIN FETCH r.event WHERE r.event.id = :eventId ORDER BY r.registeredAt DESC")
    List<EventRegistration> findAllJoinedByEventId(@Param("eventId") Long eventId);

    @Query("SELECT r FROM EventRegistration r JOIN FETCH r.event WHERE r.status = :status ORDER BY r.registeredAt DESC")
    List<EventRegistration> findAllJoinedByStatus(@Param("status") RegistrationStatus status);

    @Query("SELECT r FROM EventRegistration r JOIN FETCH r.event WHERE r.event.id = :eventId AND r.status = :status ORDER BY r.registeredAt DESC")
    List<EventRegistration> findAllJoinedByEventIdAndStatus(
            @Param("eventId") Long eventId, @Param("status") RegistrationStatus status);
}