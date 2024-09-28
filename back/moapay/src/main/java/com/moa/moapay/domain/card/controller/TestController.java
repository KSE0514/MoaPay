package com.moa.moapay.domain.card.controller;

import com.moa.moapay.global.kafka.KafkaProducer;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.*;

@Controller
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class TestController {

    private final KafkaProducer kafkaProducer;

    @GetMapping("/test")
    public String test() {
        UUID merchantId = UUID.fromString("0192083a-4595-7601-a03b-20bc037a3c98");
        List<PaymentCardInfoVO> paymentInfoList = new ArrayList<>();
        paymentInfoList.add(PaymentCardInfoVO.builder()
                        .cardId(UUID.fromString("01921d47-86a8-702f-a268-21d03b15259e"))
                        .cardNumber("6447272847698049")
                        .cvc("433")
                        .amount(100000)
                .build());
        paymentInfoList.add(PaymentCardInfoVO.builder()
                .cardId(UUID.fromString("01921d7f-2a1a-75d4-80b3-5a69a545254c"))
                .cardNumber("3140716895929967")
                .cvc("879")
                .amount(60000)
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
