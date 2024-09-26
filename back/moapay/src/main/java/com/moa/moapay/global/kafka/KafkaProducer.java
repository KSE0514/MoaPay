package com.moa.moapay.global.kafka;

import com.moa.moapay.global.kafkaVo.KafkaMsgVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@Slf4j
public class KafkaProducer {

    private static final String TOPIC = "request.payment";
    private final KafkaTemplate<String, KafkaMsgVo> kafkaTemplate;
    private final KafkaTemplate<String, Map> kafkaMapTemplate;

//    @Autowired
//    private KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    public KafkaProducer(KafkaTemplate<String, KafkaMsgVo> kafkaTemplate, KafkaTemplate<String, Map> kafkaMapTemplate) {
        this.kafkaTemplate = kafkaTemplate;
        this.kafkaMapTemplate = kafkaMapTemplate;
    }

    public void send(KafkaMsgVo message, String key) {
        log.info("send message: {}", message.toString());
        this.kafkaTemplate.send(TOPIC, "1", message);
    }

    public void send(Map<String, Object> message, String key) {
        log.info("send message via Map");
        this.kafkaMapTemplate.send(TOPIC, "1", message);
    }

}
