package com.moa.moapay.domain.card.repository;

import com.moa.moapay.domain.card.entity.CardBenefit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CardBenefitRepository extends JpaRepository<CardBenefit, Long> {
    List<CardBenefit> findByCardProduct_Id(Long id);
}
