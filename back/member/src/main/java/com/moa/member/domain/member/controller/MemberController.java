package com.moa.member.domain.member.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.moa.member.domain.member.model.dto.JoinRequestDto;
import com.moa.member.domain.member.model.dto.JoinResponseDto;
import com.moa.member.domain.member.service.MemberService;
import com.moa.member.global.response.ResultResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/payment/member")
public class MemberController {

	private final MemberService memberService;

	@PostMapping("/join")
	public ResponseEntity<ResultResponse> join(@RequestBody JoinRequestDto dto) throws Exception {
		JoinResponseDto member=memberService.join(dto);
		ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "회원가입을 완료했습니다.", member);
		return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
	}
}
