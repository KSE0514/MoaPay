package com.moa.payment.domain.online.model.dto;

import lombok.Getter;

import java.util.UUID;

@Getter
public class SendPaymentInfoRequestDto {
    private UUID userId;
    private UUID orderId;
    private String simplePassword;
    private String categoryId;
    private long amount;
}
