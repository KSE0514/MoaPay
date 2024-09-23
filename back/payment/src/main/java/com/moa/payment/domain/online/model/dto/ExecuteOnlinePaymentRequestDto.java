package com.moa.payment.domain.online.model.dto;

import com.moa.payment.domain.online.model.CardSelectionType;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@NoArgsConstructor
public class ExecuteOnlinePaymentRequestDto {
    private UUID orderId;
    private UUID merchantId;
    private String categoryId;
    private Long totalPrice;
    private CardSelectionType cardSelectionType; // FIX(정해진 카드 사용), RECOMMEND(추천 카드 조합 사용)
    private PaymentCardInfoDto paymentCardInfo;
}
