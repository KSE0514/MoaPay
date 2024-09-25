package com.moa.moapay.domain.Card.repository;

import com.moa.moapay.domain.Card.entity.*;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
@Slf4j
public class MyCardQueryRepository {
    private final JPAQueryFactory queryFactory;

    public MyCardQueryRepository(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    /*
    @Query("SELECT mc FROM MyCard mc " +
       "JOIN FETCH mc.cardProduct cp " +
       "JOIN FETCH cp.benefits bf " +
       "JOIN FETCH bf.cardBenefitCategory bc")
    List<MyCard> findAllByMemberId(UUID memberId);
     */
    public List<MyCard> findAllByMemberIdWithBenefits(UUID memberId) {
        QMyCard myCard = QMyCard.myCard;
        QCardProduct cardProduct = QCardProduct.cardProduct;
        QCardBenefit cardBenefit = QCardBenefit.cardBenefit;
        QCardBenefitCategory benefitCategory = QCardBenefitCategory.cardBenefitCategory;

        return queryFactory
                .selectFrom(myCard)
                .join(myCard.cardProduct, cardProduct).fetchJoin()
                .join(cardProduct.benefits, cardBenefit).fetchJoin()
                .join(cardBenefit.cardBenefitCategory, benefitCategory).fetchJoin()
                .where(myCard.memberId.eq(memberId))
                .fetch();
    }

    public List<CardProduct> findAll() {
        QCardProduct cardProduct = QCardProduct.cardProduct;
        QCardBenefit cardBenefit = QCardBenefit.cardBenefit;
        QCardBenefitCategory benefitCategory = QCardBenefitCategory.cardBenefitCategory;

        return queryFactory
                .selectFrom(cardProduct)
                .join(cardProduct.benefits, cardBenefit).fetchJoin()
                .join(cardBenefit.cardBenefitCategory, benefitCategory).fetchJoin()
                .fetch();
    }
}
