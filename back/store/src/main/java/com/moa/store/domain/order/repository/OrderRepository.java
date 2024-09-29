package com.moa.store.domain.order.repository;

import com.moa.store.domain.order.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByStoreUuid(UUID merchantId);
    Optional<Order> findByUuid(UUID orderId);
}
