package com.projectmentor.communityservice.messaging.service;

import com.projectmentor.communityservice.messaging.model.ChatMessage;
import com.projectmentor.communityservice.messaging.model.MessageType;
import com.projectmentor.communityservice.messaging.repository.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatMessageRepository repository;

    // sauvegarder un message de groupe
    public ChatMessage saveGroupMessage(ChatMessage message) {
        message.setSentAt(LocalDateTime.now());
        message.setRead(false);
        message.setType(MessageType.CHAT);
        return repository.save(message);
    }

    // sauvegarder un message privé
    public ChatMessage savePrivateMessage(ChatMessage message) {
        message.setSentAt(LocalDateTime.now());
        message.setRead(false);
        message.setType(MessageType.PRIVATE);
        return repository.save(message);
    }

    // historique messages d'un groupe
    public List<ChatMessage> getGroupHistory(String groupId) {
        return repository.findByGroupIdOrderBySentAtAsc(groupId);
    }

    // historique conversation privée
    public List<ChatMessage> getPrivateHistory(String senderId, String receiverId) {
        return repository.findBySenderIdAndReceiverIdOrReceiverIdAndSenderIdOrderBySentAtAsc(
                senderId, receiverId, receiverId, senderId
        );
    }

    // messages non lus
    public List<ChatMessage> getUnreadMessages(String memberId) {
        return repository.findByReceiverIdAndReadFalse(memberId);
    }

    // marquer comme lu
    public void markAsRead(String messageId) {
        repository.findById(messageId).ifPresent(msg -> {
            msg.setRead(true);
            repository.save(msg);
        });
    }
}