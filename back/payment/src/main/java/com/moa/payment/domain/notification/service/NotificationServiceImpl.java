package com.moa.payment.domain.notification.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.moa.payment.domain.notification.repository.EmitterRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationServiceImpl implements NotificationService {
    //타임아웃 설정
    private static final long DEFAULT_TIMEOUT = 60L * 1000 * 60;
    private final EmitterRepository emitterRepository;

    @Override
    public SseEmitter subscribe(Long userId) {
        SseEmitter emitter = createEmitter(userId);

        sendToClient(userId, "EventStream Created. [userId="+ userId + "]", "sse 접속 성공");
        return emitter;
    }

    @Override
    public <T> void customNotify(Long userId, T data, String comment, String type) {
        sendToClient(userId, data, comment, type);
    }

    @Override
    public void paynotify(Long userId, Object data, String comment) {
        sendToClient(userId, data, comment);
    }

    @Override
    public void sendToClient(Long userId, Object data, String comment) {
        SseEmitter emitter = emitterRepository.getById(userId);
        if (emitter != null) {
            try {
                String jsonData = new ObjectMapper().writeValueAsString(data); // 데이터를 JSON으로 변환
                emitter.send(SseEmitter.event()
                        .id(String.valueOf(userId))
                        .name("sse")
                        .data(jsonData) // 변환된 JSON 데이터를 보냄
                        .comment(comment));
            } catch (IOException e) {
                emitterRepository.deleteById(userId);
                emitter.completeWithError(e);
            }
        }
    }


    @Override
    public <T> void sendToClient(Long userId, T data, String comment, String type) {
        SseEmitter emitter = emitterRepository.getById(userId);
        if (emitter != null) {
            try {
                emitter.send(SseEmitter.event()
                        .id(String.valueOf(userId))
                        .name(type)
                        .data(data)
                        .comment(comment));
            } catch (IOException e) {
                emitterRepository.deleteById(userId);
                emitter.completeWithError(e);
            }
        }
    }

    @Override
    public SseEmitter createEmitter(Long id) {
        SseEmitter emitter = new SseEmitter(DEFAULT_TIMEOUT);
        emitterRepository.save(id, emitter);

        emitter.onCompletion(() -> emitterRepository.deleteById(id));
        emitter.onTimeout(() -> emitterRepository.deleteById(id));

        return emitter;
    }

    @Override
    public void sendEvent(Long sendId, Object data) {
        log.info("send event");
        SseEmitter emitter = createEmitter(sendId);
        if(emitter != null) {
            try {
                emitter.send(SseEmitter.event().id(String.valueOf(sendId)).name("알림 테스트").data(data));
            } catch (IOException e) {
                emitter.completeWithError(e);
            }
        }
    }
}
