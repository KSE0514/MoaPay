package com.moa.moapay.domain.dutchpay.controller;

import com.moa.moapay.domain.dutchpay.model.dto.DutchPayRoomJoinDto;
import com.moa.moapay.domain.dutchpay.model.dto.DutchPayStartRequestDto;
import com.moa.moapay.domain.dutchpay.model.dto.DutchRoomInfo;
import com.moa.moapay.domain.dutchpay.service.DutchPayService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    public ResponseEntity<String> createRoom(@Valid @RequestBody DutchPayStartRequestDto dutchPayStartRequestDto) {
        log.info("Creating Dutch pay room");
        UUID uuid = dutchPayService.createDutchRoom(dutchPayStartRequestDto);
        String joinUrl = "http://localhost:18020/dutchpay/join/" + uuid.toString();
        return ResponseEntity.ok(String.valueOf(uuid)); // 성공적으로 방이 생성되었음을 /응답 형식 변경 해야 할듯
    }


}
