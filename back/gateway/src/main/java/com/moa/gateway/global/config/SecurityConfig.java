package com.moa.gateway.global.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.context.NoOpServerSecurityContextRepository;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.reactive.CorsWebFilter;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	// @Bean
	// public AuthenticationManager authenticationManager(
	// 	AuthenticationConfiguration authenticationConfiguration
	// ) throws Exception {
	// 	return authenticationConfiguration.getAuthenticationManager();
	// }

	@Bean
	public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
		return http
			.httpBasic(httpBasic -> httpBasic.disable()) // HTTP Basic 인증 비활성화
			.csrf(csrf -> csrf.disable()) // CSRF 비활성화
			.cors(Customizer.withDefaults()) // CORS 설정
			.securityContextRepository(NoOpServerSecurityContextRepository.getInstance()) //session stateless 설정
			.formLogin(formLogin -> formLogin.disable()) // 폼 로그인 비활성화
			.logout(logout -> logout.disable()) // 로그아웃 비활성화
			.authorizeExchange(exchanges -> exchanges
				.pathMatchers("/moapay/member/login","/moapay/member/join","/moapay/member/sendSMS","/moapay/member/verification","/moapay/member/isMember").permitAll()
				.anyExchange().authenticated() //나머지 경로는 인증 필요
			)
			.build();
	}

	// @Bean
	// public SecurityFilterChain gatewayFilterChain(HttpSecurity http) throws Exception {
	// 	http
	// 		.httpBasic(AbstractHttpConfigurer::disable)
	// 		.csrf(AbstractHttpConfigurer::disable)
	// 		.sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
	// 		.cors(Customizer.withDefaults())
	// 		.formLogin(AbstractHttpConfigurer::disable)
	// 		.logout(AbstractHttpConfigurer::disable)
	// 		.authorizeRequests()    // 다음 리퀘스트에 대한 사용권한 체크
	// 		.requestMatchers("/eureka/**").permitAll()
	// 		.requestMatchers("/**").permitAll() // 모든 주소 허용
	// 		//.requestMatchers("/moapay/member/login","/moapay/member/join","/moapay/member/sendSMS","/moapay/member/verification","/moapay/member/isMember").permitAll() // 허용된 주소
	// 		.anyRequest().authenticated();
	// 	return http.build();
	// }

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration config = new CorsConfiguration();

		config.setAllowCredentials(true);
		config.setAllowedOrigins(
			List.of("https://localhost:8765", "http://localhost:8765",
				"https://localhost", "http://localhost",
				"https://moapay-7e24e.web.app",
				"https://j11c201.p.ssafy.io", "http://j11c201.p.ssafy.io"));
		config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
		config.setAllowedHeaders(List.of("*"));
		config.setExposedHeaders(List.of("*"));

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);
		return source;
	}


}