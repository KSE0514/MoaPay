package com.moa.moapay.domain.code.service;

import com.moa.moapay.domain.code.model.dto.GetQRCodeRequestDto;
import com.moa.moapay.domain.code.model.dto.GetQRCodeResponseDto;
import com.moa.moapay.domain.code.model.dto.GetQRInfoResponseDto;
import com.moa.moapay.domain.code.repository.CodeRedisRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class CodeServiceImpl implements CodeService {

    private final CodeRedisRepository redisRepository;

    @Override
    public GetQRCodeResponseDto getQRCode(GetQRCodeRequestDto dto) {
        // [1] 등록된 값과 연동할 QRcode 발급, redis에 등록(Hash)
        int QRCode;
        while(true) {
            QRCode = (int)(Math.random() * 10000000);
            if(redisRepository.QRCodeRegistTest("QR:" + String.valueOf(QRCode))) break; // 성공적으로 등록되었다면 return
        }
        // [2] 중복 아닌 거 확인했다면 그 값 기반으로 나머지 결제정보 등록
        redisRepository.RegistQRCodeInfo(QRCode, dto);

        // [3] QRcode 리턴
        return GetQRCodeResponseDto.builder()
                .QRCode(String.valueOf(QRCode))
                .build();
    }

    @Override
    public GetQRInfoResponseDto getQRInfo(String QRCode) {
        HashMap<String, String> searchedInfo = redisRepository.findQRCodeInfo(QRCode);
        return GetQRInfoResponseDto.builder()
                .orderId(UUID.fromString(searchedInfo.get("orderId")))
                .merchantId(UUID.fromString(searchedInfo.get("merchantId")))
                .merchantName(searchedInfo.get("merchantName"))
                .categoryId(searchedInfo.get("categoryId"))
                .totalPrice(Long.parseLong(searchedInfo.get("totalPrice")))
                .build();
    }

    @Override
    public void disableQRCode(String QRCode) {
        redisRepository.disableQRCodeInfo(QRCode);
    }
}
