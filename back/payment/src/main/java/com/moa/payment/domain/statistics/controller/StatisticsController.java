package com.moa.payment.domain.statistics.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.moa.payment.domain.analysis.entity.dto.GetMonthlyRequestDto;
import com.moa.payment.domain.analysis.entity.dto.GetYearlyStatisticsDto;
import com.moa.payment.global.response.ResultResponse;

@RestController
@RequestMapping("/statistics")
public class StatisticsController {

	@PostMapping("/consumption/{year}/{month}")
	public ResponseEntity<ResultResponse> getMonthlyConsumption(@PathVariable Integer year,
		@PathVariable Integer month, @RequestBody GetMonthlyRequestDto getMonthlyRequestDto){

		ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "월별 결제 내역 조회에 실패했습니다.");
		return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
	}

	@PostMapping("/benefit/{year}/{month}")
	public ResponseEntity<ResultResponse> getMonthlyBenefit(@PathVariable Integer year,
		@PathVariable Integer month, @RequestBody GetMonthlyRequestDto getMonthlyRequestDto){

		ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "월별 혜택 내역 조회에 실패했습니다.");
		return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
	}

	@PostMapping("/consumption/statistics")
	public ResponseEntity<ResultResponse> getYearlyConsumptionStatistics(@RequestBody GetYearlyStatisticsDto getYearlyStatisticsDto){

		ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "최근 1년 소비 조회에 실패했습니다.");
		return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
	}

	@PostMapping("/benefit/statistics")
	public ResponseEntity<ResultResponse> getYearlyBenefitStatistics(@RequestBody GetYearlyStatisticsDto getYearlyStatisticsDto){

		ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "최근 1년 혜택 조회에 실패했습니다.");
		return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
	}
}
