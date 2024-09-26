package com.moa.member.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration
public class WebConfig implements WebMvcConfigurer {
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
				.allowedOrigins("https://moapay-7e24e.web.app", "http://localhost:18040") // 실제 도메인과 로컬 도메인 모두 허용
				.allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH")
				.allowedHeaders("*")
				.allowCredentials(true); // 쿠키 인증 요청 허용
	}
}
