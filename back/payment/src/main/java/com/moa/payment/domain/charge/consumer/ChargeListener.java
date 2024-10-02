package com.moa.payment.domain.charge.consumer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.moa.payment.domain.charge.model.vo.*;
import com.moa.payment.domain.charge.repository.ChargeRedisRepository;
import com.moa.payment.domain.charge.service.ChargeService;
import com.moa.payment.domain.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
@Slf4j
@RequiredArgsConstructor
public class ChargeListener {

    private final ChargeService chargeService;
    private final NotificationService notificationService;
    private final ObjectMapper objectMapper;
    private final ChargeRedisRepository chargeRedisRepository;
    private final KafkaTemplate<String, Map> kafkaTemplate;

    @KafkaListener(topics = "request.payment", groupId = "payments_consumer_group")
    public void executePayment(String message) {
        try {
            Map<String, Object> vo  = objectMapper.readValue(message, Map.class);
            ExecutePaymentRequestVO executePaymentRequestVO = objectMapper.convertValue(vo, ExecutePaymentRequestVO.class);
            log.info("get payment request : {}", executePaymentRequestVO.getMerchantId().toString());
            ExecutePaymentResultVO resultVO = chargeService.executePayment(executePaymentRequestVO);
            log.info("transfer payment result...");
            // 결제가 완료되었으므로, 결제 관련 데이터 갱신 요청을 보내야 함
            List<PaymentResultCardInfoVO> renewList = resultVO.getPaymentResultInfoList();
            Map<String, Object> map = new HashMap<>();
            map.put("renewList", renewList);
//            Map<String, Object> map = objectMapper.convertValue(renewList, Map.class);
            log.info("try to send renewList");
            kafkaTemplate.send("request.renew-card-info", "1", map);
            // todo : moapay쪽에서 정보 받아서 개인 카드 관련 정보 갱신하기
            // vo에 들은 requestCode를 기반으로 알람을 보낸다
            // 카드 이미지 URL같은 것도 같이 보내줘야하나...
            // json 형식으로 해 줄 필요 있을듯.
            // todo : client 응답형식 자세히 지정 지정
//            notificationService.sendEvent(requestCode, resultVO);
            
        } catch(Exception e) {
            // 에러가 발생하는 경우, 에러 관련 응답을 클라이언트에 전달
            // todo : 에러 발생시 어떻게 대처할지 구상
        }
    }

}
