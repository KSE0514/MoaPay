package com.moa.moapay.domain.card.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CardInfoResponseDto {
    private String cardName;
    private String companyName;
    private Long benefitTotalLimit;
    private String cardType;
    private Long annualFee;
    private Long annualFeeForeign;
    private Long performance;
    private String imageUrl;
    private List<CardBenefitDto> benefits;

    @Override
    public String toString() {
        return "RecommendCardResponseDto{" +
                "cardName='" + cardName + '\'' +
                ", companyName='" + companyName + '\'' +
                ", benefitTotalLimit=" + benefitTotalLimit +
                ", cardType='" + cardType + '\'' +
                ", annualFee=" + annualFee +
                ", annualFeeForeign=" + annualFeeForeign +
                ", performance=" + performance +
                ", imageUrl='" + imageUrl + '\'' +
                ", benefits=" + benefits +
                '}';
    }
}
