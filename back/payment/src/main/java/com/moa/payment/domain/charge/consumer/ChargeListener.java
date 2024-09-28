package com.moa.payment.domain.charge.consumer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.moa.payment.domain.charge.model.vo.ExecutePaymentRequestVO;
import com.moa.payment.domain.charge.model.vo.ExecutePaymentResultVO;
import com.moa.payment.domain.charge.model.vo.PaymentCardInfoVO;
import com.moa.payment.domain.charge.service.ChargeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
@Slf4j
@RequiredArgsConstructor
public class ChargeListener {

    private final ChargeService chargeService;
    private final ObjectMapper objectMapper;

    @KafkaListener(topics = "request.payment", groupId = "payments_consumer_group")
    public void executePayment(String message) {
        try {
            Map<String, Object> vo  = objectMapper.readValue(message, Map.class);
            ExecutePaymentRequestVO executePaymentRequestVO = objectMapper.convertValue(vo, ExecutePaymentRequestVO.class);
            log.info("get payment request : {}", executePaymentRequestVO.getMerchantId().toString());
            log.info("requestCode : {}", executePaymentRequestVO.getRequestCode());
            ExecutePaymentResultVO resultVO = chargeService.executePayment(executePaymentRequestVO);
            log.info("transfer payment result...");
        } catch(Exception e) {
            // 에러가 발생하는 경우, 에러 응답을 또 보내줘야 함
        }
    }

}
