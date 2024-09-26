package com.moa.store.domain.itemInfo.model;

import java.util.UUID;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import com.moa.store.domain.order.model.Order;
import com.moa.store.domain.product.model.Product;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "item_info")
@DynamicInsert
public class ItemInfo {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@NotNull
	@Column(columnDefinition = "binary(16)", unique = true, nullable = false, updatable = false)
	private UUID uuid;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "order_id")
	private Order order;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "item_id")
	private Product item;

	@NotNull
	@ColumnDefault("1")
	private Long quantity;

	@NotNull
	private long price;
}
