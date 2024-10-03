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
    private UUID requestId; // 프론트에서 생성해서 전달, 전송 버튼 누를 때마다 생성하지 말고 할 것
    private UUID orderId;
    private UUID merchantId;
//    private String categoryId;
    private CardSelectionType cardSelectionType;
    private long totalPrice;
    private String cardNumber;
    private String cvc;
}
