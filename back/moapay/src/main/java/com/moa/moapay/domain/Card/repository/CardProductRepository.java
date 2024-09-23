package com.moa.moapay.domain.Card.repository;

import com.moa.moapay.domain.Card.entity.CardProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CardProductRepository extends JpaRepository<CardProduct, Long> {

    Optional<CardProduct> findOneById(long num);
}
