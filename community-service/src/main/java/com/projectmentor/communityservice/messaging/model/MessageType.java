package com.projectmentor.communityservice.messaging.model;

public enum MessageType {
    CHAT,       // message normal dans un groupe
    PRIVATE,    // message privé entre deux membres
    JOIN,       // notification d'entrée dans un groupe
    LEAVE       // notification de sortie
}