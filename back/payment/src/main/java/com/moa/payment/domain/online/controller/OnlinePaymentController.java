package com.moa.payment.domain.online.controller;

import com.moa.payment.domain.online.model.dto.PaymentCardInfoDto;
import com.moa.payment.domain.online.model.dto.ExecuteOnlinePaymentRequestDto;
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

import java.util.ArrayList;
import java.util.List;

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
    public ResponseEntity<ResultResponse> disablePaymentInfo(@PathVariable String QRCode) {
        onlineService.disableOnlinePaymentInfo(QRCode);
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "QR코드를 비활성화했습니다.");
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @PostMapping("/info")
    public ResponseEntity<ResultResponse> executeOnlinePayment(@RequestBody ExecuteOnlinePaymentRequestDto dto) {
        // 우선은 단일 카드 선택인 경우만 구현
        onlineService.ExecuteOnlinePayment(dto);
        // 서비스 시행 이후, 클라이언트에 응답하면서 가맹점에도 결제 완료 메시지를 보내야 한다
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "결제를 마쳤습니다.");
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

}
