package com.moa.moapay.domain.generalpay.service;

import com.moa.moapay.domain.generalpay.model.dto.ExecuteGeneralPayRequestDto;

public interface GeneralPayService {
    void executeGeneralPay(ExecuteGeneralPayRequestDto dto);
}
