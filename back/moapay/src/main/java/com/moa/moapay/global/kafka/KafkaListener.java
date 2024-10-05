package com.moa.moapay.global.kafka;

import com.moa.moapay.domain.dutchpay.service.DutchPayService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class KafkaListener {

    private final DutchPayService dutchPayService;

    @org.springframework.kafka.annotation.KafkaListener(topics = "tracking.dutchpay", groupId = "dutchpay_consumer_group")
    public void consume(String message) {
        dutchPayService.dutchpayComplite();
        log.info(message);
    }
}
