package com.moa.moapay.domain.card.repository;

import com.moa.moapay.domain.card.entity.MyCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MyCardRepository extends JpaRepository<MyCard, Long> {
    Optional<MyCard> findByCardNumber(String cardNumber);
}
