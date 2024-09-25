package com.moa.payment.domain.online.repository;

import com.moa.payment.domain.online.entity.PaymentLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentLogRepository extends JpaRepository<PaymentLog, Long> {
    <S extends PaymentLog> S save(S paymentLog);
}
