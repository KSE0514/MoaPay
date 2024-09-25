package com.moa.moapay.domain.Card.repository;

import com.moa.moapay.domain.Card.entity.MyCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MyCardRepository extends JpaRepository<MyCard, Long> {
}
