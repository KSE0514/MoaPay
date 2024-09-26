package com.moa.payment.domain.online.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.util.UUID;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ExecutePaymentRequestDto {
    private UUID merchantId;
    private UUID cardId;
    private String cardNumber;
    private String cvc;
    private long amount;

    @Override
    public String toString() {
        return "ExecutePaymentRequestDto{" +
                "merchantId=" + merchantId +
                ", cardId=" + cardId +
                ", cardNumber='" + cardNumber + '\'' +
                ", cvc='" + cvc + '\'' +
                ", amount=" + amount +
                '}';
    }
}
