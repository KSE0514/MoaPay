package com.moa.moapay.global.Kafka;

import com.moa.moapay.global.kafkaVo.KafkaMsgVo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class KafkaProducer {

    private static final String TOPIC = "request.payment";
    private final KafkaTemplate<String, KafkaMsgVo> kafkaTemplate;

//    @Autowired
//    private KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    public KafkaProducer(KafkaTemplate<String, KafkaMsgVo> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void send(KafkaMsgVo message, String key) {
        log.info("send message: {}", message.toString());
        this.kafkaTemplate.send(TOPIC, "1", message);
    }

}
