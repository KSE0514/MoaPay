package com.moa.payment.domain.notification.service;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import java.util.UUID;

public interface NotificationService {

//    <T> void sendToClient(UUID code, T data, String comment);
    void initialSend(UUID code, SseEmitter emitter);
    SseEmitter createEmitter(UUID id);
    SseEmitter subscribe(UUID id);
    void sendCompleteMessage(UUID id);
//    void sendEvent(UUID sendId, Object data);
}
