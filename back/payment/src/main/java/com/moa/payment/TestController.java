package com.moa.payment;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/payment/pay")
public class TestController {
    @GetMapping("/welcome")
    public String test() {
        return "this is payment service!";
    }
}
