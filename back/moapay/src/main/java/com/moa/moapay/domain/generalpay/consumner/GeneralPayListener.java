package com.moa.moapay.domain.generalpay.consumner;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@Slf4j
@RequiredArgsConstructor
public class GeneralPayListener {

    private final ObjectMapper objectMapper;

    @KafkaListener(topics = "request.renew-card-info", groupId = "payments_consumer_group")
    public void renewCardInfo(String message) {
        try {
            Map<String, Object> vo  = objectMapper.readValue(message, Map.class);
            log.info("received renew card info message");
        } catch (Exception e) {

        }
    }
}
