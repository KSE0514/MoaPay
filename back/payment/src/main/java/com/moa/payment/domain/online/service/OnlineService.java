package com.moa.payment.domain.online.service;

import com.moa.payment.domain.online.model.dto.GetOnlinePaymentInfoResponseDto;
import com.moa.payment.domain.online.model.dto.GetOnlineQRCodeRequestDto;
import com.moa.payment.domain.online.model.dto.GetOnlineQRCodeResponseDto;

public interface OnlineService {

    GetOnlineQRCodeResponseDto getOnlineQRcode(GetOnlineQRCodeRequestDto dto);
    GetOnlinePaymentInfoResponseDto getOnlinePaymentInfo(String QRCode);
    void disableOnlinePaymentInfo(String QRCode);
}
