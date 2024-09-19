package com.moa.cardbank.domain.card.service;

import com.moa.cardbank.domain.card.model.dto.CreateMyCardRequestDto;
import com.moa.cardbank.domain.card.model.dto.CreateMyCardResponseDto;
import com.moa.cardbank.domain.card.model.dto.ExecutePayRequestDto;
import com.moa.cardbank.domain.card.model.dto.ExecutePayResponseDto;

public interface CardService {

    ExecutePayResponseDto executePay(ExecutePayRequestDto dto);
    CreateMyCardResponseDto createMyCard(CreateMyCardRequestDto dto);
}
