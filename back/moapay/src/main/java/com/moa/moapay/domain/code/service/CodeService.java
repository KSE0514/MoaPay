package com.moa.moapay.domain.code.service;

import com.moa.moapay.domain.code.model.dto.GetQRCodeRequestDto;
import com.moa.moapay.domain.code.model.dto.GetQRCodeResponseDto;
import com.moa.moapay.domain.code.model.dto.GetQRInfoResponseDto;

public interface CodeService {
    GetQRCodeResponseDto getQRCode(GetQRCodeRequestDto dto);
    GetQRInfoResponseDto getQRInfo(String QRCode);
    void disableQRCode(String QRCode);
}
