package com.moa.store.domain.order.model.dto;

import com.moa.store.domain.itemInfo.model.ItemInfo;
import com.moa.store.domain.itemInfo.model.dto.ItemInfoDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
@Builder
public class SaveOrderRequestDto {
    private UUID merchantId;
    private String customerId;
    private long totalPrice;
    private String state;
    private List<ItemInfoDto> itemInfoDtoList;
}
