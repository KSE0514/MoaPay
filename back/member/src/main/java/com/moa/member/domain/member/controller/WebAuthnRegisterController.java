package com.moa.member.domain.member.controller;

import java.security.SecureRandom;
import java.util.Arrays;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.moa.member.domain.member.model.Member;
import com.moa.member.domain.member.repository.MemberRepository;

import com.moa.member.global.response.ResultResponse;
import com.yubico.webauthn.CredentialRepository;
import com.yubico.webauthn.data.AuthenticatorResponse;
import com.yubico.webauthn.data.PublicKeyCredential;
import com.yubico.webauthn.data.PublicKeyCredentialType; // PublicKeyCredentialType 임포트
import com.yubico.webauthn.FinishRegistrationOptions;
import com.yubico.webauthn.RelyingParty;
import com.yubico.webauthn.data.AttestationConveyancePreference;
import com.yubico.webauthn.data.AuthenticatorSelectionCriteria;
import com.yubico.webauthn.data.ByteArray;
import com.yubico.webauthn.data.COSEAlgorithmIdentifier;
import com.yubico.webauthn.data.PublicKeyCredentialCreationOptions;
import com.yubico.webauthn.data.PublicKeyCredentialEntity;
import com.yubico.webauthn.data.PublicKeyCredentialParameters;
import com.yubico.webauthn.data.PublicKeyCredentialType;
import com.yubico.webauthn.data.RelyingPartyIdentity;
import com.yubico.webauthn.data.UserIdentity;
import com.yubico.webauthn.data.UserVerificationRequirement;


import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/payment/member/authn/register")
public class WebAuthnRegisterController{

	private final RelyingParty relyingParty;
	private final MemberRepository memberRepository;
	private final CredentialRepository credentialRepository;

	public WebAuthnRegisterController(MemberRepository memberRepository, CredentialRepository credentialRepository) {
		// RelyingParty 설정
		this.relyingParty = RelyingParty.builder()
			.identity(RelyingPartyIdentity.builder()
				.id("moapay.com") // 서버 도메인
				.name("moapay")   // 서버 이름
				.build())
			.credentialRepository(new InMemoryCredentialRepository()) // CredentialRepository 주입
			.build();
		this.memberRepository = memberRepository;
		this.credentialRepository = credentialRepository; // 주입받은 Repository 저장
	}

	@GetMapping("/options/{name}")
	public PublicKeyCredentialCreationOptions getRegistrationOptions(@PathVariable String name, HttpServletRequest request) { //HttpServletRequest request
		//Member member = memberRepository.findByUuid(uuid); //나중에 token받아서 id 찾을거임
		Member member = memberRepository.findByName(name);

		// UserIdentity 생성
		UserIdentity userEntity = UserIdentity.builder()
			.name(member.getName())
			.displayName("moapay")
			.id(new ByteArray(member.getUuid().toString().getBytes()))
			.build();

		// 직접 랜덤 챌린지 생성
		byte[] challengeBytes = new byte[32]; // 32 바이트 길이의 랜덤 챌린지
		new SecureRandom().nextBytes(challengeBytes);
		ByteArray challenge = new ByteArray(challengeBytes); // ByteArray로 변환

		PublicKeyCredentialCreationOptions options= PublicKeyCredentialCreationOptions.builder()
			.rp(RelyingPartyIdentity.builder() // RelyingPartyIdentity를 직접 생성
				.id("moapay.com") // 서버 도메인
				.name("moapay")   // 서버 이름
				.build())
			.user(userEntity)
			.challenge(challenge)
			.pubKeyCredParams(Arrays.asList(
				PublicKeyCredentialParameters.builder()
					.alg(COSEAlgorithmIdentifier.ES256) // -7
					.type(PublicKeyCredentialType.PUBLIC_KEY)
					.build(),
				PublicKeyCredentialParameters.builder()
					.alg(COSEAlgorithmIdentifier.RS256) // -257
					.type(PublicKeyCredentialType.PUBLIC_KEY)
					.build()
			))
			.authenticatorSelection(AuthenticatorSelectionCriteria.builder()
				.userVerification(UserVerificationRequirement.PREFERRED)
				.build())
			.attestation(AttestationConveyancePreference.NONE)
			.build();

		// 클라이언트에게 옵션 전송 (세션에 저장 가능)
		request.getSession().setAttribute("registrationOptions", options);

		return options;
	}

	@PostMapping("/verify")
	public ResponseEntity<ResultResponse> verifyRegistration(@RequestBody Map<String, Object> responseData, HttpServletRequest request) {
		try {
			Member member = memberRepository.findByName("고망고");

			// 세션에서 registrationOptions 가져오기
			PublicKeyCredentialCreationOptions options = (PublicKeyCredentialCreationOptions) request.getSession().getAttribute("registrationOptions");

			// 클라이언트에서 반환한 데이터에서 필요한 정보 추출
			String credentialId = (String) responseData.get("id");
			Map<String, Object> response = (Map<String, Object>) responseData.get("response");

			// PublicKeyCredential 생성 (RegistrationResponse 없이)
			PublicKeyCredential credential = PublicKeyCredential.builder()
				.id(new ByteArray(credentialId.getBytes())) // Credential ID
				.response((AuthenticatorResponse)response) // 응답 데이터 (Map 형태)
				.clientExtensionResults(null) //클라이언트 확장 결과
				.type(PublicKeyCredentialType.PUBLIC_KEY) //자격증명타입
				.build();

			// finishRegistration 호출
			var registrationResult = relyingParty.finishRegistration(
				FinishRegistrationOptions.builder()
					.request(options)
					.response(credential)
					.build()
			);

			// Member 정보 업데이트
			Member updatedMember = Member.builder()
				.id(member.getId())
				.name(member.getName())
				.birthDate(member.getBirthDate())
				.gender(member.getGender())
				.phoneNumber(member.getPhoneNumber())
				.email(member.getEmail())
				.address(member.getAddress())
				.uuid(member.getUuid()) // 기존 UUID 유지
				.createTime(member.getCreateTime())
				.updateTime(member.getUpdateTime())
				.publicKey(registrationResult.getKeyId().getId().toString())
				.credentialId(credentialId)
				.authenticatorData((byte[]) response.get("attestationObject")) // 필요한 경우 변환
				.build();

			// Member 저장
			memberRepository.save(member);

			ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "검증 성공 : 일치");
			return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
		} catch (Exception e) {
			ResultResponse resultResponse = ResultResponse.of(HttpStatus.BAD_REQUEST, "검증 실패 : 불일치");
			return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
		}
	}
}

