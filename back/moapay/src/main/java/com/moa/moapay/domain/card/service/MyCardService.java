package com.moa.moapay.domain.card.service;

import com.moa.moapay.domain.card.model.dto.*;
import com.moa.moapay.domain.card.model.vo.PaymentResultCardInfoVO;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface MyCardService {
    List<MyCardInfoDto> getMyCardInfo(HttpServletRequest request);
    List<CardInfoResponseDto> getAllCard();

    List<GetMyCardsResponseDto> getMyCardFromCardBank(GetMyCardsRequestDto getMyCardsRequestDto);
    void renewCardInfo(List<PaymentResultCardInfoVO> renewList);

    void registrationCard(CardRegistrationRequestDto registrationRequestDto);

    void disableCard(MyCardStatusRequestDto disableCardRequestDto);
    void ableCard(MyCardStatusRequestDto ableCardRequestDto);
}
