package com.moa.moapay.domain.code.repository;

import com.moa.moapay.domain.code.model.dto.GetQRCodeRequestDto;
import com.moa.moapay.global.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.concurrent.TimeUnit;

@Component
@Slf4j
@RequiredArgsConstructor
public class CodeRedisRepository {
    @Value("${spring.redis.qrcode-expire}")
    private int qrCodeExpire;

    private final RedisTemplate<String, String> redisTemplate;

    public boolean QRCodeRegistTest(String QRCode) {
        HashOperations<String, String, String> ops = redisTemplate.opsForHash();
        ValueOperations<String, String> valueOps = redisTemplate.opsForValue();
        if(redisTemplate.hasKey("blacklist:QR:" + QRCode)) {
            return false; // 블랙리스트 내에 존재하는 key를 생성하려고 했다면 키 생성 실패
        }
        return ops.putIfAbsent(QRCode, "exist", "check");
    }

    public void RegistQRCodeInfo(int QRCode, GetQRCodeRequestDto dto) {
        HashOperations<String, String, String> ops = redisTemplate.opsForHash();
        String qr = "QR:" + String.valueOf(QRCode);
        ops.put(qr, "orderId", dto.getOrderId().toString());
        ops.put(qr, "merchantId", dto.getMerchantId().toString());
        ops.put(qr, "merchantName", dto.getMerchantName());
        ops.put(qr, "categoryId", dto.getCategoryId());
        ops.put(qr, "totalPrice", String.valueOf(dto.getTotalPrice()));
        // 데이터를 전부 넣은 후, TIL 설정
        redisTemplate.expire(qr, qrCodeExpire, TimeUnit.MINUTES);
    }

    public HashMap<String, String> findQRCodeInfo(String QRCode) {
        HashOperations<String, String, String> ops = redisTemplate.opsForHash();
        String qr = "QR:" + QRCode;
        if (!ops.hasKey(qr, "exist") || redisTemplate.hasKey("blacklist:QR:" + QRCode)) {
            // 존재하지 않는 QRCode를 보낸 경우, 예외응답 발생
            throw new BusinessException(HttpStatus.BAD_REQUEST, "요청한 코드와 대응되는 정보가 없습니다.");
        }
        HashMap<String, String> result = new HashMap<>();
        result.put("orderId", ops.get(qr, "orderId"));
        result.put("merchantId", ops.get(qr, "merchantId"));
        result.put("merchantName", ops.get(qr, "merchantName"));
        result.put("categoryId", ops.get(qr, "categoryId"));
        result.put("totalPrice", ops.get(qr, "totalPrice"));
        return result;
    }

    public void disableQRCodeInfo(String QRCode) {
        String key = "blacklist:QR:" + QRCode;
        log.info("disable QRCode : {}", key);
        long expireTime = redisTemplate.getExpire("QR:" + QRCode);
        ValueOperations<String, String> ops = redisTemplate.opsForValue();
        ops.append(key, "exist");
        redisTemplate.expire(key, expireTime, TimeUnit.SECONDS);
    }

}
