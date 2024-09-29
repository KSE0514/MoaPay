package com.moa.moapay.domain.generalpay.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.uuid.Generators;
import com.moa.moapay.domain.card.entity.MyCard;
import com.moa.moapay.domain.card.model.vo.ExecutePaymentRequestVO;
import com.moa.moapay.domain.card.repository.MyCardRepository;
import com.moa.moapay.domain.generalpay.model.CardSelectionType;
import com.moa.moapay.domain.generalpay.model.dto.ExecuteGeneralPayRequestDto;
import com.moa.moapay.domain.generalpay.model.vo.PaymentCardInfoVO;
import com.moa.moapay.domain.generalpay.repository.GeneralPayRedisRepository;
import com.moa.moapay.global.exception.BusinessException;
import com.moa.moapay.global.kafka.KafkaProducer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class GeneralPayServiceImpl implements GeneralPayService{

    private final ObjectMapper objectMapper;
    private final KafkaProducer kafkaProducer;
    private final MyCardRepository myCardRepository;
    private final GeneralPayRedisRepository generalPayRedisRepository;

    @Override
    public void executeGeneralPay(ExecuteGeneralPayRequestDto dto) {
        UUID requestCode = Generators.timeBasedEpochGenerator().generate();
        // [0] 중복 요청인지 확인
        // 클라이언트가 생성한 requestId가 이미 redis에 저장되었는지를 화깅ㄴ한다
        if(!generalPayRedisRepository.registRequestId(dto.getRequestId())) {
            throw new BusinessException(HttpStatus.BAD_REQUEST, "중복된 결제 요청입니다.");
        }
        // [1] payment에서 사용할 정보 redis에 저장
        // HASH SET을 이용하여 여러 정보를 저장하도록 한다
        generalPayRedisRepository.registerPaymentInformation(requestCode, dto);

        // [2] 사용할 카드 선택
        // FIX인 경우, 주어진 값을 기반으로 사용할 카드 값을 가져온다.
        List<PaymentCardInfoVO> cardInfoList = new ArrayList<>();
        if(dto.getCardSelectionType() == CardSelectionType.FIX) {
            // 고정된 값인 경우, cardNumber와 cvc를 기반으로 검증
            // 우선 기본 검증 시행
            // 나중에 유저 본인이 소유한 카드인지 확인하는 매커니즘도 필요하지 않을까...
            MyCard myCard = myCardRepository.findByCardNumber(dto.getCardNumber())
                    .orElseThrow(() -> new BusinessException(HttpStatus.BAD_REQUEST, "유효하지 않은 정보입니다."));
            if(!myCard.getCvc().equals(dto.getCvc())) {
                throw new BusinessException(HttpStatus.BAD_REQUEST, "유효하지 않은 정보입니다.");
            }
            // 카드 ID 정보를 포함해 카드 정보 삽입
            PaymentCardInfoVO cardInfoVo = PaymentCardInfoVO.builder()
                    .cardId(myCard.getUuid())
                    .cardNumber(dto.getCardNumber())
                    .cvc(dto.getCvc())
                    .amount(dto.getTotalPrice()) // 전부 하나의 카드로 긁으므로 totalPrice와 동일
                    .build();
            cardInfoList.add(cardInfoVo);

        } else {
            // 카드 추천형인 경우, 추천된 결과를 기반으로 결제를 진행
            // todo : 카드 추천하는 서비스 완성하여 여기에서 사용
            log.info("recommend card...");
        }

        // [3] 요청 전송
        ExecutePaymentRequestVO requestVo = ExecutePaymentRequestVO.builder()
                .merchantId(dto.getMerchantId())
                .requestCode(requestCode)
                .paymentInfoList(cardInfoList)
                .build();
        Map<String, Object> map = objectMapper.convertValue(requestVo, Map.class);
        kafkaProducer.send(map, "1");

    }
}
