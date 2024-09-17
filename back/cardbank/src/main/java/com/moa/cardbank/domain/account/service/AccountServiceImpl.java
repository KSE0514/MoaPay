package com.moa.cardbank.domain.account.service;

import com.moa.cardbank.domain.account.entity.Account;
import com.moa.cardbank.domain.account.model.dto.CreateAccountRequestDto;
import com.moa.cardbank.domain.account.model.dto.CreateAccountResponseDto;
import com.moa.cardbank.domain.account.repository.AccountRepository;
import com.moa.cardbank.domain.member.entity.Member;
import com.moa.cardbank.domain.member.repository.MemberRepository;
import com.moa.cardbank.global.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;

@Service
@RequiredArgsConstructor
@Slf4j
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;
    private final MemberRepository memberRepository;

    @Override
    public CreateAccountResponseDto createAccount(CreateAccountRequestDto dto) {
        Member member = memberRepository.findByUuid(dto.getMemberId())
                .orElseThrow(() -> new BusinessException(HttpStatus.BAD_REQUEST, "요청 데이터가 잘못되었습니다."));
        // 계좌번호는 생성일시 + 난수 4자리로 생성
        Date now = new Date();
        String date = new SimpleDateFormat("yyyymmddhhmmss").format(now);
        String randomNumber = String.valueOf((int)(Math.random()*10000));
        log.info("new account number : {}", date+randomNumber);
        Account account = Account.builder()
                .memberId(member.getId())
                .number(date+randomNumber)
                .balance(0L)
                .build();
        accountRepository.save(account);
        return CreateAccountResponseDto.builder()
                .accountId(account.getUuid())
                .accountNumber(account.getNumber())
                .build();
    }
}
