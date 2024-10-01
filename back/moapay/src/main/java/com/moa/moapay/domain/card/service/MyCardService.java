package com.moa.moapay.domain.card.service;

import com.moa.moapay.domain.card.model.dto.CardInfoResponseDto;
import com.moa.moapay.domain.card.model.dto.MyCardInfoDto;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface MyCardService {
    List<MyCardInfoDto> getMyCardInfo(HttpServletRequest request);
    List<CardInfoResponseDto> getAllCard();

}
