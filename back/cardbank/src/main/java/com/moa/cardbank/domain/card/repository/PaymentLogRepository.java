package com.moa.cardbank.domain.card.repository;

import com.moa.cardbank.domain.card.entity.PaymentLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentLogRepository extends JpaRepository<PaymentLog, Long> {
    <S extends PaymentLog> S save(S paymentLog);
}
