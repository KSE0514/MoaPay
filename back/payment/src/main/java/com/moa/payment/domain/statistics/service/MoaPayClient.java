package com.moa.payment.domain.statistics.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.UUID;

@FeignClient(name = "moapay")
public interface MoaPayClient {

    @GetMapping("/core/card/mycard")
    List<UUID> getCardIdsByMemberId(@RequestParam("memberId") UUID memberId);
}
