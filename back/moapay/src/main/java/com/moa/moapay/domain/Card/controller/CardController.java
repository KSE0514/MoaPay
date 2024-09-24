package com.moa.moapay.domain.Card.controller;

import com.moa.moapay.domain.Card.model.dto.CardInfoResponseDto;
import com.moa.moapay.domain.Card.model.dto.MyCardInfoDto;
import com.moa.moapay.domain.Card.service.MyCardService;
import com.moa.moapay.domain.Card.service.RecommendCardService;
import com.moa.moapay.global.response.ResultResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/payment/card")
public class CardController {

    private final RecommendCardService recommendCardService;
    private final MyCardService myCardService;

    @GetMapping("/recommend")
    public ResponseEntity<ResultResponse> recommend(HttpServletRequest request) {
        List<CardInfoResponseDto> recommendCardResponseDtos = recommendCardService.recommendCard(request);
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "카드 상품 추천", recommendCardResponseDtos);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @GetMapping("/mycard")
    public ResponseEntity<ResultResponse> mycard(@RequestParam UUID memberId) {
        List<MyCardInfoDto> myCardInfo = myCardService.getMyCardInfo(memberId);
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "나의 카드 조회", myCardInfo);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @GetMapping("/cardList")
    public ResponseEntity<ResultResponse> cardList() {
        List<CardInfoResponseDto> allCard = myCardService.getAllCard();
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "카드 전체 조회", allCard);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }
}
