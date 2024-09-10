package com.moa.payment.domain.online.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/payment/pay/online")
public class OnlinePaymentController {
    @GetMapping("/test")
    public String test() {
        return "테스트 성공~!";
    }
}
