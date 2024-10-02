package com.moa.payment.domain.charge.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.moa.payment.domain.charge.entity.PaymentLog;
import com.moa.payment.domain.charge.model.PayStatus;
import com.moa.payment.domain.charge.model.PaymentResultStatus;
import com.moa.payment.domain.charge.model.ProcessingStatus;
import com.moa.payment.domain.charge.model.dto.*;
import com.moa.payment.domain.charge.model.vo.*;
import com.moa.payment.domain.charge.repository.PaymentLogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChargeServiceImpl implements ChargeService {

    @Value("${external-url.cardbank}")
    private String cardbankUrl;

    private final RestClient restClient;
    private final ObjectMapper objectMapper;
    private final PaymentLogRepository paymentLogRepository;

    @Override
    public ExecutePaymentResultVO executePayment(ExecutePaymentRequestVO vo) {
        // todo : 카드사로 요청 보내는 uri를 config 기반으로 변경
        List<PaymentCardInfoVO> paymentInfoList = vo.getPaymentInfoList();
        List<PaymentCardInfoVO> succeedPaymentInfoList = new ArrayList<>();
        List<UUID> succeedPaymentIdList = new ArrayList<>();
        List<PaymentResultCardInfoVO> paymentResultInfoList = new ArrayList<>();
        String merchantName = "";
        for (PaymentCardInfoVO paymentInfo : paymentInfoList) {
            CardPaymentRequestDto paymentRequestDto = CardPaymentRequestDto.builder()
                    .merchantId(vo.getMerchantId())
                    .cardId(paymentInfo.getCardId())
                    .cardNumber(paymentInfo.getCardNumber())
                    .cvc(paymentInfo.getCvc())
                    .amount(paymentInfo.getAmount())
                    .build();
            ResponseEntity<Map> paymentResponse = restClient.post()
                    .uri(cardbankUrl+"/card/pay")
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(paymentRequestDto)
                    .retrieve()
                    .toEntity(Map.class);
            CardPaymentResponseDto paymentResponseDto = objectMapper.convertValue(paymentResponse.getBody().get("data"), CardPaymentResponseDto.class);
            merchantName = paymentResponseDto.getMerchantName();
            // 만일 결제에 실패했다면 결제 취소 과정을 거쳐야 한다
            if (!paymentResponse.getStatusCode().is2xxSuccessful() || paymentResponseDto.getStatus() != PayStatus.APPROVED) {
                // 결제 중 오류가 발생했거나, 한도초과이거나, 잔액부족으로 결제가 실패했을 경우 결제를 중지한다
                log.info("payment failed - status : {}", paymentResponseDto.getStatus());
                int successSize = succeedPaymentInfoList.size();
                for (int s = 0; s < successSize; ++s) {
                    PaymentCardInfoVO cardInfo = succeedPaymentInfoList.get(s);
                    UUID paymentId = succeedPaymentIdList.get(s);
                    // 이 값들을 기반으로 결제 취소 요청을 보낸다
                    CancelPayRequestDto requestDto = CancelPayRequestDto.builder()
                            .paymentId(paymentId)
                            .cardId(cardInfo.getCardId())
                            .cardNumber(cardInfo.getCardNumber())
                            .cvc(cardInfo.getCvc())
                            .build();
                    ResponseEntity<Map> cancelResponse = restClient.post()
                            .uri(cardbankUrl+"/card/cancel")
                            .contentType(MediaType.APPLICATION_JSON)
                            .body(requestDto)
                            .retrieve()
                            .toEntity(Map.class);
                    CancelPayResponseDto responseDto = objectMapper.convertValue(cancelResponse.getBody().get("data"), CancelPayResponseDto.class);
                    log.info("canceled - amount : {}, benefitBalance : {}, remainedBenefit : {}", responseDto.getAmount(), responseDto.getBenefitBalance(), responseDto.getRemainedBenefit());
                    // 취소 처리가 되었다면, 로컬의 payment log status도 바꿔야 함
                    PaymentLog paymentLog = paymentLogRepository.findByUuid(paymentId).get();
                    PaymentLog newLog = paymentLog.toBuilder()
                            .status(ProcessingStatus.CANCELED)
                            .build();
                    paymentLogRepository.save(newLog);
                }
                // 결제 실패 관련 처리가 끝났다면 더이상 결제를 진행하지 않음
                return ExecutePaymentResultVO.builder()
                        .merchantName(paymentResponseDto.getMerchantName())
                        .status(PaymentResultStatus.FAILED)
                        .build();
            }
            // 결제에 성공한 경우, succeedList에 넣음
            log.info(paymentResponseDto.toString());
            succeedPaymentInfoList.add(paymentInfo);
            log.info("succeed payment ID : {}", paymentResponseDto.getPaymentId());
            succeedPaymentIdList.add(paymentResponseDto.getPaymentId());
            // 이후 save 시도
            PaymentLog paymentLog = PaymentLog.builder()
                    .uuid(paymentResponseDto.getPaymentId()) // 카드사쪽 결제로그와 이쪽 결제로그의 uuid를 통일
                    .cardId(paymentInfo.getCardId())
                    .amount(paymentResponseDto.getAmount())
                    .status(ProcessingStatus.APPROVED)
                    .merchantId(vo.getMerchantId())
                    .merchantName(paymentResponseDto.getMerchantName())
                    .categoryId(paymentResponseDto.getCategoryId())
                    .benefitBalance(paymentResponseDto.getBenefitBalance())
                    .build();
            paymentLogRepository.save(paymentLog);
            // 저장에도 성공했다면 성공 리스트에 넣는다
            paymentResultInfoList.add(
                    PaymentResultCardInfoVO.builder()
                            .paymentId(paymentResponseDto.getPaymentId())
                            .cardId(paymentInfo.getCardId())
                            .cardNumber(paymentInfo.getCardNumber())
                            .amount(paymentInfo.getAmount())
                            .actualAmount(paymentResponseDto.getAmount())
                            .benefitActivated(paymentResponseDto.isBenefitActivated())
                            .benefitBalance(paymentResponseDto.getBenefitBalance())
                            .remainedBenefit(paymentResponseDto.getRemainedBenefit())
                            .benefitDetail(paymentResponseDto.getBenefitDetail())
                            .build()
            );
        }
        // 전부 결제에 성공했다면 성공 로그 발송
        // 궁금하니까 로그 찍어보기...
        log.info("pay succeeded : {}", merchantName);
        for(PaymentResultCardInfoVO v : paymentResultInfoList) {
            log.info(v.toString());
        }
        return ExecutePaymentResultVO.builder()
                .merchantName(merchantName)
                .status(PaymentResultStatus.SUCCEED)
                .paymentResultInfoList(paymentResultInfoList)
                .build();
    }

    @Override
    public PaymentResultDto makePaymentResultDto(ExecutePaymentResultVO vo, UUID requestId) {
        log.info("making PaymentResultDto...");
        long totalAmount = 0;
        int usedCardCount = 0;
        for(PaymentResultCardInfoVO v : vo.getPaymentResultInfoList()) {
            totalAmount += v.getActualAmount();
            usedCardCount++;
        }
        return PaymentResultDto.builder()
                .requestId(requestId)
                .merchantName(vo.getMerchantName())
                .totalAmount(totalAmount)
                .createTime(LocalDateTime.now())
                .usedCardCount(usedCardCount)
                .paymentResultInfoList(vo.getPaymentResultInfoList())
                .build();
    }
}
