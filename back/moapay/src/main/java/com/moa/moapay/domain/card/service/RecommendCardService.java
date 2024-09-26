package com.moa.moapay.domain.card.service;

import com.moa.moapay.domain.card.model.dto.CardInfoResponseDto;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface RecommendCardService {
    List<CardInfoResponseDto> recommendCard(HttpServletRequest request);
}
