package com.moa.moapay.domain.generalpay.model.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentCardInfoVO {
    private UUID cardId;
    private String cardName;
    private String imageUrl;
    private String cardNumber;
    private String cvc;
    private long amount;
    private long usedAmount; // 해당 카드에서 지금까지 얼마만큼 긁었는지
    private long performance;
    private long benefitUsage;
}
