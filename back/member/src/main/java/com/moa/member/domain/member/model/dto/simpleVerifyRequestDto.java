package com.moa.member.domain.member.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class simpleVerifyRequestDto {
	private String uuid;
	private String simplePassword;
}
