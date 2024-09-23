package com.moa.moapay.domain.Card.model.dto;

import com.moa.moapay.domain.Card.entity.BenefitType;
import com.moa.moapay.domain.Card.entity.BenefitUnit;
import com.moa.moapay.domain.Card.entity.CategoryType;
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
    private BenefitUnit benefitUnit;

    private float benefitValue;
    private String benefitDesc;
    private int benefitPoint;

    @Override
    public String toString() {
        return "CardBenefitDto{" +
                "categoryName='" + categoryName + '\'' +
                ", benefitType=" + benefitType +
                ", benefitUnit=" + benefitUnit +
                ", benefitValue=" + benefitValue +
                ", benefitDesc='" + benefitDesc + '\'' +
                ", benefitPoint=" + benefitPoint +
                '}';
    }
}
