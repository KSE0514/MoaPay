package com.moa.moapay.domain.dutchpay.controller;

import com.moa.moapay.domain.dutchpay.model.dto.DutchPayPaymentRequsetDto;
import com.moa.moapay.domain.dutchpay.model.dto.DutchPayRoomJoinDto;
import com.moa.moapay.domain.dutchpay.model.dto.DutchPayStartRequestDto;
import com.moa.moapay.domain.dutchpay.model.dto.DutchRoomInfo;
import com.moa.moapay.domain.dutchpay.service.DutchPayService;
import com.moa.moapay.domain.generalpay.service.GeneralPayService;
import com.moa.moapay.global.response.ResultResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

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

    @PostMapping("/payment")
    public ResponseEntity<?> payment(@Valid @RequestBody DutchPayPaymentRequsetDto dutchPayPaymentRequsetDto) {
        log.info("Payment request: {}", dutchPayPaymentRequsetDto);
        ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "더치페이 결제 요청이 성공 했습니다.");
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    /**
     * 더치페이 완료 전송용 sse
     * @param id
     * @return
     */
    @GetMapping(value = "/subscribe/{id}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe(@PathVariable UUID id) {
        // 클라이언트에서 결제 요청을 보내기 전, 구독을 해놓는다
        log.info("Subscribing to notification with id {}", id);

        return null;
    }
}
