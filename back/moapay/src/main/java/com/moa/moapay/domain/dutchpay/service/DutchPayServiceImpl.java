package com.moa.moapay.domain.dutchpay.service;

import com.moa.moapay.domain.dutchpay.entity.DutchPay;
import com.moa.moapay.domain.dutchpay.entity.DutchRoom;
import com.moa.moapay.domain.dutchpay.entity.DutchStatus;
import com.moa.moapay.domain.dutchpay.model.dto.*;
import com.moa.moapay.domain.dutchpay.repository.DutchPayRepository;
import com.moa.moapay.domain.dutchpay.repository.DutchRoomRepository;
import com.moa.moapay.global.exception.BusinessException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.http.HttpMessageConverters;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DutchPayServiceImpl implements DutchPayService {

    private final DutchPayRepository dutchPayRepository;
    private final DutchRoomRepository dutchRoomRepository;
    private final SimpMessagingTemplate messagingTemplate;
    private final HttpMessageConverters messageConverters;

    @Override
    @Transactional
    public UUID createDutchRoom(DutchPayStartRequestDto dutchPayStartRequestDto) {
        UUID uuid = UUID.randomUUID();

        log.info(dutchPayStartRequestDto.toString());
        DutchRoom dutchRoom = DutchRoom.builder()
                .uuid(uuid)
                .totalPrice(dutchPayStartRequestDto.getTotalPrice())
                .merchantName(dutchPayStartRequestDto.getMerchantName())
                .merchantId(dutchPayStartRequestDto.getMerchantId())
                .categoryId(dutchPayStartRequestDto.getCategoryId())
                .orderId(dutchPayStartRequestDto.getOrderId())
                .maxPerson(dutchPayStartRequestDto.getMaxMember())
                .status(DutchStatus.READY)
                .build();

        dutchRoomRepository.save(dutchRoom);
        return uuid;
    }

    // 더치페이 방에 참여
    @Override
    @Transactional
    public List<DutchPayDto> joinDutchRoom(UUID roomId, DutchPayRoomJoinDto dutchPayRoomJoinDto) {
        // 방이 있는지 확인
        DutchRoom existingRoom = validateRoomExists(roomId);
        
        long max = existingRoom.getMaxPerson();
        log.info("max = {}", max);

        List<DutchPay> dutchPays = dutchPayRepository.findByRoomUuid(roomId);
        
        // 중복 등록 방지
        for (DutchPay dutchPay : dutchPays) {
            if(dutchPay.getMemberId().equals(dutchPayRoomJoinDto.getMemberId())) {
                throw new BusinessException(HttpStatus.NOT_EXTENDED, "이미 등록된 회원");  
            }
        }

        // 수용 인원 초과
        if(existingRoom.getDutchPayList().size() >= max) {
            throw new BusinessException(HttpStatus.NOT_EXTENDED, "수용인원 초과");
        }
        // 이미 진행중인 방
        if(existingRoom.getStatus().equals(DutchStatus.PROGRESS)) {
            throw new BusinessException(HttpStatus.NOT_EXTENDED, "이미 더치페이 진행중인 방입니다");
        }

        DutchPay dutchPay = DutchPay.builder().memberId(dutchPayRoomJoinDto.getMemberId())
                .memberName(dutchPayRoomJoinDto.getMemberName())
                .payStatus(DutchStatus.READY)
                .roomEntity(existingRoom)
                .uuid(UUID.randomUUID())
                .build();

        // 새로운 더치페이 정보 저장
        dutchPayRepository.save(dutchPay);
//        existingRoom = validateRoomExists(roomId);

        List<DutchPay> dutchPayList = dutchPayRepository.findByRoomUuid(roomId);

        List<DutchPayDto> dutchPayDtoList = dutchPayList.stream().map(
                dutch -> {
                    return DutchPayDto.builder()
                            .memberId(dutch.getMemberId())
                            .status(dutch.getPayStatus())
                            .amount(dutch.getAmount())
                            .uuid(dutch.getUuid())
                            .memberName(dutch.getMemberName())
                            .build();
                }
        ).collect(Collectors.toList());

//        DutchPayDto dutchPayDto = DutchPayDto
//                .builder()
//                .amount(dutchPay.getAmount())
//                .uuid(dutchPay.getUuid())
//                .status(dutchPay.getStatus())
//                .memberId(dutchPay.getMemberId())
//                .memberName(dutchPay.getMemberName())
//                .build();
        // 사용자 입장 정보 보내주기
//        getDutchRoomInfo(roomId);

        return dutchPayDtoList;
    }


    @Override
    @Transactional
    public List<DutchPayDto> leaveDutchRoom(DutchPayRoomLeaveDto dutchPayRoomLeaveDto) {
        UUID roomId = dutchPayRoomLeaveDto.getRoomId();
        DutchRoom existingRoom = validateRoomExists(roomId);  // 방 존재 여부 검증

        try {
            dutchPayRepository.deleteDutchPayByUuid(dutchPayRoomLeaveDto.getMemberId(), existingRoom.getUuid());
        } catch (EntityNotFoundException e) {
            throw new BusinessException(HttpStatus.NOT_FOUND, "해당 멤버가 존재하지 않습니다.");
        }

        // TODO : UUID 가 겹치면 고장남
        dutchRoomRepository.decrementParticipantCount(roomId); // 참가자 수 감소
        if (existingRoom.getCurPerson() == 1) {
            dutchRoomRepository.updateDutchRoomStatus(DutchStatus.CANCEL);
        }

        List<DutchPay> dutchPayList = dutchPayRepository.findByRoomUuid(roomId);

        List<DutchPayDto> dutchPayDtoList = dutchPayList.stream().map(
                dutch -> {
                    return DutchPayDto.builder()
                            .memberId(dutch.getMemberId())
                            .status(dutch.getPayStatus())
                            .amount(dutch.getAmount())
                            .uuid(dutch.getUuid())
                            .memberName(dutch.getMemberName())
                            .build();
                }
        ).collect(Collectors.toList());

        // 사용자 퇴장 정보 보여주기
        return dutchPayDtoList;
    }

    // 방 존재 여부를 검증하는 메서드
    public DutchRoom validateRoomExists(UUID roomId) {
        DutchRoom dutchRoom = dutchRoomRepository.findByUuid(roomId);
        log.info(dutchRoom.getUuid().toString());

        if (dutchRoom == null) {
            throw new BusinessException(HttpStatus.NOT_FOUND, "요청하신 더치페이 방이 없습니다");
        }
        return dutchRoom;
    }

    // 방의 값 확인
    @Override
    @Transactional
    public DutchRoomInfo confirm(DutchPayConfirmRequestDto dutchPayConfirmRequestDto) {

        log.info(dutchPayConfirmRequestDto.getConfirmPriceDtos().get(0).getMemberId().toString());
        List<ConfirmPriceDto> dutchPayDtoList = dutchPayConfirmRequestDto.getConfirmPriceDtos();
        // 방의 참가자 수 설정
        dutchRoomRepository.updateDutchRoom(dutchPayConfirmRequestDto.getMemberCnt());
        extracted(dutchPayConfirmRequestDto.getRoomId(), dutchPayDtoList);

        DutchRoom dutchRoom = dutchRoomRepository.findByRoomId(dutchPayConfirmRequestDto.getRoomId());

        List<DutchPayDto> dutchPayDtos = dutchRoom.getDutchPayList().stream().map(
                dutch -> {
                    return DutchPayDto.builder()
                            .memberId(dutch.getMemberId())
                            .status(dutch.getPayStatus())
                            .amount(dutch.getAmount())
                            .uuid(dutch.getUuid())
                            .memberName(dutch.getMemberName())
                            .build();
                }
        ).collect(Collectors.toList());

        DutchRoomInfo dutchRoomInfo = DutchRoomInfo.builder()
                .dutchUuid(dutchRoom.getUuid())
                .categoryId(dutchRoom.getCategoryId())
                .memberCnt(dutchRoom.getCurPerson())
                .merchantName(dutchRoom.getMerchantName())
                .merchantId(dutchRoom.getMerchantId())
                .orderId(dutchRoom.getOrderId())
                .totalPrice(dutchRoom.getTotalPrice())
                .dutchPayList(dutchPayDtos)
                .build();

        return dutchRoomInfo;
    }

    @Override
    @Transactional
    public void extracted(UUID roomId, List<ConfirmPriceDto> dutchPayDtoList) {
        // 더치 페이 정보 수정
        for(ConfirmPriceDto confirmPriceDto : dutchPayDtoList) {
            dutchPayRepository.updateAmountByMemberId(confirmPriceDto.getPrice(), confirmPriceDto.getMemberId(), roomId, DutchStatus.PROGRESS);
        }
    }

    @Override
    @Transactional
    public DutchRoomInfo getDutchRoomInfo(UUID roomId) {
        DutchRoom dutchRoom = dutchRoomRepository.findByRoomId(roomId);

        List<DutchPay> dutchPayList = dutchRoom.getDutchPayList();
        List<DutchPayDto> dutchPayDtoList = dutchPayList.stream().map(
                dutchPay -> {
                    return DutchPayDto.builder()
                            .memberName(dutchPay.getMemberName())
                            .memberId(dutchPay.getMemberId())
                            .status(dutchPay.getPayStatus())
                            .uuid(dutchPay.getUuid())
                            .build();
                }
        ).collect(Collectors.toList());

        DutchRoomInfo roomInfo = DutchRoomInfo.builder()
                .merchantName(dutchRoom.getMerchantName())
                .memberCnt(dutchRoom.getCurPerson())
                .merchantId(dutchRoom.getMerchantId())
                .dutchUuid(dutchRoom.getUuid())
                .orderId(dutchRoom.getOrderId())
                .totalPrice(dutchRoom.getTotalPrice())
                .categoryId(dutchRoom.getCategoryId())
                .dutchPayList(dutchPayDtoList)
                .build();

        messagingTemplate.convertAndSend("/sub/dutch-room/" + roomId, roomInfo);

        return roomInfo;
    }
}
