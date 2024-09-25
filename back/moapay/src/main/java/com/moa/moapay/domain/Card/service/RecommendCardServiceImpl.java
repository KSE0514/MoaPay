package com.moa.moapay.domain.Card.service;

import com.moa.moapay.domain.Card.entity.CardBenefit;
import com.moa.moapay.domain.Card.entity.CardBenefitCategory;
import com.moa.moapay.domain.Card.entity.CardProduct;
import com.moa.moapay.domain.Card.model.dto.CardBenefitDto;
import com.moa.moapay.domain.Card.model.dto.CardInfoResponseDto;
import com.moa.moapay.domain.Card.repository.CardBenefigCategoryRepository;
import com.moa.moapay.domain.Card.repository.CardProductRepository;
import com.moa.moapay.global.exception.BusinessException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class RecommendCardServiceImpl implements RecommendCardService {

    private final CardProductRepository productRepository;
    private final CardBenefigCategoryRepository benefigCategoryRepository;

    /**
     * 카드 상품 추천 로직
     *
     * @param request
     * @return
     */
    @Override
    public List<CardInfoResponseDto> recommendCard(HttpServletRequest request) {

        // TODO: 1. 소비 패턴 분석 자료 가져오기

        // 필요 데이터 조회
        List<CardBenefitCategory> allCategory = benefigCategoryRepository.findAll();
        List<CardProduct> allProducts = productRepository.findAllWithBenefits();

        log.info("allProducs size {}", allProducts.size());

        // 점수 계산 (여기에 소비패턴 분석정보 같이 넘겨주기)
        List<CardProduct> recomendCards = calculateScore(allProducts);

        // 4. 제일 점수가 높은 카드 반환
        List<CardInfoResponseDto> recomendCardDtos = recomendCards.stream()
                // 점수 계산된 카드를 반복문 돌면서
                .map(cardProduct -> {
                    // 혜택 정보를 가지고
                    List<CardBenefit> benefits = cardProduct.getBenefits();
                    List<CardBenefitDto> benefitDtos = benefits.stream()
                            .map(benefit -> {
                                // 카테고리 id가지고 카테고리 이름으로 바꾸기 (이것도 join으로 하면 될거 같긴 한데..)
                                String categoryName = allCategory.stream()
                                        .filter(category -> Objects.equals(category.getId(), benefit.getCardBenefitCategory().getId())) // categoryId 비교
                                        .map(CardBenefitCategory::getName)
                                        .findFirst()
                                        .orElse("Unknown Category");
                                // 그냥 엔티티를 반환 할 수 도 있지만 나중에 유지보수를 위해 DTO 생성후 리턴
                                return CardBenefitDto.builder()
                                        .categoryName(categoryName)
                                        .categoryType(String.valueOf(benefit.getCategoryType()))
                                        .benefitDesc(benefit.getBenefitDesc())
                                        .benefitValue(benefit.getBenefitValue())
                                        .benefitType(benefit.getBenefitType())
                                        .benefitPoint(benefit.getBenefitPoint())
                                        .build();
                            }).collect(Collectors.toList());

                    // 최종 DTO 생성 후 리턴
                    return CardInfoResponseDto.builder()
                            .cardName(cardProduct.getName())
                            .companyName(cardProduct.getCompanyName())
                            .cardType(cardProduct.getType())
                            .annualFee(cardProduct.getAnnualFee())
                            .annualFeeForeign(cardProduct.getAnnualFeeForeign())
                            .benefitTotalLimit(cardProduct.getBenefitTotalLimit())
                            .performance(cardProduct.getPerformance())
                            .imageUrl(cardProduct.getImageUrl())
                            .benefits(benefitDtos)
                            .build();
                }).collect(Collectors.toList());

        return recomendCardDtos;
    }

    /**
     * 소비패턴에 따른 사용자 카드 상품 추천부
     * 하지만 소비패턴 가중치가 지금 없어서 더미데이터 필요해요~~
     *
     * @param allProducts
     * @return
     */
    private List<CardProduct> calculateScore(List<CardProduct> allProducts) {
        Map<CardProduct, Float> cardScoreMap = new HashMap<>();

        // 각 카드의 점수를 계산
        for (CardProduct cardProduct : allProducts) {
            float score = 0;

            // 각 카드의 혜택별 점수 계산
            for (CardBenefit cardBenefit : cardProduct.getBenefits()) {
                int benefitPoint = cardBenefit.getBenefitPoint();
                // TODO : 가중치 계산
                score += benefitPoint;
            }

            // 전월 실적, 연회비 계산
            float performanceScore = performance(cardProduct);
            score += performanceScore;

            // 최종 점수를 맵에 저장
            cardScoreMap.put(cardProduct, score);
        }

        // 점수를 기준으로 카드 상품 정렬 (내림차순)
        List<Map.Entry<CardProduct, Float>> sortedCardScores = cardScoreMap.entrySet().stream()
                .sorted(Map.Entry.<CardProduct, Float>comparingByValue().reversed())
                .collect(Collectors.toList());

        // 최종 추천할 카드 리스트
        List<Optional<CardProduct>> cardProducts = new ArrayList<>();

        // 추천할 카드 상품 최대 10개 조회 (sortedCardScores 리스트에서 0부터 10번째 요소까지 슬라이싱)
        List<CardProduct> topCardProducts = sortedCardScores.stream()
                .map(Map.Entry::getKey)
                .collect(Collectors.toList())
                .subList(0, Math.min(9, sortedCardScores.size()));

        return topCardProducts;
    }

    /**
     * 전월실적, 연회비 점수
     *
     * @param cardProduct
     * @return
     */
    private float performance(CardProduct cardProduct) {

        Long performance = cardProduct.getPerformance();
        Long annualFee = cardProduct.getAnnualFee();

        int score = 0;

        if (performance <= 300000) {
            score -= 0;
        } else if (performance <= 500000) {
            score -= 1;
        } else if (performance <= 800000) {
            score -= 2;
        } else {
            score -= 3;
        }

        if (annualFee <= 50000) {
            score -= 0;
        } else if (annualFee <= 80000) {
            score -= 1;
        } else if (annualFee <= 150000) {
            score -= 2;
        } else {
            score -= 3;
        }

        return score;
    }

}
