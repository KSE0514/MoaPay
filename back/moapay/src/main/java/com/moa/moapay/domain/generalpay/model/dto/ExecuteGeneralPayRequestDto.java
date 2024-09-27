package com.moa.moapay.domain.generalpay.model.dto;

import com.moa.moapay.domain.generalpay.model.CardSelectionType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.UUID;

@Getter
@NoArgsConstructor
@ToString
public class ExecuteGeneralPayRequestDto {
    private UUID orderId;
    private UUID merchantId;
    private String categoryId;
    private CardSelectionType cardSelectionType;
    private long totalPrice;
    private String cardNumber;
    private String cvc;
}
