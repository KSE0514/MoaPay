package com.moa.moapay.domain.generalpay.service;

import com.fasterxml.uuid.Generators;
import com.moa.moapay.domain.card.entity.MyCard;
import com.moa.moapay.domain.card.repository.MyCardRepository;
import com.moa.moapay.domain.generalpay.model.dto.ExecuteGeneralPayRequestDto;
import com.moa.moapay.domain.generalpay.repository.GeneralPayRedisRepository;
import com.moa.moapay.global.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class GeneralPayServiceImpl implements GeneralPayService{

    private final MyCardRepository myCardRepository;
    private final GeneralPayRedisRepository generalPayRedisRepository;

    @Override
    public void executeGeneralPay(ExecuteGeneralPayRequestDto dto) {

        // [0] 기본 데이터 검증
        // 나중에 유저 본인이 소유한 카드인지 확인하는 매커니즘도 필요하지 않을까...
        MyCard myCard = myCardRepository.findByCardNumber(dto.getCardNumber())
                .orElseThrow(() -> new BusinessException(HttpStatus.BAD_REQUEST, "유효하지 않은 정보입니다."));
        if(!myCard.getCvc().equals(dto.getCvc())) {
            throw new BusinessException(HttpStatus.BAD_REQUEST, "유효하지 않은 정보입니다.");
        }
        
        // todo : 결제 정보 주고받을 때 requestCode를 주고받도록 수정

        UUID requestCode = Generators.timeBasedEpochGenerator().generate();
        // [1] payment에서 사용할 정보 redis에 저장
        // HASH SET 이용하여 여러 정보를 저장하도록 한다
        generalPayRedisRepository.registerPaymentInformation(requestCode, dto);

    }
}
