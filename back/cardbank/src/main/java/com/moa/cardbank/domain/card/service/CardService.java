package com.moa.cardbank.domain.card.service;

import com.moa.cardbank.domain.card.model.dto.*;

public interface CardService {
    CreateCardProductResponseDto createCardProduct(CreateCardProductRequestDto dto);
    ExecutePayResponseDto executePay(ExecutePayRequestDto dto);
    CreateMyCardResponseDto createMyCard(CreateMyCardRequestDto dto);
}
