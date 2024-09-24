package com.moa.moapay.domain.Card.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@Getter
@NoArgsConstructor
public class MyCardInfoDto {

    private String cardNumber;
    private String cvc;
    private boolean performanceOk;
    private Long cardLimit;
    private Long charges;
    private Long benefitUsage;
    private CardInfoResponseDto cardInfo;

    @Override
    public String toString() {
        return "MyCardInfoDto{" +
                "cardInfo=" + cardInfo +
                ", cardNumber='" + cardNumber + '\'' +
                ", cvc='" + cvc + '\'' +
                ", performanceOk=" + performanceOk +
                ", cardLimit=" + cardLimit +
                ", charges=" + charges +
                ", benefitUsage=" + benefitUsage +
                '}';
    }
}
