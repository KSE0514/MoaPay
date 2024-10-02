package com.moa.payment.domain.charge.model.vo;

import lombok.*;

import java.util.UUID;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PaymentCardInfoVO {
    private UUID cardId;
    private String cardName;
    private String imageUrl;
    private String cardNumber;
    private String cvc;
    private long amount;
    private long performance;
    private long benefitUsage;
}
