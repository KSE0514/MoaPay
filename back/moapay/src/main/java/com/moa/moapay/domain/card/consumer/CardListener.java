package com.moa.moapay.domain.card.consumer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.moa.moapay.domain.card.model.vo.PaymentResultCardInfoVO;
import com.moa.moapay.domain.card.service.MyCardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
@Slf4j
@RequiredArgsConstructor
public class CardListener {

    private final ObjectMapper objectMapper;
    private final MyCardService myCardService;

    @KafkaListener(topics = "request.renew-card-info", groupId = "payments_consumer_group")
    public void renewCardInfo(String message) {
        try {
            Map<String, Object> vo = objectMapper.readValue(message, Map.class);
            log.info("received renew card info message");
            List<PaymentResultCardInfoVO> renewList = (List<PaymentResultCardInfoVO>) vo.get("renewList");
            myCardService.renewCardInfo(renewList);
        } catch (Exception e) {
            // 시행 중에 에러가 발생하면, 에러로그같은 걸 쌓아두는 게 정석일 것 같다...
        }
    }
}
