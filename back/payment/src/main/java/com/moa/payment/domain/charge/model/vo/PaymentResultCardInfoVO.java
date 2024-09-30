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
public class PaymentResultCardInfoVO {
    private UUID cardId;
    private long amount;
    private boolean benefitActivated;
    private long benefitBalance;
    private long remainedBenefit;
    private BenefitDetailVO benefitDetail;

    @Override
    public String toString() {
        return "PaymentResultCardInfoVO{" +
                "cardId=" + cardId +
                ", amount=" + amount +
                ", benefitBalance=" + benefitBalance +
                ", remainedBenefit=" + remainedBenefit +
                ", benefitDetail=" + benefitDetail +
                '}';
    }
}
