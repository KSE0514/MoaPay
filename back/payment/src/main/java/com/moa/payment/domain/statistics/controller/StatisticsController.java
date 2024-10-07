package com.moa.payment.domain.statistics.controller;

import com.moa.payment.domain.statistics.model.dto.StatisticsRequestDto;
import com.moa.payment.global.response.ResultResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/statistics")
public class StatisticsController {

    @PostMapping("/consumption/{year}/{month}")
    public ResponseEntity<ResultResponse> getMonthlyConsumption(@PathVariable int year,
                                                                @PathVariable int month, @RequestBody StatisticsRequestDto statisticsRequestDto) {

        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "월별 결제 내역 조회에 실패했습니다.");
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @PostMapping("/benefit/{year}/{month}")
    public ResponseEntity<ResultResponse> getMonthlyBenefit(@PathVariable int year,
                                                            @PathVariable int month, @RequestBody StatisticsRequestDto statisticsRequestDto) {

        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "월별 혜택 내역 조회에 실패했습니다.");
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @PostMapping("/total/{year}/{month}")
    public ResponseEntity<ResultResponse> getMonthlyRecords(@PathVariable int year, @PathVariable int month, @RequestBody StatisticsRequestDto statisticsRequestDto) {

        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "월별 내역 조회에 실패했습니다.");
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @PostMapping("/consumption/statistics")
    public ResponseEntity<ResultResponse> getYearlyConsumption(@RequestBody StatisticsRequestDto statisticsRequestDto) {

        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "최근 1년 소비 조회에 실패했습니다.");
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @PostMapping("/benefit/statistics")
    public ResponseEntity<ResultResponse> getYearlyBenefit(@RequestBody StatisticsRequestDto getYearlyStatisticsDto) {

        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "최근 1년 혜택 조회에 실패했습니다.");
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

	@PostMapping("/total/statistics")
	public ResponseEntity<ResultResponse> getYearlyRecords(@RequestBody StatisticsRequestDto getYearlyStatisticsDto) {

		ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "최근 1년 혜택 조회에 실패했습니다.");
		return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
	}

}
