package com.moa.member.domain.member.model.dto;

import com.moa.member.domain.member.model.Member;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SetPwdRequestDto {

	private String simplePassword;
	private byte[] bioInfo;

	public Member toEntity(){
		return Member.builder()
			.simplePassword(simplePassword)
			.bioInfo(bioInfo)
			.build();
	}


}
