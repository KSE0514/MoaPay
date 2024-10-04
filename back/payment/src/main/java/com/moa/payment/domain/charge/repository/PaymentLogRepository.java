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
        "WHERE FUNCTION('YEAR', p.createTime) = FUNCTION('YEAR', CURRENT_DATE) - (CASE WHEN FUNCTION('MONTH', CURRENT_DATE) = 1 THEN 1 ELSE 0 END) " +
        "AND FUNCTION('MONTH', p.createTime) = (CASE WHEN FUNCTION('MONTH', CURRENT_DATE) = 1 THEN 12 ELSE FUNCTION('MONTH', CURRENT_DATE) - 1 END)")
    List<PaymentLog> findAllFromLastMonth();
}
