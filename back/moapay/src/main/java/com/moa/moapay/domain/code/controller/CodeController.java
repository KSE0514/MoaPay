package com.moa.moapay.domain.code.controller;

import com.moa.moapay.domain.code.model.dto.GetQRCodeRequestDto;
import com.moa.moapay.domain.code.model.dto.GetQRCodeResponseDto;
import com.moa.moapay.domain.code.model.dto.GetQRInfoResponseDto;
import com.moa.moapay.domain.code.service.CodeService;
import com.moa.moapay.global.response.ResultResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/moapay/core/code")
public class CodeController {

    private final CodeService codeService;

    @PostMapping("/QRcode")
    public ResponseEntity<ResultResponse> getQRcode(@RequestBody GetQRCodeRequestDto dto) {
        GetQRCodeResponseDto responseDto = codeService.getQRCode(dto);
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "QR코드를 발급했습니다.", responseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @GetMapping("/QRcode/{QRCode}")
    public ResponseEntity<ResultResponse> getQRInfo(@PathVariable String QRCode) {
        GetQRInfoResponseDto responseDto = codeService.getQRInfo(QRCode);
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "결제 정보를 불러왔습니다.", responseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @DeleteMapping("/QRcode/{QRCode}")
    public ResponseEntity<ResultResponse> disableQRCode(@PathVariable String QRCode) {
        codeService.disableQRCode(QRCode);
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "QR코드를 비활성화했습니다.");
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

}
