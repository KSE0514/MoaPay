package com.moa.payment.domain.notification.service;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface NotificationService {
    <T> void customNotify(Long userId, T data, String comment, String type);

    void paynotify(Long userId, Object data, String comment);

    void sendToClient(Long userId, Object data, String comment);

    <T> void sendToClient(Long userId, T data, String comment, String type);

    SseEmitter createEmitter(Long id);
    SseEmitter subscribe(Long id);
    void sendEvent(Long sendId, Object data);
}
