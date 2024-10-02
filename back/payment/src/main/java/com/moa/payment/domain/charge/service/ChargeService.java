package com.moa.payment.domain.charge.service;

import com.moa.payment.domain.charge.model.dto.PaymentResultDto;
import com.moa.payment.domain.charge.model.vo.ExecutePaymentRequestVO;
import com.moa.payment.domain.charge.model.vo.ExecutePaymentResultVO;

import java.util.UUID;

public interface ChargeService {
    ExecutePaymentResultVO executePayment(ExecutePaymentRequestVO vo);
    PaymentResultDto makePaymentResultDto(ExecutePaymentResultVO resultVo, ExecutePaymentRequestVO requestVO);
}
