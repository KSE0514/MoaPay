package com.moa.moapay.domain.Card.repository;

import com.moa.moapay.domain.Card.entity.MyCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface MyCardRepository extends JpaRepository<MyCard, Long> {
    List<MyCard> findAllByMemberId(UUID memberId);
}
