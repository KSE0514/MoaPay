package com.moa.store.domain.order.model.dto;

import com.moa.store.domain.order.model.Order;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
@Builder
public class CreateOrderRequestDto {
    private UUID merchantId;
    private String customerId;
    private long totalPrice;
    private List<OrderItemDto> item;
}
