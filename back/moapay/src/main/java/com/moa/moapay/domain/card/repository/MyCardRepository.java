package com.moa.moapay.domain.card.repository;

import com.moa.moapay.domain.card.entity.MyCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface MyCardRepository extends JpaRepository<MyCard, Long> {
    Optional<MyCard> findByCardNumber(String cardNumber);
    Optional<MyCard> findByUuid(UUID id);
    <S extends MyCard> S save(S myCard);

    List<MyCard> findAllByMemberId(UUID uuid);

}
