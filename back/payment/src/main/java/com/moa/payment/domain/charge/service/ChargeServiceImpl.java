package com.moa.payment.domain.charge.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.moa.payment.domain.charge.entity.PaymentLog;
import com.moa.payment.domain.charge.model.PayStatus;
import com.moa.payment.domain.charge.model.dto.CardPaymentRequestDto;
import com.moa.payment.domain.charge.model.dto.CardPaymentResponseDto;
import com.moa.payment.domain.charge.model.vo.ExecutePaymentRequestVO;
import com.moa.payment.domain.charge.model.vo.ExecutePaymentResultVO;
import com.moa.payment.domain.charge.model.vo.PaymentCardInfoVO;
import com.moa.payment.domain.online.model.Status;
import com.moa.payment.domain.online.model.dto.PaymentCardInfoDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChargeServiceImpl implements ChargeService {

    private final RestClient restClient;
    private final ObjectMapper objectMapper;

    @Override
    public ExecutePaymentResultVO executePayment(ExecutePaymentRequestVO vo) {
        List<PaymentCardInfoVO> paymentInfoList = vo.getPaymentInfoList();
        List<PaymentCardInfoVO> succeedPaymentInfoList = new ArrayList<>();
        List<UUID> succeedPaymentIdList = new ArrayList<>();
        List<UUID> succeedPaymentLogList = new ArrayList<>();
        for(PaymentCardInfoVO paymentInfo : paymentInfoList) {
            CardPaymentRequestDto paymentRequestDto = CardPaymentRequestDto.builder()
                    .merchantId(vo.getMerchantId())
                    .cardId(paymentInfo.getCardId())
                    .cardNumber(paymentInfo.getCardNumber())
                    .cvc(paymentInfo.getCvc())
                    .amount(paymentInfo.getAmount())
                    .build();
            ResponseEntity<Map> paymentResponse = restClient.post()
                    .uri("http://localhost:18100/cardbank/card/pay")
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(paymentRequestDto)
                    .retrieve()
                    .toEntity(Map.class);
            CardPaymentResponseDto paymentResponseDto = objectMapper.convertValue(paymentResponse.getBody().get("data"), CardPaymentResponseDto.class);
            // 만일 결제에 실패했다면 결제 취소 과정을 거쳐야 한다
            if(!paymentResponse.getStatusCode().is2xxSuccessful() || paymentResponseDto.getStatus() != PayStatus.APPROVED) {
                // 결제 중 오류가 발생했거나, 한도초과이거나, 잔액부족으로 결제가 실패했을 경우 결제를 중지한다
                // todo : 결제 중 에러가 발생하는 경우 결제 취소하도록 변경
//                log.info("payment failed - status : {}", (String) paymentResponseBody.get("status"));
//                int successedSize = successedPaymentIdList.size();
//                for(int s = 0 ; s < successedSize ; s++) {
//                    PaymentCardInfoDto cardInfo = successedPaymentInfoList.get(s);
//                    UUID paymentId = successedPaymentIdList.get(s);
//                    // 해당 값을 기반으로 결제 취소 요청을 보냄
//                    Map<String, Object> cancelRequestBody = new HashMap<>();
//                    cancelRequestBody.put("paymentId", paymentId.toString());
//                    cancelRequestBody.put("cardId", cardInfo.getCardId().toString());
//                    cancelRequestBody.put("cardNumber", cardInfo.getCardNumber());
//                    cancelRequestBody.put("cvc", cardInfo.getCvc());
//                    ResponseEntity<Map> cancelResponse = restClient.post()
//                            .uri("http://localhost:18100/cardbank/card/cancel")
//                            .contentType(MediaType.APPLICATION_JSON)
//                            .body(cancelRequestBody)
//                            .retrieve()
//                            .toEntity(Map.class);
//                    log.info("{}", (String)cancelResponse.getBody().get("message"));
//                    // 취소 처리가 되었다면, 로컬의 payment log status도 바꿔야 함
//                    PaymentLog paymentLog = paymentLogRepository.findByUuid(successedPaymentLogList.get(s)).get();
//                    PaymentLog newLog = paymentLog.toBuilder()
//                            .status(Status.CANCELED)
//                            .build();
//                    paymentLogRepository.save(newLog);
//            }
                // 결제 실패 관련 처리가 끝났다면 더이상 결제를 진행하지 않음
                return null; //todo : 결제 실패시 리턴값 지정
            }
            // 결제에 성공한 경우, succeedList에 넣음
            log.info(paymentResponseDto.toString());
            succeedPaymentInfoList.add(paymentInfo);
            log.info("succeed payment ID : {}", paymentResponseDto.getPaymentId());
            succeedPaymentIdList.add(paymentResponseDto.getPaymentId());
            // 이후 save 시도
//            PaymentLog paymentLog = PaymentLog.builder()
//                    .cardId(paymentInfo.getCardId())
//                    .amount(((Integer)paymentResponseBody.get("amount")).longValue())
//                    .status(Status.APPROVED)
//                    .merchantId(dto.getMerchantId())
//                    .merchantName((String)paymentResponseBody.get("merchantName"))
//                    .categoryId(dto.getCategoryId())
//                    .benefitBalance(((Integer)paymentResponseBody.get("benefitBalance")).longValue())
//                    .build();
//            paymentLogRepository.save(paymentLog);
            

        }


        return null;
    }

}
