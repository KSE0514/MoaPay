package com.moa.cardbank.domain.card.controller;

import com.moa.cardbank.domain.card.model.dto.*;
import com.moa.cardbank.domain.card.service.CardService;
import com.moa.cardbank.global.response.ResultResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/bank/card")
public class CardController {

    private final CardService cardService;

    /* 일반 카드 API */

    @PostMapping("/create")
    public ResponseEntity<ResultResponse> createCardProduct(@RequestBody CreateCardProductRequestDto dto){
        log.info("create card product : {}", dto.getName());
        CreateCardProductResponseDto responseDto = cardService.createCardProduct(dto);
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "카드 상품을 추가했습니다.", responseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @PostMapping("/pay")
    public ResponseEntity<ResultResponse> executePay(@RequestBody ExecutePayRequestDto dto) {
        log.info("payment request : {}", dto.getCardNumber());
        ExecutePayResponseDto responseDto = cardService.executePay(dto);
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "결제 처리 완료", responseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    /* 개인 카드 관련 API */

    @PostMapping("/my/create")
    public ResponseEntity<ResultResponse> createMycard(@RequestBody CreateMyCardRequestDto dto) {
        log.info("create my card");
        CreateMyCardResponseDto responseDto = cardService.createMyCard(dto);
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "개인 카드 생성됨", responseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

}
