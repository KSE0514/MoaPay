package com.moa.payment.domain.notification.repository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Component
@Slf4j
@RequiredArgsConstructor
public class EmitterRedisRepository {

    private final RedisTemplate<String, String> redisTemplate;
    private final RedisTemplate<String, Object> redisEmiiterTemplate;

    public void save(UUID code, SseEmitter emitter) {
        ValueOperations<String, Object> ops = redisEmiiterTemplate.opsForValue();
        // key는 태그를 붙인 값으로 사용
        String key = "emitter:"+code.toString().replaceAll("-", "");
        ops.setIfAbsent(key, emitter);
        redisEmiiterTemplate.expire(key, 20, TimeUnit.MINUTES); // 시간 지나면 알아서 사라지도록
    }

    public SseEmitter get(UUID code) {
        ValueOperations<String, Object> ops = redisEmiiterTemplate.opsForValue();
        String key = "emitter:"+code.toString().replaceAll("-", "");
        return (SseEmitter) ops.get(key);
    }

}
