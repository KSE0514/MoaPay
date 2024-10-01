package com.moa.store.domain.paymentInfo.service;

import com.moa.store.domain.order.model.dto.CreateOrderResponseDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.moa.store.domain.paymentInfo.client.GetQRCodeRequestDto;
import com.moa.store.domain.paymentInfo.client.GetQRCodeResponseDto;
import com.moa.store.domain.paymentInfo.client.MoaPayClient;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PaymentInfoServiceImpl implements PaymentInfoService {

	private final MoaPayClient client;

	@Override
	public GetQRCodeResponseDto getQRCode(CreateOrderResponseDto getQRCodeRequestDto) {
		GetQRCodeResponseDto qrCode = client.getQRCode(getQRCodeRequestDto);
		return qrCode;
	}
}
