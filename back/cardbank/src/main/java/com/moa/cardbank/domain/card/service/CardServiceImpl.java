package com.moa.cardbank.domain.card.service;

import com.moa.cardbank.domain.account.entity.Account;
import com.moa.cardbank.domain.account.repository.AccountRepository;
import com.moa.cardbank.domain.card.entity.MyCard;
import com.moa.cardbank.domain.card.entity.PaymentLog;
import com.moa.cardbank.domain.card.model.Status;
import com.moa.cardbank.domain.card.model.dto.CreateMyCardRequestDto;
import com.moa.cardbank.domain.card.model.dto.CreateMyCardResponseDto;
import com.moa.cardbank.domain.card.model.dto.ExecutePayRequestDto;
import com.moa.cardbank.domain.card.model.dto.ExecutePayResponseDto;
import com.moa.cardbank.domain.card.repository.MyCardRepository;
import com.moa.cardbank.domain.card.repository.PaymentLogRepository;
import com.moa.cardbank.domain.member.entity.Member;
import com.moa.cardbank.domain.member.repository.MemberRepository;
import com.moa.cardbank.domain.store.entity.Merchant;
import com.moa.cardbank.domain.store.repository.MerchantRepository;
import com.moa.cardbank.global.exception.BusinessException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class CardServiceImpl implements CardService {

    private final MyCardRepository myCardRepository;
    private final PaymentLogRepository paymentLogRepository;
    private final MerchantRepository merchantRepository;
    private final MemberRepository memberRepository;
    private final AccountRepository accountRepository;

    @Override
    @Transactional
    public ExecutePayResponseDto executePay(ExecutePayRequestDto dto) {
        // [1] 요청 카드 정보가 유효한지 검사
        UUID cardId = dto.getCardId();
        MyCard myCard = myCardRepository.findByUuid(cardId)
                .orElseThrow(() -> new BusinessException(HttpStatus.BAD_REQUEST, "UUID를 확인해주세요."));
        // UUID로 찾은 카드가 주어진 number, cvc와 일치하지 않으면 예외 출력
        if(!myCard.getCardNumber().equals(dto.getCardNumber()) || !myCard.getCvc().equals(dto.getCvc())) {
            throw new BusinessException(HttpStatus.BAD_REQUEST, "유효하지 않은 카드 정보입니다.");
        }

        // [2] 결제 가능한 상태인지 확인
        // 카드 한도와 이번달 결제금액을 기반으로 남은 한도를 계산하고, 요청한 결제가 가능할지 확인
        // 혜택도 여기서 적용하...지만, 일단은 단순 결제로만 (혜택과 상품 관련된 테이블이 아직 없음)
        long capacity = myCard.getCardLimit() - myCard.getAmount();
        if(capacity > dto.getAmount()) {
            // 한도초과인 경우, 결제 실패
            throw new BusinessException(HttpStatus.BAD_REQUEST, "한도 초과입니다.");
        }

        // [3] 결제
        // 결제 자격이 충분하고 한도 초과도 아닌 경우, 결제 가능
        // 결제 로그를 남기고, 혜택과 관련된 값을 기록한다
        Merchant merchant = merchantRepository.findByUuid(dto.getMerchantId())
                .orElseThrow(() -> new BusinessException(HttpStatus.BAD_REQUEST, "유효하지 않은 카드 정보입니다."));

        PaymentLog paymentLog = PaymentLog.builder()
                .cardId(myCard.getId())
                .merchantId(merchant.getId())
                .amount(dto.getAmount())
                .status(Status.APPROVED)
                .build();

        paymentLogRepository.save(paymentLog);

        // 저장에 성공했다면, myCard의 값을 변경
        long newAmount = myCard.getAmount()+dto.getAmount();
        MyCard newCard = myCard.toBuilder()
                .amount(newAmount)
                .build();
        // todo : 혜택 적용 기능 만든 후, 여기에서 사용한 혜택 금액도 갱신하도록 하기
        // 변경사항 명시적으로 update, 이후 응답을 작성한다.
        myCardRepository.save(newCard);

        return ExecutePayResponseDto.builder()
                .paymentId(paymentLog.getUuid())
                .amount(paymentLog.getAmount())
                .benefitBalance(0)
                .remainedBenefit(0)
                .build();
    }

    @Override
    public CreateMyCardResponseDto createMyCard(CreateMyCardRequestDto dto) {

        Member member = memberRepository.findByUuid(dto.getMemberId())
                .orElseThrow(() -> new BusinessException(HttpStatus.BAD_REQUEST, "유효하지 않은 입력입니다."));
        Account account = accountRepository.findByUuid(dto.getAccountId())
                .orElseThrow(() -> new BusinessException(HttpStatus.BAD_REQUEST, "유효하지 않은 입력입니다."));

        // 카드번호와 cvc는 무작위 생성
        // 카드 번호는 중복검사 이후 결정한다
        String cardNumber;
        while(true){
            cardNumber = String.valueOf((int)(Math.random()*100000000))+String.valueOf((int)(Math.random()*100000000));
            if(!myCardRepository.existsByCardNumber(cardNumber)) { // 안 겹치는 카드 번호가 나올 때까지 반복
                break;
            }
        }
        String cvc = String.valueOf((int)(Math.random()*1000));

        MyCard newCard = MyCard.builder()
                .cardNumber(cardNumber)
                .cvc(cvc)
                .performanceFlag(false)
                .cardLimit(300000) // 임시로 임의의 값 지정
                .amount(0)
                .benefitUsage(0)
                .memberId(member.getId())
                .accountId(account.getId())
                .build();

        myCardRepository.save(newCard);

        return CreateMyCardResponseDto.builder()
                .myCardId(newCard.getUuid())
                .myCardNumber(newCard.getCardNumber())
                .build();
    }
}
