package com.projectmentor.communityservice.messaging.repository;

import com.projectmentor.communityservice.messaging.model.ChatMessage;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ChatMessageRepository extends MongoRepository<ChatMessage, String> {

    // historique d'un groupe
    List<ChatMessage> findByGroupIdOrderBySentAtAsc(String groupId);

    // historique conversation privée entre deux membres
    List<ChatMessage> findBySenderIdAndReceiverIdOrSenderIdAndReceiverIdOrderBySentAtAsc(
            String senderId, String receiverId,
            String senderId2, String receiverId2
    );

    // messages non lus d'un membre
    List<ChatMessage> findByReceiverIdAndReadFalse(String receiverId);
}