// package com.moa.gateway.security;
//
// import java.io.IOException;
// import java.util.Objects;
//
// import org.springframework.cloud.gateway.filter.GatewayFilter;
// import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
// import org.springframework.http.HttpHeaders;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.server.reactive.ServerHttpRequest;
// import org.springframework.http.server.reactive.ServerHttpResponse;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.stereotype.Component;
// import org.springframework.web.server.ServerWebExchange;
// import org.springframework.web.server.WebFilter;
// import org.springframework.web.server.WebFilterChain;
//
// import com.moa.gateway.global.exception.BusinessException;
//
// import io.jsonwebtoken.Claims;
// import io.jsonwebtoken.ExpiredJwtException;
// import jakarta.servlet.FilterChain;
// import jakarta.servlet.ServletException;
// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;
// import lombok.extern.slf4j.Slf4j;
// import reactor.core.publisher.Mono;
//
// @Slf4j
// @Component
// public class AuthorizationHeaderFilter extends AbstractGatewayFilterFactory<AuthorizationHeaderFilter.Config> {
//
// 	private final JwtUtil jwtUtil;
//
// 	public AuthorizationHeaderFilter(JwtUtil jwtUtil) {
// 		super(Config.class);
// 		this.jwtUtil = jwtUtil;
// 	}
//
// 	public static class Config {
// 		// Config 설정이 필요할 경우 여기에 추가
// 	}
//
// 	@Override
// 	public GatewayFilter apply(Config config) {
// 		return (exchange, chain) -> {
// 			ServerHttpRequest request = exchange.getRequest();
// 			HttpHeaders headers = request.getHeaders();
//
// 			// HTTP 요청 헤더에서 Authorization 헤더를 가져옴
// 			if (!headers.containsKey(HttpHeaders.AUTHORIZATION)) {
// 				return onError(exchange, "Authorization 헤더가 없습니다.", HttpStatus.UNAUTHORIZED);
// 			}
//
// 			String authorizationHeader = Objects.requireNonNull(headers.get(HttpHeaders.AUTHORIZATION)).get(0);
// 			String accessToken = authorizationHeader.replace("Bearer ", "");
//
// 			try {
// 				// JWT 토큰 유효성 검사
// 				if (!jwtUtil.validateToken(accessToken)) {
// 					return onError(exchange, "유효하지 않은 토큰입니다.", HttpStatus.UNAUTHORIZED);
// 				}
//
// 				// 블랙리스트 확인
// 				if (!jwtUtil.isTokenBlacklisted(accessToken)) {
// 					Claims claims = jwtUtil.decodeJwt(accessToken);
// 					if (jwtUtil.hasClaim(claims, "type", "access")) {
// 						Authentication auth = jwtUtil.getAuthentication(accessToken);
// 						SecurityContextHolder.getContext().setAuthentication(auth);
// 						log.info("인증 성공: " + auth.getName());
// 					} else {
// 						return onError(exchange, "잘못된 token type.", HttpStatus.UNAUTHORIZED);
// 					}
// 				} else {
// 					return onError(exchange, "로그아웃된 토큰입니다.", HttpStatus.UNAUTHORIZED);
// 				}
// 			} catch (ExpiredJwtException e) {
// 				log.error("만료된 토큰: {}", accessToken);
// 				return onError(exchange, "만료된 토큰입니다.", HttpStatus.UNAUTHORIZED);
// 			} catch (Exception e) {
// 				log.error("JWT 인증 중 오류 발생: {}", e.getMessage());
// 				return onError(exchange, "인증 오류.", HttpStatus.UNAUTHORIZED);
// 			}
//
// 			// 다음 필터로 요청 전달
// 			return chain.filter(exchange);
// 		};
// 	}
//
// 	private Mono<Void> onError(ServerWebExchange exchange, String errorMsg, HttpStatus httpStatus) {
// 		log.error(errorMsg);
// 		ServerHttpResponse response = exchange.getResponse();
// 		response.setStatusCode(httpStatus);
// 		return response.setComplete();
// 	}
// }
