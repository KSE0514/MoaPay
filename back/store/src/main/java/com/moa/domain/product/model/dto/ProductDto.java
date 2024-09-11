package com.moa.domain.product.model.dto;

import com.moa.domain.product.model.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
public class ProductDto {
    private UUID productUuId;
    private String productName;
    private long price;
    private String imageUrl;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;

    public ProductDto(Product product) {
        this.productUuId = product.getUuid();
        this.productName = product.getName();
        this.price = product.getPrice();
        this.createTime = product.getCreateTime();
        this.updateTime = product.getUpdateTime();
        if (product.getImageUrl() != null) {
            this.imageUrl = product.getImageUrl();
        }
    }
}
