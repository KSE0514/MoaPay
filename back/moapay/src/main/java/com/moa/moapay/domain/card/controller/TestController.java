package com.moa.moapay.domain.card.controller;

import com.moa.moapay.global.kafka.KafkaProducer;
import com.moa.moapay.global.kafkaVo.KafkaMsgVo;
import lombok.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.*;

@Controller
@RequiredArgsConstructor
public class TestController {

    private final KafkaProducer kafkaProducer;

    @GetMapping("/test")
    public String test() {
        UUID merchantId = UUID.randomUUID();
        List<PaymentCardInfoVO> paymentInfoList = new ArrayList<>();
        paymentInfoList.add(PaymentCardInfoVO.builder()
                        .cardId(UUID.randomUUID())
                        .cardNumber("1234123412341234")
                        .cvc("341")
                        .amount(100000)
                .build());
        paymentInfoList.add(PaymentCardInfoVO.builder()
                .cardId(UUID.randomUUID())
                .cardNumber("94723047493833")
                .cvc("441")
                .amount(600000)
                .build());
        Map<String, Object> vo = new HashMap<>();
        vo.put("merchantId", merchantId);
        vo.put("paymentInfoList", paymentInfoList);

        kafkaProducer.send(vo, "1798");
        return "OK";
    }
// 이건 진짜진짜 테스트용...
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    static class PaymentCardInfoVO {
        private UUID cardId;
        private String cardNumber;
        private String cvc;
        private long amount;
    }

}
