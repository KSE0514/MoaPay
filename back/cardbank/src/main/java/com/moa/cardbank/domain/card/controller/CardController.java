package com.moa.cardbank.domain.card.controller;

import com.moa.cardbank.domain.card.model.dto.CreateMyCardRequestDto;
import com.moa.cardbank.domain.card.model.dto.CreateMyCardResponseDto;
import com.moa.cardbank.domain.card.model.dto.ExecutePayRequestDto;
import com.moa.cardbank.domain.card.model.dto.ExecutePayResponseDto;
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

    @PostMapping("/pay")
    public ResponseEntity<ResultResponse> executePay(@RequestBody ExecutePayRequestDto dto) {
        log.info("payment request : {}", dto.getCardNumber());
        // 주어진 정보를 기반으로 결제 승인 처리 후, 응답한다
        // 한도초과 등, 결제에 실패한 경우 Exception 응답함
        ExecutePayResponseDto responseDto = cardService.executePay(dto);
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "결제 정상 승인", responseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @PostMapping("/my/create")
    public ResponseEntity<ResultResponse> createMycard(@RequestBody CreateMyCardRequestDto dto) {
        log.info("create my card");
        log.info("WARNING :: This feature is not completed. It isn't including card product info");
        // todo : 카드 상품 정보 포함하여 card entity 영속화하도록 변경 必
        CreateMyCardResponseDto responseDto = cardService.createMyCard(dto);
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "개인 카드 생성됨", responseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

}
