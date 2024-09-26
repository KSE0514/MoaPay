package com.moa.moapay.domain.card.service;

import com.moa.moapay.domain.card.entity.CardProduct;
import com.moa.moapay.domain.card.entity.MyCard;
import com.moa.moapay.domain.card.model.dto.CardBenefitDto;
import com.moa.moapay.domain.card.model.dto.CardInfoResponseDto;
import com.moa.moapay.domain.card.model.dto.MyCardInfoDto;
import com.moa.moapay.domain.card.repository.CardProductRepository;
import com.moa.moapay.domain.card.repository.MyCardQueryRepository;
import com.moa.moapay.global.exception.BusinessException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class MyCardServiceImpl implements MyCardService {

    private final CardProductRepository cardProductRepository;
    private final MyCardQueryRepository myCardQueryRepository;

    @Override
    public List<MyCardInfoDto> getMyCardInfo(HttpServletRequest request) {

        // todo: 여기서 쿠키를 뜯어서 UUID 찾기
        // 이건 테스트용
        UUID memberId = UUID.fromString("550e8400-e29b-41d4-a716-446655440000");

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

    @Override
    public List<CardInfoResponseDto> getAllCard() {

//        List<CardProduct> cards = cardProductRepository.findAll();
        List<CardProduct> cards = myCardQueryRepository.findAll();

        List<CardInfoResponseDto> cardsDto = cards.stream().map(
                cardProduct -> {
                    List<CardBenefitDto> benefitDtos = cardProduct.getBenefits().stream()
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

                    return CardInfoResponseDto.builder()
                            .cardName(cardProduct.getName())
                            .cardType(cardProduct.getType())
                            .annualFee(cardProduct.getAnnualFee())
                            .annualFeeForeign(cardProduct.getAnnualFeeForeign())
                            .performance(cardProduct.getPerformance())
                            .companyName(cardProduct.getCompanyName())
                            .benefitTotalLimit(cardProduct.getBenefitTotalLimit())
                            .imageUrl(cardProduct.getImageUrl())
                            .benefits(benefitDtos)
                            .build();
                }
        ).collect(Collectors.toList());

        return cardsDto;
    }
}


