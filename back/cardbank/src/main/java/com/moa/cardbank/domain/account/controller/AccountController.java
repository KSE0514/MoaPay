package com.moa.cardbank.domain.account.controller;

import com.moa.cardbank.domain.account.model.dto.CreateAccountRequestDto;
import com.moa.cardbank.domain.account.model.dto.CreateAccountResponseDto;
import com.moa.cardbank.domain.account.service.AccountService;
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
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/bank/account")
public class AccountController {

    private final AccountService accountService;

    @PostMapping("/create")
    public ResponseEntity<ResultResponse> createAccount(@RequestBody CreateAccountRequestDto dto) {
        CreateAccountResponseDto responseDto =  accountService.createAccount(dto);
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "계좌를 생성했습니다.", responseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }
}
