package com.moa.cardbank.domain.card.repository;

import com.moa.cardbank.domain.card.entity.MyCard;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface MyCardRepository extends JpaRepository<MyCard, Long> {
    Optional<MyCard> findByUuid(UUID uuid);
    <S extends MyCard> S save(S myCard);
}
