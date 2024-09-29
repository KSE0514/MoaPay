package com.moa.store.domain.order.service;

import com.moa.store.domain.order.model.dto.OrderListResponseDto;
import com.moa.store.domain.order.model.dto.OrderResponseDto;
import com.moa.store.domain.order.model.dto.UpdateOrderStatusRequestDto;

import java.util.List;
import java.util.UUID;

public interface OrderService {
    List<OrderListResponseDto> getOrdersByMerchant(UUID merchantId);
    OrderResponseDto getOrderResponse(UUID orderId);
    OrderResponseDto ChangeOrderStatus(UpdateOrderStatusRequestDto updateOrderStatusRequestDto);
}
