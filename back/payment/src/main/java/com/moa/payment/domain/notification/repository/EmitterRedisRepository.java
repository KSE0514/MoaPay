package com.moa.payment.domain.notification.repository;

import com.moa.payment.domain.notification.model.SerializableSSE;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Component
@Slf4j
@RequiredArgsConstructor
public class EmitterRedisRepository {

    private final RedisTemplate<String, String> redisTemplate;
    private final RedisTemplate<String, Object> redisObjectTemplate;

    public void save(UUID code, SerializableSSE emitter) {
        ValueOperations<String, Object> ops = redisObjectTemplate.opsForValue();
        ops.setIfAbsent(code.toString(), emitter);
        redisObjectTemplate.expire(code.toString(), 20, TimeUnit.MINUTES); // 시간 지나면 알아서 사라지도록
    }

    public SerializableSSE get(UUID code) {
        ValueOperations<String, Object> ops = redisObjectTemplate.opsForValue();
        return (SerializableSSE) ops.get(code.toString());
    }

}
