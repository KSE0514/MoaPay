package com.moa.store.domain.paymentInfo.service;

import com.moa.store.domain.order.model.dto.CreateOrderRequestDto;
import com.moa.store.domain.order.model.dto.CreateOrderResponseDto;
import com.moa.store.domain.order.service.OrderService;
import com.moa.store.global.exception.BusinessException;
import feign.FeignException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.moa.store.domain.paymentInfo.client.GetQRCodeResponseDto;
import com.moa.store.domain.paymentInfo.client.MoaPayClient;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PaymentInfoServiceImpl implements PaymentInfoService {

	private final MoaPayClient client;
	private final OrderService orderService;

	@Override
	@Transactional
	public GetQRCodeResponseDto getQRCode(CreateOrderRequestDto createOrderRequestDto) {
		try {
			CreateOrderResponseDto createOrderResponseDto = orderService.createOrder(createOrderRequestDto);
			GetQRCodeResponseDto getQRCodeResponseDto = client.getQRCode(createOrderResponseDto);
			if (getQRCodeResponseDto == null || getQRCodeResponseDto.getQRCode() == null) {
				throw new BusinessException(HttpStatus.INTERNAL_SERVER_ERROR, "QR 코드 생성에 실패했습니다.");
			}
			return getQRCodeResponseDto;
		} catch (FeignException e) {
			throw new BusinessException(HttpStatus.INTERNAL_SERVER_ERROR, "QR 코드 생성 중 오류가 발생했습니다(Feign 문제)");
		} catch (Exception e) {
			throw new BusinessException(HttpStatus.INTERNAL_SERVER_ERROR, "주문 처리 중 오류가 발생했습니다: " + e.getMessage());
		}
	}
}
