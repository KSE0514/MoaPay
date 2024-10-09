package com.moa.payment.domain.charge.model.dto;

import lombok.*;

import java.util.UUID;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetPaymentLogRequestDto {
    private UUID memberId;
}
