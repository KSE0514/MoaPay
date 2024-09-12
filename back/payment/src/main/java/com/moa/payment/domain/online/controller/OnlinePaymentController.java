package com.moa.payment.domain.online.controller;

import com.moa.payment.domain.online.model.dto.GetOnlinePaymentInfoResponseDto;
import com.moa.payment.domain.online.model.dto.GetOnlineQRCodeRequestDto;
import com.moa.payment.domain.online.model.dto.GetOnlineQRCodeResponseDto;
import com.moa.payment.domain.online.model.dto.SendPaymentInfoRequestDto;
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
    public ResponseEntity<ResultResponse> disablePaymentInfo(@PathVariable String QRCode) {
        onlineService.disableOnlinePaymentInfo(QRCode);
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "QR코드를 비활성화했습니다.");
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @PostMapping("/payment/pay/online/info")
    public ResponseEntity<ResultResponse> requestPayment(@RequestBody SendPaymentInfoRequestDto dto){
        // [1] 멤버 서비스에서 인증 비밀번호 일치여부 확인(Kafka, 동기)
        // 어차피 요청자 구분하는 매커니즘에서 확인할 수 있지 않나... 안해도 될지도 모른다
        // 일단 나중에 하기로

        // [2] 카드 서비스에서 어떤 카드를 사용해 결제할건지 정보 받아오기
        //
        return null;
    }

}
