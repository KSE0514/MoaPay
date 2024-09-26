package com.moa.moapay.domain.card.repository;

import com.moa.moapay.domain.card.entity.MyCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MyCardRepository extends JpaRepository<MyCard, Long> {
}
