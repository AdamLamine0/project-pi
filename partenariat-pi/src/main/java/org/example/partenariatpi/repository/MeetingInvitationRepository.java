package org.example.partenariatpi.repository;

import org.example.partenariatpi.enums.MeetingStatus;
import org.example.partenariatpi.model.MeetingInvitation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MeetingInvitationRepository extends JpaRepository<MeetingInvitation, Long> {

    Optional<MeetingInvitation> findByZoomMeetingId(String zoomMeetingId);


    List<MeetingInvitation> findByPartenaireIdOrderBySuggestedDateTimeDesc(Integer partenaireId);

    List<MeetingInvitation> findBySenderUserIdOrTargetUserIdOrderBySuggestedDateTimeDesc(
            Integer senderUserId,
            Integer targetUserId
    );

    List<MeetingInvitation> findAllByOrderBySuggestedDateTimeDesc();

    List<MeetingInvitation> findByPartenaireIdAndMeetingStatusOrderBySuggestedDateTimeDesc(
            Integer partenaireId, MeetingStatus meetingStatus);
}

