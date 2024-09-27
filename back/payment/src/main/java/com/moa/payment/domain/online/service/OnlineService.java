package com.moa.payment.domain.online.service;

import com.moa.payment.domain.online.model.dto.*;

public interface OnlineService {

    GetOnlineQRCodeResponseDto getOnlineQRcode(GetOnlineQRCodeRequestDto dto);
    GetOnlinePaymentInfoResponseDto getOnlinePaymentInfo(String QRCode);
    void disableOnlinePaymentInfo(String QRCode);
    void ExecuteOnlinePayment(ExecuteOnlinePaymentRequestDto dto);

    void ExecutePayment(ExecutePaymentRequestDto dto);
}
