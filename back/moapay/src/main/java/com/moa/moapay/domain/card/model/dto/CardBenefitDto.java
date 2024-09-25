package com.moa.moapay.domain.card.model.dto;

import com.moa.moapay.domain.card.entity.BenefitType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CardBenefitDto {

    private String categoryName;
    private String categoryType;
    // enum
    private BenefitType benefitType;

    private float benefitValue;
    private String benefitDesc;
    private int benefitPoint;

    @Override
    public String toString() {
        return "CardBenefitDto{" +
                "categoryName='" + categoryName + '\'' +
                ", benefitType=" + benefitType +
                ", benefitValue=" + benefitValue +
                ", benefitDesc='" + benefitDesc + '\'' +
                ", benefitPoint=" + benefitPoint +
                '}';
    }
}
