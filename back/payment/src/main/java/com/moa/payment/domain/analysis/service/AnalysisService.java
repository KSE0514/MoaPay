package com.moa.payment.domain.analysis.service;

import java.util.UUID;

public interface AnalysisService {
	void setAverage();
	Long average(UUID memberId);
}
