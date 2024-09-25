package com.moa.member.domain.member.controller;

import java.security.SecureRandom;
import java.util.Arrays;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.moa.member.domain.member.model.Member;
import com.moa.member.domain.member.repository.EmptyCredentialRepository;
import com.moa.member.domain.member.repository.MemberRepository;
import com.moa.member.global.response.ResultResponse;
import com.yubico.webauthn.AssertionRequest;
import com.yubico.webauthn.FinishAssertionOptions;
import com.yubico.webauthn.FinishRegistrationOptions;
import com.yubico.webauthn.RelyingParty;
import com.yubico.webauthn.data.AttestationConveyancePreference;
import com.yubico.webauthn.data.AuthenticatorAttestationResponse;
import com.yubico.webauthn.data.AuthenticatorSelectionCriteria;
import com.yubico.webauthn.data.ByteArray;
import com.yubico.webauthn.data.COSEAlgorithmIdentifier;
import com.yubico.webauthn.data.ClientExtensionOutputs;
import com.yubico.webauthn.data.PublicKeyCredential;
import com.yubico.webauthn.data.PublicKeyCredentialCreationOptions;
import com.yubico.webauthn.data.PublicKeyCredentialDescriptor;
import com.yubico.webauthn.data.PublicKeyCredentialParameters;
import com.yubico.webauthn.data.PublicKeyCredentialRequestOptions;
import com.yubico.webauthn.data.PublicKeyCredentialType;
import com.yubico.webauthn.data.RelyingPartyIdentity;
import com.yubico.webauthn.data.UserIdentity;
import com.yubico.webauthn.data.UserVerificationRequirement;
import com.yubico.webauthn.data.PublicKeyCredentialType;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/payment/member/authn/certify")
public class WebAuthnCertifyController {

	private final RelyingParty relyingParty;
	private final MemberRepository memberRepository;
	public WebAuthnCertifyController(MemberRepository memberRepository, EmptyCredentialRepository credentialRepository) {
		// RelyingParty 설정
		this.relyingParty = RelyingParty.builder()
			.identity(RelyingPartyIdentity.builder()
				.id("moapay.com")  // 서버 도메인
				.name("moapay")    // 서버 이름
				.build())
			.credentialRepository(credentialRepository)  // 빈 CredentialRepository 주입
			.build();
		this.memberRepository = memberRepository;
	}

	@GetMapping("/options/{name}")
	public PublicKeyCredentialCreationOptions getAuthenticationOptions(@PathVariable String name, HttpServletRequest request) {
		// 사용자 정보 조회
		Member member = memberRepository.findByName(name);

		// UserIdentity 생성
		UserIdentity userEntity = UserIdentity.builder()
			.name(member.getName())
			.displayName("moapay")
			.id(new ByteArray(member.getUuid().toString().getBytes()))  // UUID를 기반으로 ByteArray 생성
			.build();

		// 랜덤 챌린지 생성
		byte[] challengeBytes = new byte[32];  // 32 바이트 길이의 챌린지
		new SecureRandom().nextBytes(challengeBytes);
		ByteArray challenge = new ByteArray(challengeBytes);

		// PublicKeyCredentialRequestOptions 생성
		PublicKeyCredentialCreationOptions options = PublicKeyCredentialCreationOptions.builder()
			.rp(RelyingPartyIdentity.builder()
				.id("moapay.com")  // 서버 도메인
				.name("moapay")    // 서버 이름
				.build())
			.user(userEntity)  // 사용자 정보
			.challenge(challenge)  // 챌린지
			.pubKeyCredParams(Arrays.asList(
				PublicKeyCredentialParameters.builder()
					.alg(COSEAlgorithmIdentifier.ES256)  // -7 (ECDSA 알고리즘)
					.type(PublicKeyCredentialType.PUBLIC_KEY)
					.build()
			))
			.authenticatorSelection(AuthenticatorSelectionCriteria.builder()
				.userVerification(UserVerificationRequirement.PREFERRED)
				.build())
			.attestation(AttestationConveyancePreference.NONE)
			.build();

		// 세션에 챌린지 저장
		request.getSession().setAttribute("authnChallenge", challenge);

		return options;
	}

