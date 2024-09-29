package com.moa.payment.domain.notification.service;

import com.moa.payment.domain.notification.model.SerializableSSE;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.UUID;

public interface NotificationService {

    <T> void sendToClient(UUID code, T data, String comment);
    SerializableSSE createEmitter(UUID id);
    SerializableSSE subscribe(UUID id);
    void sendEvent(UUID sendId, Object data);
}
