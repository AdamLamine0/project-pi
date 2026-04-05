package org.example.eventpi.repository;

import org.example.eventpi.model.Badge;
import org.example.eventpi.model.BadgeType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BadgeRepository extends JpaRepository<Badge, Long> {

    List<Badge> findByUserId(Integer userId);

    boolean existsByUserIdAndEventIdAndType(Integer userId, Long eventId,
                                            BadgeType type);

    long countByUserIdAndSeriesTag(Integer userId, String seriesTag);
}