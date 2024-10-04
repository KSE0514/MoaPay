package com.moa.payment.domain.analysis.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.moa.payment.domain.analysis.entity.dto.averageRequestDto;
import com.moa.payment.global.response.ResultResponse;

@RestController
@RequestMapping("/analysis")
public class AnalysisController {

	// //성별+나이대 소비 평균 가져오기
	// @PostMapping("/average")
	// ResponseEntity<ResultResponse> average(@RequestBody averageRequestDto dto){
	// 	//uuid 통해 member 찾고 member의 성별, 나이대 구한 후 소비평균 가져오기
	//
	// }


}
