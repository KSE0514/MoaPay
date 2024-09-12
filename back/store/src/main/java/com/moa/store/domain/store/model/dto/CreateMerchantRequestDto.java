package com.moa.store.domain.store.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateMerchantRequestDto {
	private String merchantName;
	private String categoryId;
	private String adminId;
	private String adminPassword;
	private String merchantUrl;
}
