package com.moa.member.domain.member.service;

import java.io.IOException;

import com.moa.member.domain.member.model.dto.JoinRequestDto;
import com.moa.member.domain.member.model.dto.JoinResponseDto;

public interface MemberService {
	JoinResponseDto join(JoinRequestDto joinRequestDto) throws IOException;
}
