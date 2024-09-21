package com.moa.member.domain.member.repository;

public interface MessageRepository {
	void createSmsCertification(String toNumber, String code);
	String getSmsCertification(String toNumber);
	void deleteSmsCertification(String toNumber);
	boolean hasKey(String toNumber);
}
