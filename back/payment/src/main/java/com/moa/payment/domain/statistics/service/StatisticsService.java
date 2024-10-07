package com.moa.payment.domain.statistics.service;

import com.moa.payment.domain.statistics.model.dto.*;

public interface StatisticsService {
    MonthlyConsumptionResponseDto getMonthlyConsumption(int year, int month, StatisticsRequestDto statisticsRequestDto);
    MonthlyBenefitResponseDto getMonthlyBenefit(int year, int month, StatisticsRequestDto statisticsRequestDto);
    MonthlyResponseDto getMonthlyRecords(int year, int month, StatisticsRequestDto statisticsRequestDto);
    YearlyConsumptionResponseDto getYearlyConsumption(int year, int month, StatisticsRequestDto statisticsRequestDto);
    YearlyBenefitResponseDto getYearlyBenefit(int year, int month, StatisticsRequestDto statisticsRequestDto);
    YearlyResponseDto getYearlyRecords(int year, int month, StatisticsRequestDto statisticsRequestDto);

}
