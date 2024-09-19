package com.moa.cardbank.domain.account.service;

import com.moa.cardbank.domain.account.model.dto.CreateAccountRequestDto;
import com.moa.cardbank.domain.account.model.dto.CreateAccountResponseDto;

public interface AccountService {
    CreateAccountResponseDto createAccount(CreateAccountRequestDto dto);
}
