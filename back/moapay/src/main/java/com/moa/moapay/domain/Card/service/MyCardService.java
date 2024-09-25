package com.moa.moapay.domain.Card.service;

import com.moa.moapay.domain.Card.model.dto.CardInfoResponseDto;
import com.moa.moapay.domain.Card.model.dto.MyCardInfoDto;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;
import java.util.UUID;

public interface MyCardService {
    List<MyCardInfoDto> getMyCardInfo(HttpServletRequest request);

    List<CardInfoResponseDto> getAllCard();
}
