package com.moa.moapay.domain.Card.service;

import com.moa.moapay.domain.Card.entity.MyCard;
import com.moa.moapay.domain.Card.model.dto.CardBenefitDto;
import com.moa.moapay.domain.Card.model.dto.CardInfoResponseDto;
import com.moa.moapay.domain.Card.model.dto.MyCardInfoDto;
import com.moa.moapay.domain.Card.repository.MyCardQueryRepository;
import com.moa.moapay.domain.Card.repository.MyCardRepository;
import com.moa.moapay.global.exception.BusinessException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.nio.ByteBuffer;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class MyCardServiceImpl implements MyCardService {

    private final MyCardQueryRepository myCardQueryRepository;

    @Override
    public List<MyCardInfoDto> getMyCardInfo(UUID memberId) {

        List<MyCard> myCards = myCardQueryRepository.findAllByMemberIdWithBenefits(memberId);

        if (myCards.isEmpty()) {
            throw new BusinessException(HttpStatus.NOT_FOUND, "등록된 카드가 없어요");
        }

        List<MyCardInfoDto> myCardsDto = myCards.stream().map(
                myCard -> {
                    List<CardBenefitDto> benefitDtos = myCard.getCardProduct().getBenefits().stream()
                            .map(benefit -> CardBenefitDto
                                    .builder()
                                    .categoryName(benefit.getCardBenefitCategory().getName())
                                    .categoryType(String.valueOf(benefit.getCategoryType()))
                                    .benefitDesc(benefit.getBenefitDesc())
                                    .benefitValue(benefit.getBenefitValue())
                                    .benefitType(benefit.getBenefitType())
                                    .benefitPoint(benefit.getBenefitPoint())
                                    .build())
                            .collect(Collectors.toList());

                    CardInfoResponseDto cardInfo = CardInfoResponseDto.builder()
                            .cardName(myCard.getCardProduct().getName())
                            .cardType(myCard.getCardProduct().getType())
                            .annualFee(myCard.getCardProduct().getAnnualFee())
                            .annualFeeForeign(myCard.getCardProduct().getAnnualFeeForeign())
                            .performance(myCard.getCardProduct().getPerformance())
                            .imageUrl(myCard.getCardProduct().getImageUrl())
                            .companyName(myCard.getCardProduct().getCompanyName())
                            .benefits(benefitDtos)
                            .build();

                    return MyCardInfoDto.builder()
                            .cvc(myCard.getCvc())
                            .cardNumber(String.valueOf(myCard.getCardNumber()))
                            .charges(myCard.getCharges())
                            .cardLimit(myCard.getCardLimit())
                            .benefitUsage(myCard.getBenefitUsage())
                            .performanceOk(myCard.isPerformanceOk())
                            .cardInfo(cardInfo)
                            .build();
                }).collect(Collectors.toList());

        log.info("myCards size {}", myCards.size());
        return myCardsDto; 
    }
}


