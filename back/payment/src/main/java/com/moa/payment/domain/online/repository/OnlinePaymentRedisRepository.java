package com.moa.payment.domain.online.repository;

import com.moa.payment.domain.online.model.dto.GetOnlineQRCodeRequestDto;
import com.moa.payment.global.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.keyvalue.core.KeyValueOperations;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.util.HashMap;

@Component
@RequiredArgsConstructor
public class OnlinePaymentRedisRepository {

    private final RedisTemplate<String, String> redisTemplate;

    public boolean QRCodeRegistTest(String QRCode) {
        HashOperations<String, String, String> ops = redisTemplate.opsForHash();
        return ops.putIfAbsent(QRCode,"exist", "check");
    }

    public void RegistQRCodeInfo(int QRCode, GetOnlineQRCodeRequestDto dto) {
        HashOperations<String, String, String> ops = redisTemplate.opsForHash();
        String qr = "QR:"+String.valueOf(QRCode);
        ops.put(qr, "orderId", dto.getOrderId().toString());
        ops.put(qr, "merchantId", dto.getMerchantId().toString());
        ops.put(qr, "merchantName", dto.getMerchantName());
        ops.put(qr, "categoryId", dto.getCategoryId());
        ops.put(qr, "totalPrice", String.valueOf(dto.getTotalPrice()));
    }

    public HashMap<String, String> findQRCodeInfo(String QRCode) {
        HashOperations<String, String, String> ops = redisTemplate.opsForHash();
        String qr = "QR:"+QRCode;
        if(!ops.hasKey(qr, "exist")) {
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

}
