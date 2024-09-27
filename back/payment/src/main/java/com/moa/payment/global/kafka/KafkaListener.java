package com.moa.payment.global.kafka;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.moa.payment.domain.online.model.dto.ExecutePaymentRequestDto;
import com.moa.payment.domain.online.service.OnlineService;
import com.moa.payment.global.kafkaVo.KafkaMsgVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class KafkaListener {

    private final OnlineService onlineService;
    private final ObjectMapper objectMapper; // ObjectMapper 주입

    @org.springframework.kafka.annotation.KafkaListener(topics = "request.payment", groupId = "payments_consumer_group")
    public void consume(String message) {
        log.info("Received message: {}", message);
        try {
            // 메시지를 KafkaMsgVo 객체로 변환
            KafkaMsgVo kafkaMsgVo = objectMapper.readValue(message, KafkaMsgVo.class);

            // 변환된 KafkaMsgVo를 기반으로 DTO를 생성
            ExecutePaymentRequestDto dto = makeDto(kafkaMsgVo);

            // 온라인 결제 서비스 메서드 호출
            onlineService.ExecutePayment(dto);

        } catch (Exception e) {
            log.error("Error processing message: {}", message, e);
        }
    }

    /**
     * kafka에 request.payment에 메시지가 들어오면 여기로 옵니다.
     * @param vo
     * @return
     */
    private ExecutePaymentRequestDto makeDto(KafkaMsgVo vo) {
        log.info("Converting KafkaMsgVo to DTO");

        ExecutePaymentRequestDto reqDto = ExecutePaymentRequestDto.builder()
                .cvc(vo.getCvc())
                .amount(vo.getAmount())
                .cardId(vo.getCardId())
                .cardNumber(vo.getCardNumber())
                .merchantId(vo.getMerchantId())
                .categoryId(vo.getCategoryId())
                .build();

        return reqDto; // 실제 변환 로직을 구현하여 리스트 반환
    }
}
