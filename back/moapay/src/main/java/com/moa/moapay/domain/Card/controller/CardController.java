package com.moa.moapay.domain.Card.controller;

import com.moa.moapay.domain.Card.model.dto.RecommendCardRequestDto;
import com.moa.moapay.domain.Card.model.dto.RecommendCardResponseDto;
import com.moa.moapay.domain.Card.service.RecommendCardService;
import com.moa.moapay.global.response.ResultResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/card")
public class CardController {

    private final RecommendCardService recommendCardService;

    @GetMapping("/recommend")
    public ResponseEntity<ResultResponse> recommend() {

        // 임시 request
        RecommendCardRequestDto recommendCardRequestDto = new RecommendCardRequestDto();

        List<RecommendCardResponseDto> recommendCardResponseDtos = recommendCardService.recommendCard(recommendCardRequestDto);
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "카드 상품 추천", recommendCardResponseDtos);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }
}
