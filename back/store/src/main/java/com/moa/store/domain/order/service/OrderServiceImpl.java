package com.moa.store.domain.order.service;

import com.moa.store.domain.itemInfo.model.ItemInfo;
import com.moa.store.domain.itemInfo.model.dto.ItemInfoDto;
import com.moa.store.domain.itemInfo.repository.ItemInfoRepository;
import com.moa.store.domain.order.model.Order;
import com.moa.store.domain.order.model.OrderStatus;
import com.moa.store.domain.order.model.dto.OrderListResponseDto;
import com.moa.store.domain.order.model.dto.OrderResponseDto;
import com.moa.store.domain.order.model.dto.TitleItemDto;
import com.moa.store.domain.order.model.dto.UpdateOrderStatusRequestDto;
import com.moa.store.domain.order.repository.OrderRepository;
import com.moa.store.domain.paymentInfo.model.PaymentInfo;
import com.moa.store.domain.paymentInfo.model.dto.PaymentInfoDto;
import com.moa.store.domain.paymentInfo.repository.PaymentInfoRepository;
import com.moa.store.global.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final ItemInfoRepository itemInfoRepository;
    private final PaymentInfoRepository paymentInfoRepository;

    @Override
    public List<OrderListResponseDto> getOrdersByMerchant(UUID merchantId) {
        List<Order> orders = orderRepository.findByStoreUuidWithItemInfos(merchantId);
        return orders.stream().map(order -> {
            List<ItemInfo> itemInfos = order.getItemInfos();
            ItemInfo firstItem = itemInfos.isEmpty() ? null : itemInfos.get(0);
            return OrderListResponseDto.builder()
                .orderId(order.getUuid())
                .customerId(order.getCustomerId())
                .totalPrice(order.getTotalPrice())
                .state(order.getState().toString())
                .titleItem(firstItem != null
                    ? TitleItemDto.builder()
                    .itemId(firstItem.getUuid())
                    .itemName(firstItem.getItemName())
                    .build()
                    : null)
                .itemCount(itemInfos.size())
                .createTime(order.getCreateTime())
                .updateTime(order.getUpdateTime())
                .build();
        }).toList();
    }

    @Override
    public OrderResponseDto getOrderResponse(UUID orderId) {
        Order order = orderRepository.findByUuid(orderId).orElseThrow(()
                -> new BusinessException(HttpStatus.BAD_REQUEST, "주문 UUID를 확인해주세요."));
        List<ItemInfo> itemInfoList = itemInfoRepository.findByOrder(order);
        List<ItemInfoDto> itemInfoDtos = itemInfoList.stream().map((item) -> ItemInfoDto.builder()
                .itemId(item.getUuid())
                .itemName(item.getItemName())
                .quantity(item.getQuantity())
                .totalPrice(item.getPrice() * item.getQuantity()).build())
                .toList();

        List<PaymentInfo> paymentInfoList = paymentInfoRepository.findByOrder(order);
        List<PaymentInfoDto> paymentInfoDtos = paymentInfoList.stream().map((payment) -> PaymentInfoDto.builder()
                .paymentId(payment.getUuid())
                .actualAmount(payment.getActualAmount())
                .amount(payment.getAmount())
                .status(String.valueOf(payment.getStatus()))
                .paymentTime(payment.getPaymentTime())
                .cardNumber(payment.getCardNumber()).build())
                .toList();
        long totalActualAmount = paymentInfoDtos.stream().mapToLong(PaymentInfoDto::getActualAmount).sum();
        long totalAmount = paymentInfoDtos.stream().mapToLong(PaymentInfoDto::getAmount).sum();

        return OrderResponseDto.builder()
                .orderId(orderId)
                .customerId(order.getCustomerId())
                .totalPrice(order.getTotalPrice())
                .totalAmount(totalAmount)
                .totalActualAmount(totalActualAmount)
                .state(String.valueOf(order.getState()))
                .itemCount(itemInfoDtos.size())
                .itemInfoList(itemInfoDtos)
                .paymentInfoList(paymentInfoDtos)
                .createTime(order.getCreateTime())
                .updateTime(order.getUpdateTime())
                .build();
    }

    @Override
    @Transactional
    public OrderResponseDto ChangeOrderStatus(UpdateOrderStatusRequestDto updateOrderStatusRequestDto) {
        Order order = orderRepository.findByUuid(updateOrderStatusRequestDto.getOrderId()).orElseThrow(()
                -> new BusinessException(HttpStatus.BAD_REQUEST, "주문 UUID를 확인해주세요."));
        OrderStatus status;
        try {
            status = OrderStatus.valueOf(updateOrderStatusRequestDto.getStatus());
        } catch (IllegalArgumentException e) {
            throw new BusinessException(HttpStatus.BAD_REQUEST, "잘못된 주문 상태입니다.");
        }
        order.updateState(String.valueOf(status));
        return getOrderResponse(updateOrderStatusRequestDto.getOrderId());
    }
}
