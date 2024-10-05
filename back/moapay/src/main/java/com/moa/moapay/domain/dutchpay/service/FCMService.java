package com.moa.moapay.domain.dutchpay.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.WebpushConfig;
import com.google.firebase.messaging.WebpushNotification;
import com.moa.moapay.domain.dutchpay.model.dto.FCMTokenDto;
import com.moa.moapay.domain.dutchpay.repository.FCMRedisRepository;
import com.moa.moapay.global.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FCMService {

    private final FCMRedisRepository fcmRedisRepository;

    public void saveToken(FCMTokenDto fcmTokenDto) {

        // 회원 유효성 검사 해야 할듯

        //레디스에 토큰 저장
        fcmRedisRepository.saveToken(String.valueOf(fcmTokenDto.getMemberId()), fcmTokenDto.getToken(), 10000L);
    }

    public void pushNotification(FCMTokenDto fcmTokenDto) {

        if (Boolean.FALSE.equals(fcmRedisRepository.redisTemplate.hasKey(String.valueOf(fcmTokenDto.getMemberId())))) {
            throw new BusinessException(HttpStatus.NOT_FOUND, "토큰을 찾을 수 없습니다");
        }

        try {
            String token = fcmRedisRepository.getToken(String.valueOf(fcmTokenDto.getMemberId()));
            Message message = Message.builder()
                    .setToken(token)
                    .setWebpushConfig(WebpushConfig.builder()
//                            .putHeader("ttl", "300")
                            .setNotification(new WebpushNotification("MoaPay", "test"))
                            .build())
                    .build();
            String response = FirebaseMessaging.getInstance().sendAsync(message).get();
            log.info(response);
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }
}
