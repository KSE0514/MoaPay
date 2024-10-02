package com.moa.gateway.security;

import java.security.SignatureException;
import java.util.Arrays;
import java.util.Base64;
import java.util.Collection;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.moa.gateway.global.exception.BusinessException;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtUtil {

	//private final RedisTemplate<String, String> redisTemplate;

	private SecretKey secretKey;

	@Value("${spring.jwt.secret}")
	private String secretKeyString; // 비밀 키 문자열

	@PostConstruct
	protected void init() {
		// 비밀 키 문자열이 Base64로 인코딩된 것이 아니라면, 이를 사용하여 SecretKey 생성
		// 비밀 키는 최소 512비트(64바이트) 이상이어야 합니다.
		if (secretKeyString.length() < 64) {
			throw new IllegalArgumentException("비밀 키는 최소 512비트(64바이트)이어야 합니다.");
		}

		// 비밀 키를 안전하게 생성
		secretKey = Keys.hmacShaKeyFor(secretKeyString.getBytes());
	}



	// @Value("${spring.jwt.token.access-expiration-time}")
	// private long accessExpirationTime;
	//
	// @Value("${spring.jwt.token.refresh-expiration-time}")
	// private long refreshExpirationTime;
	//
	//
	// public Claims decodeJwt(String token) {
	// 	return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
	// }
	//
	// public boolean isTokenBlacklisted(String token) {
	// 	return redisTemplate.opsForValue().get("blacklist:" + token) == null; //blacklist 에 존재하지 않으면  true
	// }
	//
	// //토큰 유효성 검사
	// public boolean validateToken(String token) {
	// 	try {
	// 		Claims claims = decodeJwt(token);
	// 		return claims.getExpiration().after(new Date());
	// 	} catch (JwtException e) {
	// 		return false;
	// 	}
	// }
	//
	// //header에서 Access Bearer 토큰 가져오기
	// public String getJwtTokenFromRequestHeader(HttpServletRequest request) {
	// 	String bearerToken = request.getHeader("Authorization");
	// 	if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
	// 		return bearerToken.substring(7);
	// 	}
	// 	return null;
	// }
	//
	// public String getRefreshTokenByUuid(String uuid) {
	// 	// Redis에서 리프레시 토큰 조회
	// 	return redisTemplate.opsForValue().get("refresh-token:" + uuid);
	// }
	//
	// // 토큰에서 Uuid 가져오기. String 형태로.
	// public String getUuidFromToken(String token) {
	// 	return decodeJwt(token).get("uuid", String.class);
	// }
	//
	// public Authentication getAuthentication(String token) {
	// 	Claims claims = decodeJwt(token);
	// 	String uuid = claims.get("uuid", String.class); // UUID 추출
	// 	MemberPrincipalDetails userDetails = new MemberPrincipalDetails(uuid);
	// 	return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	// }
	//
	//
	// public boolean hasClaim(Claims claims, String claimKey, String claimValue) {
	// 	return claimValue.equals(claims.get(claimKey, String.class));
	// }
	//
	//
	// public long getExpirationTime(String token) {
	// 	Claims claims = decodeJwt(token);
	// 	return claims.getExpiration().getTime();
	// }

	public String getToken(ServerHttpRequest request){
		return request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
	}

	public String resolveToken(ServerHttpRequest request){
		String bearerToken = getToken(request);

		if(bearerToken !=null && bearerToken.startsWith("Bearer")){
			return bearerToken.substring(7);
		}

		return null;
	}

	public boolean validateJwtToken(String authToken){
		try {
			Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(authToken);
			return true;
		} catch (ExpiredJwtException e) {
			log.error("JWT token is expired: {}", e.getMessage());
			throw new BusinessException(HttpStatus.UNAUTHORIZED,"토큰이 만료되었습니다.");
		} catch (UnsupportedJwtException e) {
			log.error("JWT token is unsupported: {}", e.getMessage());
			throw new BusinessException(HttpStatus.UNAUTHORIZED,"토큰이 없습니다.");
		} catch (IllegalArgumentException e) {
			log.error("JWT claims string is empty: {}", e.getMessage());
			throw new BusinessException(HttpStatus.UNAUTHORIZED,"claim이 존재하지 않습니다.");
		}catch (JwtException e){
			log.error("Invalid JWT token: {}", e.getMessage());
			throw new BusinessException(HttpStatus.UNAUTHORIZED,"유효하지 않는 토큰입니다.");
		}
	}

	public Authentication getAuthentication(String token){
		Claims claims = parseClaims(token);

		// Collection<? extends GrantedAuthority> authorities = Arrays
		// 	.stream(claims.get("uuid").toString())
		// 	.map(SimpleGrantedAuthority::new)
		// 	.toList();

		String uuid=parseClaims(token).get("uuid", String.class);
		System.out.println("gateway 토큰:"+uuid);

		MemberPrincipalDetails userDetails = new MemberPrincipalDetails(uuid);

		return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
	}


	private Claims parseClaims(String accessToken){
		try {
			return Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(accessToken).getBody();
		} catch(ExpiredJwtException e) {
			return e.getClaims();
		}
	}
}
