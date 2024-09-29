package com.moa.member.domain.member.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class isMemberResponseDto {
	private String uuid;
	private String phoneNumber;
}
