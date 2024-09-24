package com.moa.moapay.domain.Card.service;

import com.moa.moapay.domain.Card.model.dto.CardInfoResponseDto;
import com.moa.moapay.domain.Card.model.dto.MyCardInfoDto;

import java.util.List;
import java.util.UUID;

public interface MyCardService {
    List<MyCardInfoDto> getMyCardInfo(UUID memberId);

    List<CardInfoResponseDto> getAllCard();
}
