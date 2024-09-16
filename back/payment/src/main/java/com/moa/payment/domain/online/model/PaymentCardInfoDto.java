package com.moa.payment.domain.online.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentCardInfoDto {
    private UUID cardId;
    private String cardNumber;
    private String cvc;
    private long amount;
}
