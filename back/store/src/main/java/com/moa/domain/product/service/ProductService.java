package com.moa.domain.product.service;

import com.moa.domain.product.model.Product;
import com.moa.domain.product.model.dto.ProductDto;
import org.springframework.data.domain.Page;

import java.util.UUID;

public interface ProductService {
    Page<ProductDto> getProducts(int page, int row);
    void deleteProduct(UUID productUuid);
    ProductDto updateProduct(UUID productUuid, Product product);
}
