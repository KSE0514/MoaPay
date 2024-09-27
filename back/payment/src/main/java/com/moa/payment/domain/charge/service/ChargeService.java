package com.moa.payment.domain.charge.service;

import com.moa.payment.domain.charge.model.vo.ExecutePaymentRequestVO;
import com.moa.payment.domain.charge.model.vo.ExecutePaymentResultVO;

public interface ChargeService {
    ExecutePaymentResultVO executePayment(ExecutePaymentRequestVO vo);
}
