package com.moa.member.domain.member.service;

import java.io.IOException;
import java.util.Optional;

import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.moa.member.domain.member.model.dto.JoinResponseDto;
import com.moa.member.global.exception.BusinessException;
import com.moa.member.domain.member.model.Member;
import com.moa.member.domain.member.model.dto.JoinRequestDto;
import com.moa.member.domain.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class MemberServiceImpl implements MemberService{

	private final MemberRepository memberRepository;

	@Override
	@Transactional
	public JoinResponseDto join(JoinRequestDto joinRequestDto){

		Member member=joinRequestDto.toEntity();
		//핸드폰 번호는 겹칠 수 없다. 고유한 값.
		Optional<Member> memberOptional=memberRepository.findByPhoneNumber(member.getPhoneNumber());

		if(memberOptional.isPresent()){
			throw new BusinessException(HttpStatus.BAD_REQUEST, "이미 존재하는 회원입니다.");
		}

		memberRepository.save(member);

		return JoinResponseDto.builder()
			.id(member.getUuid())
			.name(member.getName())
			.gender(member.getGender())
			.birthDate(member.getBirthDate())
			.phoneNumber(member.getPhoneNumber())
			.email(member.getEmail())
			.address(member.getAddress())
			.createTime(member.getCreateTime())
			.updateTime(member.getUpdateTime())
			.build();

	}







}
