package com.projectmentor.communityservice.messaging.controller;

import com.projectmentor.communityservice.messaging.model.ChatMessage;
import com.projectmentor.communityservice.messaging.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;

    // ── WebSocket handlers ──────────────────────────

    // message dans un groupe → broadcast à tous les membres du groupe
    @MessageMapping("/chat.group/{groupId}")
    @SendTo("/topic/group/{groupId}")
    public ChatMessage sendGroupMessage(@Payload ChatMessage message) {
        return chatService.saveGroupMessage(message);
    }

    // message privé → envoyé uniquement au destinataire
    @MessageMapping("/chat.private")
    public ChatMessage sendPrivateMessage(@Payload ChatMessage message) {
        ChatMessage saved = chatService.savePrivateMessage(message);
        // envoyer au destinataire spécifique
        messagingTemplate.convertAndSendToUser(
                message.getReceiverId(),
                "/queue/messages",
                saved
        );
        return saved;
    }

    // notification join/leave groupe
    @MessageMapping("/chat.join/{groupId}")
    @SendTo("/topic/group/{groupId}")
    public ChatMessage joinGroup(@Payload ChatMessage message) {
        message.setContent(message.getSenderId() + " a rejoint le groupe");
        return chatService.saveGroupMessage(message);
    }

    // ── REST endpoints pour historique ─────────────

    @GetMapping("/api/community/messages/group/{groupId}")
    public List<ChatMessage> getGroupHistory(@PathVariable String groupId) {
        return chatService.getGroupHistory(groupId);
    }

    @GetMapping("/api/community/messages/private")
    public List<ChatMessage> getPrivateHistory(
            @RequestParam String senderId,
            @RequestParam String receiverId) {
        return chatService.getPrivateHistory(senderId, receiverId);
    }

    @GetMapping("/api/community/messages/unread/{memberId}")
    public List<ChatMessage> getUnreadMessages(@PathVariable String memberId) {
        return chatService.getUnreadMessages(memberId);
    }

    @PutMapping("/api/community/messages/{messageId}/read")
    public void markAsRead(@PathVariable String messageId) {
        chatService.markAsRead(messageId);
    }
}