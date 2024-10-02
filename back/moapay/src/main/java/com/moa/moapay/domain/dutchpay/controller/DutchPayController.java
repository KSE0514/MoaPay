package com.moa.moapay.domain.dutchpay.controller;

import com.moa.moapay.domain.dutchpay.model.dto.DutchPayRoomJoinDto;
import com.moa.moapay.domain.dutchpay.model.dto.DutchPayStartRequestDto;
import com.moa.moapay.domain.dutchpay.model.dto.DutchRoomInfo;
import com.moa.moapay.domain.dutchpay.service.DutchPayService;
import com.moa.moapay.global.response.ResultResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/dutchpay")
@CrossOrigin(origins = "*")
public class DutchPayController {
    private final DutchPayService dutchPayService;
    // 방 생성 엔드포인트
    @PostMapping("/createRoom")
    public ResponseEntity<ResultResponse> createRoom(@Valid @RequestBody DutchPayStartRequestDto dutchPayStartRequestDto) {
        log.info("Creating Dutch pay room");
        UUID uuid = dutchPayService.createDutchRoom(dutchPayStartRequestDto);
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.CREATED, "더치페이 룸 생성", uuid);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

}
