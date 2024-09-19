package com.moa.payment.domain.online.controller;

import com.moa.payment.domain.online.model.PaymentCardInfoDto;
import com.moa.payment.domain.online.model.dto.ExecuteOnlinePaymentRequestDto;
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
import org.springframework.web.client.RestTemplate;

import javax.xml.transform.Result;
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
        // 일단은 카드를 받았다는 가정 하에 결제 부분만 구현 진행
        List<PaymentCardInfoDto> cardList = new ArrayList<>();
        if(dto.getCardId() == null) {
            // 이 부분에서 추천카드와 사용금액 리스트를 가져온다
        } else {
            // 이미 카드가 있다면, 그 카드의 정보를 cardList에 담아서 가져옴
            // 여기에서도 moapay에 물어보는 과정은 필요할듯?
            // 우선은 테스트를 위해 하드코딩.
        }
        return null;
    }

}
