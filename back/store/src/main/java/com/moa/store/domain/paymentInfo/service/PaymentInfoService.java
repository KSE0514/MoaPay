package com.moa.store.domain.paymentInfo.service;

import com.moa.store.domain.order.model.dto.CreateOrderResponseDto;
import com.moa.store.domain.paymentInfo.client.GetQRCodeRequestDto;
import com.moa.store.domain.paymentInfo.client.GetQRCodeResponseDto;

public interface PaymentInfoService {
	GetQRCodeResponseDto getQRCode(CreateOrderResponseDto getQRCodeRequestDto);
}
