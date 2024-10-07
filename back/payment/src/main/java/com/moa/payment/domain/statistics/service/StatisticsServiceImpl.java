package com.moa.payment.domain.statistics.service;

import com.moa.payment.domain.analysis.service.AnalysisService;
import com.moa.payment.domain.statistics.model.dto.*;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StatisticsServiceImpl implements StatisticsService {

    private final AnalysisService analysisService;
    private final MoaPayClient moaPayClient;
    private final StatisticsService statisticsService;


    @Override
    public MonthlyConsumptionResponseDto getMonthlyConsumption(int year, int month, StatisticsRequestDto statisticsRequestDto) {
        return null;
    }

    @Override
    public MonthlyBenefitResponseDto getMonthlyBenefit(int year, int month, StatisticsRequestDto statisticsRequestDto) {
        return null;
    }

    @Override
    public MonthlyResponseDto getMonthlyRecords(int year, int month, StatisticsRequestDto statisticsRequestDto) {
        return null;
    }

    @Override
    public YearlyConsumptionResponseDto getYearlyConsumption(int year, int month, StatisticsRequestDto statisticsRequestDto) {
        return null;
    }

    @Override
    public YearlyBenefitResponseDto getYearlyBenefit(int year, int month, StatisticsRequestDto statisticsRequestDto) {
        return null;
    }

    @Override
    public YearlyResponseDto getYearlyRecords(int year, int month, StatisticsRequestDto statisticsRequestDto) {
        return null;
    }
}
