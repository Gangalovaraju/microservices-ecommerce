package com.ecommerce.inventory.dto;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class InventoryDtos {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProductResponse {
        private Long id;
        private String skuCode;
        private String productName;
        private String description;
        private BigDecimal price;
        private Integer quantity;
        private String category;
        private String imageUrl;
        private LocalDateTime createdAt;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class StockCheckResponse {
        private String skuCode;
        private boolean inStock;
        private Integer availableQuantity;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ApiResponse<T> {
        private boolean success;
        private String message;
        private T data;

        public static <T> ApiResponse<T> success(T data) {
            return new ApiResponse<>(true, "Success", data);
        }

        public static <T> ApiResponse<T> error(String message) {
            return new ApiResponse<>(false, message, null);
        }
    }
}
