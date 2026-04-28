package org.example.partenariatpi.repository;

import org.example.partenariatpi.model.MeetingInvitation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MeetingInvitationRepository extends JpaRepository<MeetingInvitation, Long> {

    List<MeetingInvitation> findByPartenaireIdOrderBySuggestedDateTimeDesc(Integer partenaireId);

    List<MeetingInvitation> findBySenderUserIdOrTargetUserIdOrderBySuggestedDateTimeDesc(
            Integer senderUserId,
            Integer targetUserId
    );

    List<MeetingInvitation> findAllByOrderBySuggestedDateTimeDesc();
}

