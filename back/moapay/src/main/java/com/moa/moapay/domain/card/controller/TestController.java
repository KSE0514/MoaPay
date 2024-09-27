package com.moa.moapay.domain.card.controller;

import com.moa.moapay.global.Kafka.KafkaProducer;
import com.moa.moapay.global.kafkaVo.KafkaMsgVo;
import com.moa.moapay.global.response.ResultResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.UUID;

@Controller
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class TestController {

    private final KafkaProducer kafkaProducer;

    @GetMapping("test")
    public ResponseEntity<Object> test() {

      log.info("test");

        UUID merchantId = UUID.fromString("01921d82-c613-755a-92c1-6b6ce03d0ac0");
        UUID cardId = UUID.fromString("01921d47-86a8-702f-a268-21d03b15259e");
        String cardNumber = "6447272847698049";
        String cvc = "433";
        String categoryId = "C0012";
        long amount = 10000L;

        KafkaMsgVo vo = KafkaMsgVo.builder()
                .paymentType("EXECUTE")
                .categoryId(categoryId)
                .merchantId(merchantId)
                .cardNumber(cardNumber)
                .cardId(cardId)
                .cvc(cvc)
                .amount(amount)
                .build();

        kafkaProducer.send(vo, "1");
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "나의 카드 조회", "결제 테스트");
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

}
