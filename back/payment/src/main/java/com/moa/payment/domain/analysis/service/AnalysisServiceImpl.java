package com.moa.payment.domain.analysis.service;

import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.UUID;

import com.moa.payment.domain.charge.entity.PaymentLog;
import com.moa.payment.domain.charge.repository.PaymentLogRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AnalysisServiceImpl implements AnalysisService {

	private final PaymentLogRepository paymentLogRepository;
	private final RestClient restClient;


	//[0][X]은 남자, [1][X]은 여자
	//[X][0]은 0대, [X][1]은 10대, [X][2]은 20대, ..., [X][12]은 120대
	private Long[][] save = new Long[2][13];

	//-----scheduling
	//paymentlog 에서 이번달 결제 내역 가져오기
	public void getLastMonthPaymentLog() {
		List<PaymentLog> paymentLogList = paymentLogRepository.findAllFromLastMonth();
		for (PaymentLog paylog : paymentLogList) {
			Long amount = paylog.getAmount(); // 결제한 금액
			UUID cardId = paylog.getCardId(); //사용한 카드 아이디
			//CardId로 myCard불러오고 여기서 memberId 뽑아내고
			UUID memberId=getMemberId(cardId);
			//memberId로 member 뽑아내서 나이, 성별, 핸드폰 번호 추출

		}
	}

	//paymentlog의 cardId에서 member가져오기
	public UUID getMemberId(UUID cardId){
		return restClient.post()
			.uri("http://localhost:18020/moapay/core/card/getMemberId") //gateway를 통하는 것이 맞지만...시큐리티 이슈로..
			.body(cardId)
			.retrieve()
			.body(UUID.class);
	}

	//member에서 성별, 연령대 추출하고 amount, count 업데이트

	//-------

	//특정 성별+나이대 소비 평균 계산하기

}