	@PostMapping("/verify")
	public ResponseEntity<ResultResponse> verifyAuthentication(@RequestBody Map<String, Object> responseData, HttpServletRequest request) {
		try {
			// 세션에서 챌린지를 가져옴
			ByteArray challenge = (ByteArray) request.getSession().getAttribute("authnChallenge");
			if (challenge == null) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(ResultResponse.of(HttpStatus.BAD_REQUEST, "챌린지가 유효하지 않습니다."));
			}

			// 클라이언트로부터 전달받은 데이터에서 자격 증명 ID와 응답 데이터 추출
			String credentialId = (String) responseData.get("id");
			Map<String, Object> response = (Map<String, Object>) responseData.get("response");

			// AuthenticatorResponse는 별도의 형태로 변환 (clientDataJSON 및 authenticatorData 필요)
			ByteArray authenticatorData = new ByteArray((byte[]) response.get("authenticatorData"));
			ByteArray clientDataJSON = new ByteArray((byte[]) response.get("clientDataJSON"));

			// 사용자 정보 조회 (이름으로 조회, 실제로는 JWT 기반 인증을 추천)
			Member member = memberRepository.findByCredentialId(credentialId);
			if (member == null) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body(ResultResponse.of(HttpStatus.UNAUTHORIZED, "사용자를 찾을 수 없습니다."));
			}
			// AuthenticatorAttestationResponse 생성
			AuthenticatorAttestationResponse attestationResponse = AuthenticatorAttestationResponse.builder()
				.attestationObject(authenticatorData)
				.clientDataJSON(clientDataJSON)
				.build();

			// PublicKeyCredential 생성
			PublicKeyCredential credential = PublicKeyCredential.builder()
				.id(new ByteArray(credentialId.getBytes()))  // 자격 증명 ID
				.response(attestationResponse)  // 생성된 AuthenticatorAttestationResponse 객체
				.clientExtensionResults(null)  // 클라이언트 확장 결과 (없을 경우 빈 객체)
				.type(PublicKeyCredentialType.PUBLIC_KEY)  // 자격 증명 타입
				.build();

			// PublicKeyCredentialRequestOptions 생성
			PublicKeyCredentialRequestOptions options = PublicKeyCredentialRequestOptions.builder()
				.challenge(challenge) // 서버에서 제공한 챌린지
				.rpId("moapay.com") // 서버 도메인
				.allowCredentials(Arrays.asList(
					PublicKeyCredentialDescriptor.builder()
						.id(new ByteArray(credentialId.getBytes())) // 자격 증명 ID
						.type(PublicKeyCredentialType.PUBLIC_KEY) // 자격 증명 타입
						.build()
				)) // 허용된 자격 증명 목록
				.build();

			// AssertionRequest 생성
			AssertionRequest assertionRequest = AssertionRequest.builder()
				.publicKeyCredentialRequestOptions(options)
				.username(member.getName()) // 사용자 이름
				.build();

			// 서버에서 사용자 인증 정보 검증
			var authenticationResult = relyingParty.finishAssertion(
				FinishAssertionOptions.builder()
					.request(assertionRequest)  // AssertionRequest를 전달
					.response(credential)
					.build()
			);

			if (authenticationResult.isSuccess()) {
				// 인증 성공 시 처리 (로그인/결제)
				ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "인증 성공");
				return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
			} else {
				// 인증 실패 시 처리
				ResultResponse resultResponse = ResultResponse.of(HttpStatus.UNAUTHORIZED, "인증 실패");
				return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
			}
		} catch (Exception e) {
			log.error("인증 과정에서 오류 발생: ", e);
			ResultResponse resultResponse = ResultResponse.of(HttpStatus.BAD_REQUEST, "인증 오류 발생");
			return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
		}
	}



}
