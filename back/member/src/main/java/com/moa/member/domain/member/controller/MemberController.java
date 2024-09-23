package com.moa.member.domain.member.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.nurigo.sdk.message.response.SingleMessageSentResponse;

import com.moa.member.domain.member.model.dto.JoinRequestDto;
import com.moa.member.domain.member.model.dto.JoinResponseDto;
import com.moa.member.domain.member.model.dto.MessageRequestDto;
import com.moa.member.domain.member.model.dto.VerificationRequestDto;
import com.moa.member.domain.member.service.MemberService;
import com.moa.member.domain.member.service.MessageService;
import com.moa.member.global.response.ResultResponse;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/payment/member")
public class MemberController {

	private final MemberService memberService;
	private final MessageService messageService;

	@PostMapping("/join")
	public ResponseEntity<ResultResponse> join(@RequestBody JoinRequestDto dto) throws Exception {
		JoinResponseDto member=memberService.join(dto);
		ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "회원가입을 완료했습니다.", member);
		return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
	}

	@PostMapping("/sendSMS")
	public ResponseEntity<ResultResponse> sendSMS(@RequestBody MessageRequestDto dto){
		// 성공코드 2000
		String statusCode= messageService.sendSMS(dto.getPhoneNumber()).getStatusCode();
		ResultResponse resultResponse = ResultResponse.of(HttpStatus.BAD_REQUEST, "인증번호 전송에 실패했습니다.");
		if(statusCode.equals("2000")){
			resultResponse = ResultResponse.of(HttpStatus.OK, "인증번호를 전송했습니다.");
		}
		return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);

	}

	@PostMapping("/verification")
	public ResponseEntity<ResultResponse> verification(@RequestBody VerificationRequestDto dto){
		boolean pass = messageService.verifySMS(dto.getPhoneNumber(),dto.getCode());
		ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "인증번호가 일치합니다.");
		return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);

	}

}
