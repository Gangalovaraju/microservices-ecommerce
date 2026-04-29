package com.ecommerce.inventory.service;

import com.ecommerce.inventory.dto.InventoryDtos.*;
import com.ecommerce.inventory.entity.Product;
import com.ecommerce.inventory.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class InventoryService {

    private final ProductRepository productRepository;

    public List<ProductResponse> getAllProducts() {
        log.debug("Fetching all products");
        return productRepository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<ProductResponse> getProductsByCategory(String category) {
        return productRepository.findByCategory(category)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public StockCheckResponse checkStock(String skuCode, int requestedQty) {
        log.debug("Checking stock for skuCode={} qty={}", skuCode, requestedQty);
        return productRepository.findBySkuCode(skuCode)
                .map(p -> new StockCheckResponse(skuCode, p.getQuantity() >= requestedQty, p.getQuantity()))
                .orElse(new StockCheckResponse(skuCode, false, 0));
    }

    @Transactional
    public boolean reserveStock(String skuCode, int quantity) {
        log.info("Reserving stock: skuCode={} quantity={}", skuCode, quantity);
        int updated = productRepository.decrementStock(skuCode, quantity);
        return updated > 0;
    }

    // ─── Mapper ───────────────────────────────────────────────
    private ProductResponse toResponse(Product p) {
        return ProductResponse.builder()
                .id(p.getId())
                .skuCode(p.getSkuCode())
                .productName(p.getName())
                .description(p.getDescription())
                .price(p.getPrice())
                .quantity(p.getQuantity())
                .category(p.getCategory())
                .imageUrl(p.getImageUrl())
                .createdAt(p.getCreatedAt())
                .build();
    }
}
