package com.moa.moapay.domain.card.model;

import com.moa.moapay.domain.card.entity.MyCard;
import lombok.*;

@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class PayCardScore implements Comparable<PayCardScore>{

    private MyCard myCard;
    private long maxBenefitAmount; // 원금 이하의 금액 중 혜택을 받을 수 있는 최고 결제 금액
    private long benefitValue; // 위의 값으로 결제했을 때 얻을 수 있는 혜택 종합
    private long maxPerformanceAmount; // 원금 이하의 금액 중 유효하게 실적을 채울 수 있는 최고 결제 금액
    private long performanceValue; // 위의 값으로 결제했을 때 채울 수 있는 실적

    @Override
    public int compareTo(PayCardScore o) {
        return Long.compare(o.getMaxBenefitAmount(), this.maxBenefitAmount);
    }
}
