package com.moa.member.domain.member.service;

import com.moa.member.domain.member.model.dto.JoinRequestDto;
import com.moa.member.domain.member.model.dto.JoinResponseDto;
import com.moa.member.global.exception.MemberAlreadyExistsException;

public interface MemberService {
	JoinResponseDto join(JoinRequestDto joinRequestDto) throws MemberAlreadyExistsException;
}
