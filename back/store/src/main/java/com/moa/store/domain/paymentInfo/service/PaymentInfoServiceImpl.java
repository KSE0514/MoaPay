package com.moa.store.domain.paymentInfo.service;

import java.util.UUID;

import com.moa.store.domain.order.model.Order;
import com.moa.store.domain.order.model.dto.CreateOrderRequestDto;
import com.moa.store.domain.order.model.dto.CreateOrderResponseDto;
import com.moa.store.domain.order.model.dto.OrderResponseDto;
import com.moa.store.domain.order.repository.OrderRepository;
import com.moa.store.domain.order.service.OrderService;
import com.moa.store.domain.paymentInfo.client.ExecuteOfflinePayRequestDto;
import com.moa.store.domain.paymentInfo.model.PaymentInfo;
import com.moa.store.domain.paymentInfo.model.ProcessingStatus;
import com.moa.store.domain.paymentInfo.model.dto.PaymentResultRequestDto;
import com.moa.store.domain.paymentInfo.repository.PaymentInfoRepository;
import com.moa.store.global.exception.BusinessException;
import feign.FeignException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.moa.store.domain.paymentInfo.client.GetQRCodeResponseDto;
import com.moa.store.domain.paymentInfo.client.MoaPayClient;
import com.moa.store.global.response.ResultResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PaymentInfoServiceImpl implements PaymentInfoService {

	private final MoaPayClient moaPayClient;
	private final PaymentInfoRepository paymentInfoRepository;
	private final OrderService orderService;
	private final OrderRepository orderRepository;

	@Override
	@Transactional
	public GetQRCodeResponseDto getQRCode(CreateOrderRequestDto createOrderRequestDto) {
		try {
			CreateOrderResponseDto createOrderResponseDto = orderService.createOrder(createOrderRequestDto);
			GetQRCodeResponseDto getQRCodeResponseDto = moaPayClient.getQRCode(createOrderResponseDto);
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

	@Override
	@Transactional
	public void savePaymentInfo(PaymentResultRequestDto paymentResultRequestDto) {
		Order order = orderRepository.findByUuid(paymentResultRequestDto.getOrderId())
			.orElseThrow(() -> new BusinessException(HttpStatus.BAD_REQUEST, "주문 UUID를 확인해주세요"));
		PaymentInfo paymentInfo = PaymentInfo.builder()
			.cardNumber(paymentResultRequestDto.getCardNumber())
			.amount(paymentResultRequestDto.getAmount())
			.actualAmount(paymentResultRequestDto.getAmount())
			.order(order)
			.status(ProcessingStatus.APPROVED)
			.build();
		paymentInfoRepository.save(paymentInfo);
	}

	// @Override
	// public OrderResponseDto offlinePayment(ExecuteOfflinePayRequestDto executeOfflinePayRequestDto) {
	// 	ResponseEntity<ResultResponse> response = moaPayClient.executeOfflinePay(executeOfflinePayRequestDto);
	// 	if (response.getStatusCode() == HttpStatus.OK) {
	//
	// 		savePaymentInfo()
	// 	}
	// 	return null;
	// }
}
