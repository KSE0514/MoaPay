package com.moa.payment.domain.notification.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.moa.payment.domain.notification.model.SerializableSSE;
import com.moa.payment.domain.notification.repository.EmitterRedisRepository;
import com.moa.payment.domain.notification.repository.EmitterRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationServiceImpl implements NotificationService {
    //타임아웃 설정
    private static final long DEFAULT_TIMEOUT = 20L * 1000 * 60; // timeout은 약 20분
    private final EmitterRepository emitterRepository;
    private final EmitterRedisRepository emitterRedisRepository;

    @Override
    public SerializableSSE subscribe(UUID code) {
        SerializableSSE emitter = createEmitter(code);
        sendToClient(code, "EventStream Created. [code="+ code + "]", "sse 접속 성공");
        return emitter;
    }

    @Override
    public void sendToClient(UUID code, Object data, String comment) {
        SerializableSSE emitter = emitterRedisRepository.get(code);
        if (emitter != null) {
            try {
                String jsonData = new ObjectMapper().writeValueAsString(data); // 데이터를 JSON으로 변환
                emitter.send(SerializableSSE.event()
                        .id(code.toString())
                        .name("sse")
                        .data(jsonData) // 변환된 JSON 데이터를 보냄
                        .comment(comment));
            } catch (IOException e) {
                emitter.completeWithError(e);
            }
        }
    }


    @Override
    public SerializableSSE createEmitter(UUID id) {
        SerializableSSE emitter = new SerializableSSE(DEFAULT_TIMEOUT);
        // 어차피 timeout이 지나면 사라지므로 따로 삭제 처리는 하지 않는다
        emitterRedisRepository.save(id, emitter);
//        emitterRepository.save(id, emitter);
//
//        emitter.onCompletion(() -> emitterRepository.deleteById(id));
//        emitter.onTimeout(() -> emitterRepository.deleteById(id));

        return emitter;
    }

    @Override
    public void sendEvent(UUID code, Object data) {
        log.info("send event");
        SerializableSSE emitter = emitterRedisRepository.get(code);
        if(emitter != null) {
            try {
                emitter.send(SseEmitter.event().id(code.toString()).name("결제 완료").data(data));
                // 결제 프로세스가 완료되면 더이상 구독은 필요 없으므로 emitter를 종료시킨다
                emitter.complete();
            } catch (IOException e) {
                emitter.completeWithError(e);
            }
        }
    }
}
