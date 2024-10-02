package com.moa.gateway.security;

import java.util.Base64;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtUtil {

	private final RedisTemplate<String, String> redisTemplate;

	@Value("${spring.jwt.secret}")
	private String secretKey;

	@Value("${spring.jwt.token.access-expiration-time}")
	private long accessExpirationTime;

	@Value("${spring.jwt.token.refresh-expiration-time}")
	private long refreshExpirationTime;

	@PostConstruct
	protected void init() {
		secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
	}

	public Claims decodeJwt(String token) {
		return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
	}

	public boolean isTokenBlacklisted(String token) {
		return redisTemplate.opsForValue().get("blacklist:" + token) == null; //blacklist 에 존재하지 않으면  true
	}

	//토큰 유효성 검사
	public boolean validateToken(String token) {
		try {
			Claims claims = decodeJwt(token);
			return claims.getExpiration().after(new Date());
		} catch (JwtException e) {
			return false;
		}
	}

	//header에서 Access Bearer 토큰 가져오기
	public String getJwtTokenFromRequestHeader(HttpServletRequest request) {
		String bearerToken = request.getHeader("Authorization");
		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
			return bearerToken.substring(7);
		}
		return null;
	}

	public String getRefreshTokenByUuid(String uuid) {
		// Redis에서 리프레시 토큰 조회
		return redisTemplate.opsForValue().get("refresh-token:" + uuid);
	}

	// 토큰에서 Uuid 가져오기. String 형태로.
	public String getUuidFromToken(String token) {
		return decodeJwt(token).get("uuid", String.class);
	}

	public Authentication getAuthentication(String token) {
		Claims claims = decodeJwt(token);
		String uuid = claims.get("uuid", String.class); // UUID 추출
		MemberPrincipalDetails userDetails = new MemberPrincipalDetails(uuid);
		return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	}


	public boolean hasClaim(Claims claims, String claimKey, String claimValue) {
		return claimValue.equals(claims.get(claimKey, String.class));
	}


	public long getExpirationTime(String token) {
		Claims claims = decodeJwt(token);
		return claims.getExpiration().getTime();
	}
}
