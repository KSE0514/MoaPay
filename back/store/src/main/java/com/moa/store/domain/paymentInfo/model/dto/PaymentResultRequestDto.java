package com.moa.store.domain.paymentInfo.model.dto;

import java.util.UUID;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PaymentResultRequestDto {
	private UUID orderId;
	private String cardNumber;
	private long amount;
}
