package com.moa.moapay.domain.generalpay.service;

import com.moa.moapay.domain.generalpay.model.dto.ExecuteGeneralPayRequestDto;
import com.moa.moapay.domain.generalpay.model.dto.ExecuteOfflinePayRequestDto;

public interface GeneralPayService {
    void executeGeneralPay(ExecuteGeneralPayRequestDto dto);
    void executeOfflinePay(ExecuteOfflinePayRequestDto dto);
}
