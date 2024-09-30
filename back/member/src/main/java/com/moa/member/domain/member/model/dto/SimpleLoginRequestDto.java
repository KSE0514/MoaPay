package com.moa.member.domain.member.model.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class SimpleLoginRequestDto {
	private String uuid;
	private String simplePassword;
}
