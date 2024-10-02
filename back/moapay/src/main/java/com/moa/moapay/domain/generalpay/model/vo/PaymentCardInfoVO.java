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
    private String cardNumber;
    private String cvc;
    private long amount;
}
