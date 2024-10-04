package com.moa.moapay.global.kafkaVo;

import lombok.*;

import java.util.UUID;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DutchPayCompliteVo {

    private UUID roomId;
    private UUID memberId;
    private String payType;
}
