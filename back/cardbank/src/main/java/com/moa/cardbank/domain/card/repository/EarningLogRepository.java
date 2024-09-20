package com.moa.cardbank.domain.card.repository;

import com.moa.cardbank.domain.card.entity.EarningLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EarningLogRepository extends JpaRepository<EarningLog, Long> {
    <S extends EarningLog> S save(S earningLog);
}
