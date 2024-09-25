package com.moa.moapay.global.Kafka;

import com.moa.moapay.global.kafkaVo.KafkaMsgVo;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.kafka.core.KafkaTemplate;

import java.util.UUID;

import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@SpringBootTest
class KafkaProducerTest {

    @Autowired
    private KafkaProducer kafkaProducer;

    @MockBean
    private KafkaTemplate<String, KafkaMsgVo> kafkaTemplate;

    @Test
    public void testSend() throws Exception {
        // given
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

        System.out.println(vo.toString());
        // when
//        kafkaProducer.send(vo);

        // then
        // KafkaTemplate의 send 메소드가 예상대로 호출되었는지 검증
        //verify(kafkaTemplate, times(1)).send(eq("request.payment"), eq(vo));
    }
}
