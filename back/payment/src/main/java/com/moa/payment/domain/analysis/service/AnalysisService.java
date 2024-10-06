package com.moa.payment.domain.analysis.service;

import java.util.UUID;

public interface AnalysisService {
	void getLastMonthPaymentLog();
	Long average(UUID memberId);
}
