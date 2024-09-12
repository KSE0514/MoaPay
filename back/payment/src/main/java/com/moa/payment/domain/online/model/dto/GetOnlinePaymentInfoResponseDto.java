package com.moa.payment.domain.online.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetOnlinePaymentInfoResponseDto {
    private UUID orderId;
    private UUID merchantId;
    private String merchantName;
    private String categoryId;
    private long totalPrice;
}
