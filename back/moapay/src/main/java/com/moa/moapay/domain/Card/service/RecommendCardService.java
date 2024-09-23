package com.moa.moapay.domain.Card.service;

import com.moa.moapay.domain.Card.model.dto.RecommendCardRequestDto;
import com.moa.moapay.domain.Card.model.dto.RecommendCardResponseDto;

import java.util.List;

public interface RecommendCardService {
    List<RecommendCardResponseDto> recommendCard(RecommendCardRequestDto recommendCardRequestDto);
}
