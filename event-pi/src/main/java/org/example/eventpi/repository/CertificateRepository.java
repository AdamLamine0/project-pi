package org.example.eventpi.repository;

import org.example.eventpi.model.Certificate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CertificateRepository extends JpaRepository<Certificate, Long> {

    List<Certificate> findByUserId(Integer userId);

    Optional<Certificate> findByVerificationToken(String token);

    boolean existsByUserIdAndEventId(Integer userId, Long eventId);
}