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
public class ExecuteOnlinePaymentRequestDto {
    private UUID orderId;
    private UUID merchantId;
    private String categoryId;
    private Long totalPrice;
    // 카드를 선택하여 결제하는 경우, 그 카드 정보를 포함해서 가져온다
    // 추천 결제인 경우 null
    private String cardId;
}
