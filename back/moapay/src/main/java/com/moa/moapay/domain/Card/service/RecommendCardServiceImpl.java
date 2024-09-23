package com.moa.moapay.domain.Card.service;

import com.moa.moapay.domain.Card.entity.CardBenefit;
import com.moa.moapay.domain.Card.entity.CardProduct;
import com.moa.moapay.domain.Card.entity.CategoryType;
import com.moa.moapay.domain.Card.model.dto.CardBenefitDto;
import com.moa.moapay.domain.Card.model.dto.RecommendCardRequestDto;
import com.moa.moapay.domain.Card.model.dto.RecommendCardResponseDto;
import com.moa.moapay.domain.Card.repository.CardBenefigCategoryRepository;
import com.moa.moapay.domain.Card.repository.CardBenefitRepository;
import com.moa.moapay.domain.Card.repository.CardProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class RecommendCardServiceImpl implements RecommendCardService {

    private final CardProductRepository productRepository;
    private final CardBenefitRepository benefitRepository;
    private final CardBenefigCategoryRepository benefigCategoryRepository;
    private final CardProductRepository cardProductRepository;

    /**
     * 카드 상품 추천 로직
     *
     * @param recommendCardRequestDto
     * @return
     */
    @Override
    public List<RecommendCardResponseDto> recommendCard(RecommendCardRequestDto recommendCardRequestDto) {

        // TODO: 1. 소비 패턴 분석 자료 가져오기

        // 2. 전체 카드 목록 조회
        List<CardProduct> AllCards = productRepository.findAll();

        log.info("cards size = {}", String.valueOf(AllCards.size()));

        List<CardBenefit> allBenefits = benefitRepository.findAll();

        // 카드로 그룹화
        Map<CardProduct, List<CardBenefit>> benefitsByCard = allBenefits.stream()
                .collect(Collectors.groupingBy(CardBenefit::getCardProduct)); // getCardId()는 카드 ID를 반환하는 메서드

        // 카드별로 출력

        // 다시 조회 하지 말고 리스트 같은데 저장 해 놓고 쓰는게 좋을듯함
        // 전월 실적, 연회비 계산

        // 3. 점수 계산
        List<Optional<CardProduct>> recomendCards = calculateScore(benefitsByCard);

        // 4. 제일 점수가 높은 카드 반환
        List<RecommendCardResponseDto> recomendCardDtos = recomendCards.stream()
                .map(cardProduct -> {

//                    log.info("card product = {}", cardProduct.get());

                    List<CardBenefit> benefits = benefitRepository.findByCardProduct_Id(cardProduct.get().getId());
                    List<CardBenefitDto> benefitDtos = benefits.stream()
                            .map(benefit -> {

                                log.info("benefits = {}", benefit.getCardBenefitCategory().getName());

                                return CardBenefitDto.builder()
                                        .categoryName(benefit.getCardBenefitCategory().getName())
                                        .categoryType(String.valueOf(benefit.getCategoryType()))
                                        .benefitDesc(benefit.getBenefitDesc())
                                        .benefitUnit(benefit.getBenefitUnit())
                                        .benefitValue(benefit.getBenefitValue())
                                        .benefitType(benefit.getBenefitType())
                                        .benefitPoint(benefit.getBenefitPoint())
                                        .build();
                            }).collect(Collectors.toList());


                    return RecommendCardResponseDto.builder()
                            .cardName(cardProduct.get().getName())
                            .companyName(cardProduct.get().getCompanyName())
                            .cardType(cardProduct.get().getType())
                            .annualFee(cardProduct.get().getAnnualFee())
                            .annualFeeForeign(cardProduct.get().getAnnualFeeForeign())
                            .benefitTotalLimit(cardProduct.get().getBenefitTotalLimit())
                            .performance(cardProduct.get().getPerformance())
                            .imageUrl(cardProduct.get().getImageUrl())
                            .benefits(benefitDtos)
                            .build();
                }).collect(Collectors.toList());


        return recomendCardDtos;
    }

    /**
     * 카드 상품 추천 점수 계산 로직
     *
     * @param benefitsByCard
     * @return
     */
    private List<Optional<CardProduct>> calculateScore(Map<CardProduct, List<CardBenefit>> benefitsByCard) {

        ArrayList<Integer> cardScores = new ArrayList<>();
        Map<CardProduct, Float> cardScoreMap = new HashMap<>();

        // 각 혜택 별 점수 계산
        benefitsByCard.forEach((cardProduct, benefits) -> {

            // 각 카드에 대해 점수를 계산
            int score = benefits.stream()
                    .mapToInt(benefit -> {
                        int benefitPoint = benefit.getBenefitPoint();
                        CategoryType categoryType = benefit.getCategoryType();

                        // 점수 계산 로직 추가
                        return benefitPoint; // TODO: 사용자 가중치 추가
                    })
                    .sum();
            cardScoreMap.put(cardProduct,(float) score);
        });

        Collections.sort(cardScores, Collections.reverseOrder());

        List<Map.Entry<CardProduct, Float>> sortedCardScores = cardScoreMap.entrySet().stream()
                        .sorted(Map.Entry.<CardProduct, Float>comparingByValue().reversed())
                        .collect(Collectors.toList());



        log.info("cardScores = {}", sortedCardScores.size());

        List<Optional<CardProduct>> cardProducts = new ArrayList<>();

        // 추천할 카드 상품 최대 10개 조회
        for (int i = 0; i < Math.min(10, sortedCardScores.size()); i++) {
            CardProduct cardProduct = sortedCardScores.get(i).getKey(); // 상위 카드 상품
            Optional<CardProduct> recomendCard = cardProductRepository.findOneById(cardProduct.getId());

            if (recomendCard.isPresent()) {
                cardProducts.add(recomendCard);
            }
        }

        return cardProducts;
    }

}
