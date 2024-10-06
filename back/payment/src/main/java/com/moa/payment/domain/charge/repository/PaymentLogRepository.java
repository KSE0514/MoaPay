package com.moa.payment.domain.charge.repository;

import com.moa.payment.domain.charge.entity.PaymentLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PaymentLogRepository extends JpaRepository<PaymentLog, Long> {
    <S extends PaymentLog> S save(S paymentLog);
    Optional<PaymentLog> findByUuid(UUID uuid);

    @Query("SELECT p FROM PaymentLog p " +
        "WHERE YEAR(p.createTime) = YEAR(CURRENT_DATE) " +
        "AND MONTH(p.createTime) = MONTH(CURRENT_DATE) - 1")
    List<PaymentLog> findAllFromLastMonth();
}
