package org.example.eventpi.repository;

import org.example.eventpi.model.Speaker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface SpeakerRepository extends JpaRepository<Speaker, Long> {
    List<Speaker> findByFullNameContainingIgnoreCase(String name);
    /** Used for deduplication: reuse an existing speaker when the same LinkedIn URL is imported again. */
    Optional<Speaker> findByLinkedinUrl(String linkedinUrl);
}