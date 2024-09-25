package com.moa.member.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
				.allowedOrigins("https://moapay-mac-eb861.web.app/") // 실제 도메인 지정
				.allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH")
				.allowedHeaders("*")
				.allowCredentials(true); // 쿠키 인증 요청 허용
	}
}
