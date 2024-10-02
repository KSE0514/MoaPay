package com.moa.moapay.domain.card.service;

import com.moa.moapay.domain.card.model.dto.CardInfoResponseDto;
import com.moa.moapay.domain.card.model.dto.GetMyCardsRequestDto;
import com.moa.moapay.domain.card.model.dto.GetMyCardsResponseDto;
import com.moa.moapay.domain.card.model.dto.MyCardInfoDto;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;
import java.util.UUID;

public interface MyCardService {
    List<MyCardInfoDto> getMyCardInfo(HttpServletRequest request);

    List<CardInfoResponseDto> getAllCard();

    List<GetMyCardsResponseDto> getMyCardFromCardBank(GetMyCardsRequestDto getMyCardsRequestDto);
}
