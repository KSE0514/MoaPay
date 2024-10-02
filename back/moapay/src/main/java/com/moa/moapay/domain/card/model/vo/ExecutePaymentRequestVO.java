package com.moa.moapay.domain.card.model.vo;

import com.moa.moapay.domain.generalpay.model.vo.PaymentCardInfoVO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExecutePaymentRequestVO {
    private UUID requestId;
    private UUID merchantId;
    private List<PaymentCardInfoVO> paymentInfoList;

}
