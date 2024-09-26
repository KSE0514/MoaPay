package com.moa.payment.domain.online.service;

import com.moa.payment.domain.charge.entity.PaymentLog;
import com.moa.payment.domain.online.model.CardSelectionType;
import com.moa.payment.domain.online.model.Status;
import com.moa.payment.domain.online.model.dto.*;
import com.moa.payment.domain.online.repository.OnlinePaymentRedisRepository;
import com.moa.payment.domain.charge.repository.PaymentLogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClient;

import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class OnlineServiceImpl implements OnlineService {
    private final OnlinePaymentRedisRepository redisRepository;
    private final PaymentLogRepository paymentLogRepository;
    private final RestClient restClient;
    @Override
    public GetOnlineQRCodeResponseDto getOnlineQRcode(GetOnlineQRCodeRequestDto dto) {
        // [1] 등록된 값과 연동할 QRcode 발급, redis에 등록(Hash)
        int QRCode;
        while(true) {
            QRCode = (int)(Math.random() * 10000000);
            if(redisRepository.QRCodeRegistTest("QR:" + String.valueOf(QRCode))) break; // 성공적으로 등록되었다면 return
        }
        // [2] 중복 아닌 거 확인했다면 그 값 기반으로 나머지 결제정보 등록
        redisRepository.RegistQRCodeInfo(QRCode, dto);

        // [3] QRcode 리턴
        return GetOnlineQRCodeResponseDto.builder()
                .QRCode(String.valueOf(QRCode))
                .build();
    }

    @Override
    public GetOnlinePaymentInfoResponseDto getOnlinePaymentInfo(String QRCode) {
        HashMap<String, String> searchedInfo = redisRepository.findQRCodeInfo(QRCode);
        return GetOnlinePaymentInfoResponseDto.builder()
                .orderId(UUID.fromString(searchedInfo.get("orderId")))
                .merchantId(UUID.fromString(searchedInfo.get("merchantId")))
                .merchantName(searchedInfo.get("merchantName"))
                .categoryId(searchedInfo.get("categoryId"))
                .totalPrice(Long.parseLong(searchedInfo.get("totalPrice")))
                .build();
    }

    @Override
    public void disableOnlinePaymentInfo(String QRCode) {
        redisRepository.disableQRCodeInfo(QRCode);
    }

    @Override
    @Transactional
    public void ExecuteOnlinePayment(ExecuteOnlinePaymentRequestDto dto) {
        // 카드 선택 유형에 따라 다르게 결제 방식을 정함
        List<PaymentCardInfoDto> paymentInfoList = new ArrayList<>();
        if(dto.getCardSelectionType() == CardSelectionType.FIX) {
            // fix인 경우, 정해진 값에 따라 card값을 찾아 보낸다
            paymentInfoList.add(dto.getPaymentCardInfo());
        }
//        else {
//            // recommend인 경우, moapay 서비스에서 값을 가져옴
//            // 추후 구현
//        }
        List<PaymentCardInfoDto> successedPaymentInfoList = new ArrayList<>(); // 성공하는 경우, arraylist로 새롭게 넣는다. 추후 결제 실패 대응을 위함.
        List<UUID> successedPaymentIdList = new ArrayList<>();
        List<UUID> successedPaymentLogList = new ArrayList<>();
        for(PaymentCardInfoDto paymentInfo : paymentInfoList) {
            // 각 카드별로 각각 결제요청을 전송
            // uri : 일단은 하드코딩
            Map<String, String> paymentRequestBody = new HashMap<>();
            paymentRequestBody.put("merchantId", dto.getMerchantId().toString());
            paymentRequestBody.put("cardId", paymentInfo.getCardId().toString());
            paymentRequestBody.put("cardNumber", paymentInfo.getCardNumber());
            paymentRequestBody.put("cvc", paymentInfo.getCvc());
            paymentRequestBody.put("amount", Long.toString(paymentInfo.getAmount()));
            ResponseEntity<Map> paymentResponse = restClient.post()
                    .uri("http://localhost:18100/cardbank/card/pay")
                    .contentType(MediaType.APPLICATION_JSON)// 일단은 하드코딩
                    .body(paymentRequestBody)
                    .retrieve()
                    .toEntity(Map.class);
            Map<String, Object> paymentResponseBody = (Map<String, Object>) paymentResponse.getBody().get("data");
            if(!paymentResponse.getStatusCode().is2xxSuccessful() || !((String) paymentResponseBody.get("status")).equals("APPROVED")) {
                // 결제 중 오류가 발생했거나, 한도초과이거나, 잔액부족으로 결제가 실패했을 경우 결제를 중지한다
                // todo : 결제 중 에러가 발생하는 경우 결제 취소하도록 변경
                log.info("payment failed - status : {}", (String) paymentResponseBody.get("status"));
                int successedSize = successedPaymentIdList.size();
                for(int s = 0 ; s < successedSize ; s++) {
                    PaymentCardInfoDto cardInfo = successedPaymentInfoList.get(s);
                    UUID paymentId = successedPaymentIdList.get(s);
                    // 해당 값을 기반으로 결제 취소 요청을 보냄
                    Map<String, Object> cancelRequestBody = new HashMap<>();
                    cancelRequestBody.put("paymentId", paymentId.toString());
                    cancelRequestBody.put("cardId", cardInfo.getCardId().toString());
                    cancelRequestBody.put("cardNumber", cardInfo.getCardNumber());
                    cancelRequestBody.put("cvc", cardInfo.getCvc());
                    ResponseEntity<Map> cancelResponse = restClient.post()
                            .uri("http://localhost:18100/cardbank/card/cancel")
                            .contentType(MediaType.APPLICATION_JSON)
                            .body(cancelRequestBody)
                            .retrieve()
                            .toEntity(Map.class);
                    log.info("{}", (String)cancelResponse.getBody().get("message"));
                    // 취소 처리가 되었다면, 로컬의 payment log status도 바꿔야 함
                    PaymentLog paymentLog = paymentLogRepository.findByUuid(successedPaymentLogList.get(s)).get();
                    PaymentLog newLog = paymentLog.toBuilder()
                            .status(Status.CANCELED)
                            .build();
                    paymentLogRepository.save(newLog);
                }
                // 결제 실패 관련 처리가 끝났다면 더이상 결제를 진행하지 않음
                return;
            }
            // 결제에 성공한 경우, successList에 넣음
            // log 출력도 시행
            log.info("status : {}, amount : {}, benefitActivated : {}, benefitBalance : {}, remainedBenefit : {}",
                    paymentResponseBody.get("status"), paymentResponseBody.get("amount"), paymentResponseBody.get("benefitActivated"),
                    paymentResponseBody.get("benefitBalance"), paymentResponseBody.get("remainedBenefit"));
            successedPaymentInfoList.add(paymentInfo);
            log.info("successed payment ID : {}", paymentResponseBody.get("paymentId"));
            successedPaymentIdList.add(UUID.fromString((String) paymentResponseBody.get("paymentId")));
            // 이후 save 시도
            PaymentLog paymentLog = PaymentLog.builder()
                    .cardId(paymentInfo.getCardId())
                    .amount(((Integer)paymentResponseBody.get("amount")).longValue())
                    .status(Status.APPROVED)
                    .merchantId(dto.getMerchantId())
                    .merchantName((String)paymentResponseBody.get("merchantName"))
                    .categoryId(dto.getCategoryId())
                    .benefitBalance(((Integer)paymentResponseBody.get("benefitBalance")).longValue())
                    .build();
            paymentLogRepository.save(paymentLog);
            successedPaymentLogList.add(paymentLog.getUuid());
        }
    }
}
