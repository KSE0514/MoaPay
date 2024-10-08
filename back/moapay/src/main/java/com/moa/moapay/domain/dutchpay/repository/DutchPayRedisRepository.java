package com.moa.moapay.domain.dutchpay.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.concurrent.TimeUnit;

@Component
public class DutchPayRedisRepository {
    private static final String FCM_TOKEN_KEY_PREFIX = "fcm_token:";
    public final RedisTemplate<String, String> redisTemplate;

    @Autowired
    public DutchPayRedisRepository(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    // FCM 토큰 저장 메서드
    public void save(String dutchId, String requestId) {
        String key = FCM_TOKEN_KEY_PREFIX + dutchId;
        redisTemplate.opsForValue().set(key, requestId, 3600 * 2, TimeUnit.SECONDS);
    }

    // FCM 토큰 조회 메서드
    public String getToken(String dutchId) {
        String key = FCM_TOKEN_KEY_PREFIX + dutchId;
        return redisTemplate.opsForValue().get(key);
    }

}
