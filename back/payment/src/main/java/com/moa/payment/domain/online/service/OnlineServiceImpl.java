package com.moa.payment.domain.online.service;

import com.moa.payment.domain.notification.service.NotificationService;
import com.moa.payment.domain.online.entity.PaymentLog;
import com.moa.payment.domain.online.model.CardSelectionType;
import com.moa.payment.domain.online.model.Status;
import com.moa.payment.domain.online.model.dto.*;
import com.moa.payment.domain.online.repository.OnlinePaymentRedisRepository;
import com.moa.payment.domain.online.repository.PaymentLogRepository;
import com.moa.payment.global.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
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
    private final NotificationService notificationService;

    @Override
    public GetOnlineQRCodeResponseDto getOnlineQRcode(GetOnlineQRCodeRequestDto dto) {
        // [1] 등록된 값과 연동할 QRcode 발급, redis에 등록(Hash)
        int QRCode;
        while (true) {
            QRCode = (int) (Math.random() * 10000000);
            if (redisRepository.QRCodeRegistTest("QR:" + String.valueOf(QRCode))) break; // 성공적으로 등록되었다면 return
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
        if (dto.getCardSelectionType() == CardSelectionType.FIX) {
            // fix인 경우, 정해진 값에 따라 card값을 찾아 보낸다
            paymentInfoList.add(dto.getPaymentCardInfo());
        }
//        else {
//            // recommend인 경우, moapay 서비스에서 값을 가져옴
//            // 추후 구현
//        }
        List<PaymentCardInfoDto> successedPaymentInfoList = new ArrayList<>(); // 성공하는 경우, arraylist로 새롭게 넣는다. 추후 결제 실패 대응을 위함.
        List<UUID> successedPaymentIdList = new ArrayList<>();
        for (PaymentCardInfoDto paymentInfo : paymentInfoList) {
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
            if (!paymentResponse.getStatusCode().is2xxSuccessful() || !((String) paymentResponseBody.get("status")).equals("APPROVED")) {
                // 결제 중 오류가 발생했거나, 한도초과이거나, 잔액부족으로 결제가 실패했을 경우 결제를 중지한다
                // 추후 이미 진행한 결제를 취소하는 매커니즘 추가 예정

                log.info("status : {}", (String) paymentResponseBody.get("status"));

                // todo : 결제 중 에러가 발생하는 경우 결제 취소하도록 변경

                throw new BusinessException(HttpStatus.BAD_REQUEST, "결제에 실패했습니다.");
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
                    .amount(((Integer) paymentResponseBody.get("amount")).longValue())
                    .status(Status.APPROVED)
                    .merchantId(dto.getMerchantId())
                    .merchantName((String) paymentResponseBody.get("merchantName"))
                    .categoryId(dto.getCategoryId())
                    .benefitBalance(((Integer) paymentResponseBody.get("benefitBalance")).longValue())
                    .build();
            paymentLogRepository.save(paymentLog);
        }
    }

    /**
     * 결제 카드 값을 받아 결제 진행
     * @param dto
     */
    @Override
    @Transactional
    public void ExecutePayment(ExecutePaymentRequestDto dto) {
        List<PaymentCardInfoDto> successedPaymentInfoList = new ArrayList<>(); // 성공하는 경우, arraylist로 새롭게 넣는다. 추후 결제 실패 대응을 위함.
        List<UUID> successedPaymentIdList = new ArrayList<>();
        Map<String, String> paymentRequestBody = new HashMap<>();
        paymentRequestBody.put("merchantId", dto.getMerchantId().toString());
        paymentRequestBody.put("cardId", dto.getCardId().toString());
        paymentRequestBody.put("cardNumber", dto.getCardNumber());
        paymentRequestBody.put("cvc", dto.getCvc());
        paymentRequestBody.put("amount", Long.toString(dto.getAmount()));
        ResponseEntity<Map> paymentResponse = restClient.post()
                .uri("http://localhost:18100/cardbank/card/pay")
                .contentType(MediaType.APPLICATION_JSON)// 일단은 하드코딩
                .body(paymentRequestBody)
                .retrieve()
                .toEntity(Map.class);
        Map<String, Object> paymentResponseBody = (Map<String, Object>) paymentResponse.getBody().get("data");
        log.info("status : {}, amount : {}, benefitActivated : {}, benefitBalance : {}, remainedBenefit : {}",
                paymentResponseBody.get("status"), paymentResponseBody.get("amount"), paymentResponseBody.get("benefitActivated"),
                paymentResponseBody.get("benefitBalance"), paymentResponseBody.get("remainedBenefit"));

        PaymentLog paymentLog = PaymentLog.builder()
                .cardId(dto.getCardId())
                .amount(((Integer) paymentResponseBody.get("amount")).longValue())
                .status(Status.APPROVED)
                .merchantId(dto.getMerchantId())
                .merchantName((String) paymentResponseBody.get("merchantName"))
                // 이거는 가맹점에서 넘겨줘야 함
                .categoryId(dto.getCategoryId())
                .benefitBalance(((Integer) paymentResponseBody.get("benefitBalance")).longValue())
                .build();
        paymentLogRepository.save(paymentLog);

        // TODO :  여기서 user ID만 다르게  가맹점, 유저에게 전송 data에 DTO 넣어주면 됨
        // 이게 맞는 방법 인지는 모름 한번 찾아보셈
        notificationService.paynotify(2L, "제발 되라", "메세지 전송");
        
        // TODO : Kafka 프로두셔로 토픽 새로 만들어서 전송하기 받는 서비스 = moapay에게 정제 해서 넘겨주기
        // TODO : 이거 CDC 해야하는게 맞는거 같은데 일단 하드하게 프로듀서 전송하죠
    }
}
