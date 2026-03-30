package org.example.eventpi.repository;

import org.example.eventpi.model.EventRegistration;
import org.example.eventpi.model.RegistrationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventRegistrationRepository
        extends JpaRepository<EventRegistration, Long> {

    List<EventRegistration> findByEventId(Long eventId);
    List<EventRegistration> findByUserId(Integer userId);

    Optional<EventRegistration> findByEventIdAndUserId(
            Long eventId, Integer userId);

    boolean existsByEventIdAndUserId(Long eventId, Integer userId);

    long countByEventIdAndStatus(Long eventId, RegistrationStatus status);


    Optional<EventRegistration> findFirstByEventIdAndStatusOrderByRegisteredAtAsc(
            Long eventId, RegistrationStatus status);
}