package com.moa.payment.domain.analysis.service;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.Period;
import java.util.HashSet;
import java.util.List;
import java.util.UUID;

import com.moa.payment.domain.analysis.entity.Analysis;
import com.moa.payment.domain.analysis.entity.Gender;
import com.moa.payment.domain.analysis.entity.dto.getMemberResponseDto;
import com.moa.payment.domain.analysis.repository.AnalysisRepository;
import com.moa.payment.domain.charge.entity.PaymentLog;
import com.moa.payment.domain.charge.repository.PaymentLogRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AnalysisServiceImpl implements AnalysisService {

	private final PaymentLogRepository paymentLogRepository;
	private final AnalysisRepository analysisRepository;
	private final RestClient restClient;
	private final RestTemplate restTemplate;

	//[0][X]은 남자, [1][X]은 여자
	//[X][0]은 0대, [X][1]은 10대, [X][2]은 20대, ..., [X][12]은 120대
	//[X][X][0]은 amount, [X][X][1]은 memberCount
	private Long[][][] save = new Long[2][13][2];
	private HashSet<String> memberNum;

	public static int calculateAge(LocalDate birthDate) {
		// 현재 날짜 가져오기
		LocalDate currentDate = LocalDate.now();

		// Period 클래스를 사용해 두 날짜의 차이 계산
		if ((birthDate != null) && (currentDate != null)) {
			return Period.between(birthDate, currentDate).getYears();
		} else {
			return 0; // 생년월일이 null일 경우 0을 반환
		}
	}

	//-----scheduling
	@Override
	public void getLastMonthPaymentLog() {
		// save 배열 초기화 (null 값을 0L로 초기화)
		for (int i = 0; i < 2; i++) {
			for (int j = 0; j < 13; j++) {
				for (int k = 0; k < 2; k++) {
					save[i][j][k] = 0L;  // 초기값 0L로 설정
				}
			}
		}

		memberNum = new HashSet<>();

		//저번달 결제 내역 가져오기
		List<PaymentLog> paymentLogList = paymentLogRepository.findAllFromLastMonth();
		for (PaymentLog paylog : paymentLogList) {
			Long amount = paylog.getAmount(); // 결제한 금액
			UUID cardId = paylog.getCardId(); //사용한 카드 아이디
			//CardId로 myCard불러오고 여기서 memberId 뽑아내고
			UUID memberId = getMemberId(cardId);
			System.out.println("멤버ID:" + memberId);
			//memberId로 member 뽑아내서 나이, 성별, 핸드폰 번호 추출
			getMemberResponseDto member = getMemberInfo(memberId);

			int age = calculateAge(member.getBirthDate());
			int ageRange = age / 10; //연령대
			if (member.getGender().equals("M")) { //남자면 [0]
				save[0][ageRange][0] += amount;
				if (memberNum.add(member.getPhoneNumber())) { //새로 추가
					save[0][ageRange][1] += 1;
				}
			} else { //여자면 [1]
				save[1][ageRange][0] += amount;
				if (memberNum.add(member.getPhoneNumber())) { //새로 추가
					save[1][ageRange][1] += 1;
				}
			}

		}

		// 현재 날짜 가져오기
		LocalDate currentDate = LocalDate.now();

		// 전달 날짜 계산
		LocalDate previousMonthDate = currentDate.minusMonths(1);

		// 전달의 month와 year 출력
		int previousMonth = previousMonthDate.getMonthValue(); // 월
		int previousYear = previousMonthDate.getYear(); // 년

		for (int i = 0; i < 2; i++) {
			Gender gender;
			if(i==0) gender=Gender.MALE;
			else gender=Gender.FEMALE;
			for (int j = 0; j < 13; j++) {
				Analysis analysis=Analysis.builder()
					.month(previousMonth)
					.year(previousYear)
					.gender(gender)
					.generation(j*10+"")
					.totalAmount(save[i][j][0])
					.userCount(save[i][j][1])
					.build();

				analysisRepository.save(analysis);

				System.out.println("성별:" + i + "/연령대:" + j + "/amount:" + save[i][j][0] + "/count" + save[i][j][1]);
			}
		}

	}

	//paymentlog의 cardId에서 member가져오기
	public UUID getMemberId(UUID cardId) {
		String url = "http://localhost:18020/moapay/core/card/getMemberId";

		// POST 요청으로 cardId를 보내고, UUID로 응답을 받음
		ResponseEntity<UUID> response = restTemplate.postForEntity(url, cardId, UUID.class);

		return response.getBody();  // 응답에서 UUID를 반환
	}

	public getMemberResponseDto getMemberInfo(UUID memberId) {
		try {
			String url = "http://localhost:18040/moapay/member/getMember";

			// POST 요청으로 memberId를 보내고, getMemberResponseDto로 응답 받음
			ResponseEntity<getMemberResponseDto> response = restTemplate.postForEntity(url, memberId,
				getMemberResponseDto.class);

			if (response.getBody() == null) {
				throw new RuntimeException("Received null response body for member ID: " + memberId);
			}

			return response.getBody();
		} catch (Exception e) {
			// 예외 처리
			throw new RuntimeException("Failed to get member info", e);
		}
	}

	//-------

	//특정 성별+나이대 소비 평균 계산하기

}
