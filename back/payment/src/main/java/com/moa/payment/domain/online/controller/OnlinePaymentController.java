package com.moa.payment.domain.online.controller;

import com.moa.payment.domain.online.model.dto.GetOnlinePaymentInfoResponseDto;
import com.moa.payment.domain.online.model.dto.GetOnlineQRCodeRequestDto;
import com.moa.payment.domain.online.model.dto.GetOnlineQRCodeResponseDto;
import com.moa.payment.domain.online.service.OnlineService;
import com.moa.payment.global.response.ResultResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/payment/pay/online")
public class OnlinePaymentController {

    private final OnlineService onlineService;

    @PostMapping("/QRCode")
    public ResponseEntity<ResultResponse> getQRcode(@RequestBody GetOnlineQRCodeRequestDto dto) {
        GetOnlineQRCodeResponseDto responseDto = onlineService.getOnlineQRcode(dto);
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "QR코드를 발급했습니다.", responseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @GetMapping("/info/{QRCode}")
    public ResponseEntity<ResultResponse> getPaymentInfo(@PathVariable String QRCode) {
        GetOnlinePaymentInfoResponseDto responseDto = onlineService.getOnlinePaymentInfo(QRCode);
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "결제 정보를 불러왔습니다.", responseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @DeleteMapping("/info/{QRCode}")
    public ResponseEntity<ResultResponse> deletePaymentInfo(@PathVariable String QRCode) {
        onlineService.deleteOnlinePaymentInfo(QRCode);
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "QR코드를 비활성화했습니다.");
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

}
