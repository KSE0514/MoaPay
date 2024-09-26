package com.moa.moapay.domain.card.controller;

import com.moa.moapay.global.Kafka.KafkaProducer;
import com.moa.moapay.global.kafkaVo.KafkaMsgVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.UUID;

@Controller
@RequiredArgsConstructor
public class TestController {

    private final KafkaProducer kafkaProducer;

    @GetMapping("/test")
    public String test() {
        UUID merchantId = UUID.randomUUID();
        UUID cardId = UUID.randomUUID();
        String cardNumber = "123412341234";
        String cvc = "123";
        long amount = 100000000L;

        KafkaMsgVo vo = KafkaMsgVo.builder()
                .merchantId(merchantId)
                .cardNumber(cardNumber)
                .cardId(cardId)
                .cvc(cvc)
                .amount(amount)
                .build();

        for (int i = 0; i < 10; i++) {
            kafkaProducer.send(vo, String.valueOf(i));
        }

        return null;
    }

}
