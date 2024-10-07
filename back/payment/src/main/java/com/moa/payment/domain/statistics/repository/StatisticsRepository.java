package com.moa.payment.domain.statistics.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.moa.payment.domain.statistics.entity.Statistics;

public interface StatisticsRepository extends JpaRepository<Statistics, Long> {

}

