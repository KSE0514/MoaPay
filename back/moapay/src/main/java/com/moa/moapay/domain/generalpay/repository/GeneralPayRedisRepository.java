package com.moa.moapay.domain.generalpay.repository;

import com.moa.moapay.domain.generalpay.model.dto.ExecuteGeneralPayRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@Slf4j
@RequiredArgsConstructor
public class GeneralPayRedisRepository {

    private final RedisTemplate<String, String> redisTemplate;

    public void registerPaymentInformation(UUID code, ExecuteGeneralPayRequestDto dto) {
        HashOperations<String, String, String> ops = redisTemplate.opsForHash();
        String key = code.toString();
        ops.put(key, "orderId", dto.getOrderId().toString());
        ops.put(key, "merchantId", dto.getMerchantId().toString());
        // 추후 필요한 정보 더 넣기로
    }
}
