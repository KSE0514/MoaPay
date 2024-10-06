package com.moa.payment.domain.analysis.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.moa.payment.domain.analysis.entity.dto.averageRequestDto;
import com.moa.payment.domain.analysis.service.AnalysisService;
import com.moa.payment.global.response.ResultResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/analysis")
public class AnalysisController {

	private final AnalysisService analysisService;

	//성별+나이대 소비 평균 가져오기
	@GetMapping("/average")
	public ResponseEntity<ResultResponse> average(){
		//uuid 통해 member 찾고 member의 성별, 나이대 구한 후 소비평균 가져오기
		analysisService.getLastMonthPaymentLog();
		ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "성별/연령대 별 소비총합과 멤버 수 저장 완료");
		return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
	}


}
