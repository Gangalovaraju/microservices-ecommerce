package com.ecommerce.order.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class OrderDtos {

    // ─── Request ──────────────────────────────────────────────
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PlaceOrderRequest {
        @NotBlank(message = "Customer email is required")
        @Email(message = "Invalid email format")
        private String customerEmail;

        @NotBlank(message = "Payment method is required")
        private String paymentMethod;

        @NotEmpty(message = "Order must contain at least one item")
        @Valid
        private List<OrderItemRequest> items;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderItemRequest {
        @NotBlank
        private String skuCode;
        @NotBlank
        private String productName;
        @Min(value = 1, message = "Quantity must be at least 1")
        private Integer quantity;
        @DecimalMin(value = "0.01", message = "Price must be greater than 0")
        private BigDecimal price;
    }

    // ─── Payment inter-service DTO ────────────────────────────
    @Data
    @AllArgsConstructor
    public static class PaymentRequest {
        private String orderNumber;
        private BigDecimal amount;
        private String paymentMethod;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PaymentResponse {
        private boolean success;
        private String paymentId;
        private String message;
    }

    // ─── Notification inter-service DTO ───────────────────────
    @Data
    @AllArgsConstructor
    public static class NotificationRequest {
        private String email;
        private String orderNumber;
        private String status;
        private BigDecimal amount;
    }

    // ─── Response ─────────────────────────────────────────────
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderResponse {
        private Long id;
        private String orderNumber;
        private String customerEmail;
        private String status;
        private BigDecimal totalAmount;
        private String paymentId;
        private String paymentMethod;
        private List<OrderItemResponse> items;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderItemResponse {
        private Long id;
        private String skuCode;
        private String productName;
        private Integer quantity;
        private BigDecimal price;
        private BigDecimal subtotal;
    }

    @Data
    @AllArgsConstructor
    public static class ApiError {
        private int status;
        private String error;
        private String message;
        private LocalDateTime timestamp;
    }
}
