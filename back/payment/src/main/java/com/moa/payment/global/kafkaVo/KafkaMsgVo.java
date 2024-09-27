package com.moa.payment.global.kafkaVo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class KafkaMsgVo {

    // 결제, 환불
    private String paymentType;
    private UUID merchantId;
    private UUID cardId;
    private String cardNumber;
    private String cvc;
    private String categoryId;
    private long amount;

    @Override
    public String toString() {
        return "KafkaMsgVo{" +
                "merchantId=" + merchantId +
                ", cardId=" + cardId +
                ", cardNumber='" + cardNumber + '\'' +
                ", cvc='" + cvc + '\'' +
                ", amount=" + amount +
                '}';
    }
}
