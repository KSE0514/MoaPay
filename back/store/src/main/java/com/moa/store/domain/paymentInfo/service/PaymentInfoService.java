package com.moa.store.domain.paymentInfo.service;

import com.moa.store.domain.order.model.dto.CreateOrderRequestDto;
import com.moa.store.domain.paymentInfo.client.GetQRCodeResponseDto;

public interface PaymentInfoService {
	GetQRCodeResponseDto getQRCode(CreateOrderRequestDto createOrderRequestDto);
}
