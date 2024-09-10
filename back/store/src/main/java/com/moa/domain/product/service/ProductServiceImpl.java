package com.moa.domain.product.service;

import com.moa.domain.product.model.Product;
import com.moa.domain.product.model.dto.ProductDto;
import com.moa.domain.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductServiceImpl implements ProductService{

    private final ProductRepository productRepository;

    @Override
    public Page<ProductDto> getProducts(int page, int row) {
        Pageable pageable = PageRequest.of(page, row, Sort.by("createTime").descending());
        return productRepository.findAll(pageable).map(ProductDto::new);
    }

    @Override
    @Transactional
    public void deleteProduct(UUID productUuid) {
        Optional<Product> product = productRepository.findProductByUuid(productUuid);
        if (product.isPresent()) {

        }
    }

    @Override
    public ProductDto updateProduct(UUID productUUID, Product product) {
        return null;
    }
}
