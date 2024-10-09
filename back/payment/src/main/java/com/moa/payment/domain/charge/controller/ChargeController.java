package com.moa.payment.domain.charge.controller;

import com.moa.payment.domain.charge.model.dto.CancelPayRequestDto;
import com.moa.payment.domain.charge.service.ChargeService;
import com.moa.payment.global.response.ResultResponse;
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
@RequestMapping("/charge")
public class ChargeController {

    private final ChargeService chargeService;

    @PostMapping("/cancel")
    public ResponseEntity<ResultResponse> cancelPayment(@RequestBody CancelPayRequestDto dto) {
        log.info("cancel payment");
        chargeService.CancelPayment(dto);
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "결제가 취소되었습니다.");
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

//    @PostMapping("/getPaymentLog")
//    public ResponseEntity<ResultResponse> getPaymentLog(@RequestBody PaymentLogDto dto) {
//        log.info("get payment log");
//
//        return null;
//    }
}
