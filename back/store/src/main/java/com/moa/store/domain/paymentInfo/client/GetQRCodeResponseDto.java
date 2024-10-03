package com.moa.store.domain.paymentInfo.client;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GetQRCodeResponseDto {
	private String QRCode;
}