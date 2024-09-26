package com.moa.member.domain.member.service;

import java.io.IOException;

import com.moa.member.domain.member.model.dto.JoinRequestDto;
import com.moa.member.domain.member.model.dto.JoinResponseDto;
import com.moa.member.domain.member.model.dto.LoginRequestDto;
import com.moa.member.domain.member.security.TokenDto;

public interface MemberService {
	JoinResponseDto join(JoinRequestDto joinRequestDto) throws IOException;
	TokenDto login(LoginRequestDto dto) throws Exception;
}
