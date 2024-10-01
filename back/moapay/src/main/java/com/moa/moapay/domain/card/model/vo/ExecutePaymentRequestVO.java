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

    private UUID merchantId;
    private UUID requestCode;
    private List<PaymentCardInfoVO> paymentInfoList;

}
