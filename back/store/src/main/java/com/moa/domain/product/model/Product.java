package com.moa.domain.product.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

import com.moa.domain.product.model.dto.UpdateProductRequestDto;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    private UUID uuid;

    @NotNull
    @Column(length = 100)
    private String name;

    @NotNull
    private long price;

    @NotNull
    @Column(name = "image_url", length = 200)
    private String imageUrl;

    @NotNull
    @Column(name = "create_time")
    private LocalDateTime createTime;

    @NotNull
    private LocalDateTime updateTime;

    @PrePersist
    private void prePersist() {
        LocalDateTime now = LocalDateTime.now();
        this.createTime = now;
        this.updateTime = now;
    }

    @PreUpdate
    private void preUpdate() {
        this.updateTime = LocalDateTime.now();
    }

    public void changeProductInfo(UpdateProductRequestDto product) {
        this.name = product.getName();
        this.price = product.getPrice();
        this.imageUrl = product.getImageUrl();
    }
}
