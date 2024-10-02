package com.moa.payment.domain.charge.model.vo;

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
    private String categoryId;
    private long amount;

    @Override
    public String toString() {
        return "PaymentCardInfoVO{" +
                "cardId=" + cardId +
                ", cardNumber='" + cardNumber + '\'' +
                ", cvc='" + cvc + '\'' +
                ", amount=" + amount +
                '}';
    }
}
