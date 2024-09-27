package com.moa.moapay.domain.generalpay.controller;

import com.moa.moapay.domain.card.entity.MyCard;
import com.moa.moapay.domain.generalpay.model.dto.ExecuteGeneralPayRequestDto;
import com.moa.moapay.domain.generalpay.service.GeneralPayService;
import com.moa.moapay.global.response.ResultResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/generalpay")
public class GeneralPayController {

    private final GeneralPayService generalPayService;

    @PostMapping("/pay")
    public ResponseEntity<ResultResponse> executeGeneralPay(@RequestBody ExecuteGeneralPayRequestDto dto) {
        // 응답은 비동기식 SSE로 보낼 예정이므로, response 본문은 비워서 보낸다
        log.info("execute general pay : {}", dto.toString());
        generalPayService.executeGeneralPay(dto);
        return null;
    }

}
