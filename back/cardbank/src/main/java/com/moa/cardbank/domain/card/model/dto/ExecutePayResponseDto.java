package com.moa.cardbank.domain.card.model.dto;

import com.moa.cardbank.domain.card.model.PayStatus;
import lombok.*;

import java.util.UUID;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExecutePayResponseDto {
    private PayStatus status;
    private UUID paymentId;
    private long amount;
    private long benefitBalance;
    private long remainedBenefit;
}
