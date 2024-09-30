package com.moa.store.domain.paymentInfo.client;

import java.util.UUID;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GetQRCodeRequestDto {
	private UUID orderId;
	private UUID merchantId;
	private String merchantName;
	private String categoryId;
	private long totalPrice;
}
