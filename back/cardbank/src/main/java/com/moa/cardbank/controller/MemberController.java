package com.moa.cardbank.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/cardbank/member")
public class MemberController {

	@GetMapping("/welcome")
	public String welcome() {
		return "Welcome cardbank";
	}

}
