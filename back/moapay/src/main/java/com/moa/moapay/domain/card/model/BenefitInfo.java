package com.moa.moapay.domain.card.model;

import lombok.*;

@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class BenefitInfo {
    private long totalDiscount;
    private long totalPoint;
    private long totalCashback;
    private long totalBenefit;
}
