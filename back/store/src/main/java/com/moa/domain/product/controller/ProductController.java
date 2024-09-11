package com.moa.domain.product.controller;

import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.moa.domain.product.model.Product;
import com.moa.domain.product.model.dto.CreateProductRequestDto;
import com.moa.domain.product.model.dto.ProductDto;
import com.moa.domain.product.model.dto.UpdateProductRequestDto;
import com.moa.domain.product.service.ProductService;
import com.moa.global.response.ResultResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/store/product")
public class ProductController {

	private final ProductService productService;

	@GetMapping("{uuid}")
	public ResponseEntity<ResultResponse> getProducts(@PathVariable UUID uuid) {
		ProductDto product = new ProductDto(productService.getProduct(uuid));
		ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "상품 조회를 완료했습니다.", product);
		return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

	@DeleteMapping("{uuid}")
	public ResponseEntity<ResultResponse> deleteProduct(@RequestParam UUID uuid) {
		productService.deleteProduct(uuid);
		ResultResponse resultResponse = ResultResponse.of(HttpStatus.OK, "상품 삭제를 완료했습니다.");
		return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
	}

	@PostMapping
	public ResponseEntity<ResultResponse> createProduct(@RequestBody CreateProductRequestDto createProductRequestDto) {
		ProductDto product = new ProductDto(productService.createProduct(createProductRequestDto));
		ResultResponse resultResponse = ResultResponse.of(HttpStatus.CREATED, "상품 등록을 완료했습니다.", product);
		return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
	}

	// @PutMapping("{uuid}")
	// public ResponseEntity<ResultResponse> updateProduct(@PathVariable UUID uuid, @RequestBody UpdateProductRequestDto updateProductRequestDto) {
	//
	// }
}
