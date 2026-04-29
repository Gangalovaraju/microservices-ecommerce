package com.ecommerce.order.service;

import com.ecommerce.order.dto.OrderDtos.*;
import com.ecommerce.order.entity.Order;
import com.ecommerce.order.entity.OrderItem;
import com.ecommerce.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Order Service — Core business logic for order lifecycle management.
 *
 * Flow: Inventory Check → Create Order → Process Payment → Send Notification
 *
 * @author Ganga Lova Raju
 * @see <a href="https://github.com/Gangalovaraju">GitHub</a>
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {

    private final OrderRepository orderRepository;
    private final WebClient.Builder webClientBuilder;

    @Value("${services.inventory-url}")
    private String inventoryUrl;

    @Value("${services.payment-url}")
    private String paymentUrl;

    @Value("${services.notification-url}")
    private String notificationUrl;

    // ─────────────────────────────────────────────────────────
    // PLACE ORDER — Main orchestration method
    // ─────────────────────────────────────────────────────────
    @Transactional
    public OrderResponse placeOrder(PlaceOrderRequest request) {
        log.info("Placing order for customer: {}, items: {}",
                request.getCustomerEmail(), request.getItems().size());

        // Step 1: Validate stock for all items
        for (OrderItemRequest item : request.getItems()) {
            validateStock(item.getSkuCode(), item.getQuantity());
        }

        // Step 2: Build order items
        List<OrderItem> items = request.getItems().stream()
                .map(i -> OrderItem.builder()
                        .skuCode(i.getSkuCode())
                        .productName(i.getProductName())
                        .quantity(i.getQuantity())
                        .price(i.getPrice())
                        .build())
                .collect(Collectors.toList());

        // Step 3: Calculate total
        BigDecimal total = items.stream()
                .map(i -> i.getPrice().multiply(BigDecimal.valueOf(i.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Step 4: Persist order
        Order order = Order.builder()
                .orderNumber("ORD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase())
                .customerEmail(request.getCustomerEmail())
                .paymentMethod(request.getPaymentMethod())
                .totalAmount(total)
                .status(Order.OrderStatus.PENDING)
                .build();

        // Link items to order
        items.forEach(item -> item.setOrder(order));
        order.getItems().addAll(items);
        Order saved = orderRepository.save(order);
        log.info("Order created: {}", saved.getOrderNumber());

        // Step 5: Process payment
        processPayment(saved, total, request.getPaymentMethod());

        Order finalized = orderRepository.save(saved);
        log.info("Order finalized: {} status={}", finalized.getOrderNumber(), finalized.getStatus());

        // Step 6: Async notification (fire-and-forget)
        sendNotificationAsync(finalized);

        return toResponse(finalized);
    }

    // ─────────────────────────────────────────────────────────
    // QUERY METHODS
    // ─────────────────────────────────────────────────────────
    public List<OrderResponse> getOrdersByEmail(String email) {
        return orderRepository.findByCustomerEmail(email)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public OrderResponse getOrderByNumber(String orderNumber) {
        Order order = orderRepository.findByOrderNumber(orderNumber)
                .orElseThrow(() -> new RuntimeException("Order not found: " + orderNumber));
        return toResponse(order);
    }

    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAll()
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    // ─────────────────────────────────────────────────────────
    // PRIVATE HELPERS
    // ─────────────────────────────────────────────────────────
    private void validateStock(String skuCode, int qty) {
        try {
            Boolean inStock = webClientBuilder.build()
                    .get()
                    .uri(inventoryUrl + "/api/inventory/check?skuCode={sku}&quantity={qty}", skuCode, qty)
                    .retrieve()
                    .bodyToMono(Boolean.class)
                    .block();

            if (Boolean.FALSE.equals(inStock)) {
                throw new RuntimeException("Product out of stock: " + skuCode);
            }
        } catch (WebClientResponseException e) {
            log.error("Inventory service error for {}: {}", skuCode, e.getMessage());
            throw new RuntimeException("Unable to verify stock for: " + skuCode);
        }
    }

    private void processPayment(Order order, BigDecimal amount, String method) {
        try {
            PaymentResponse paymentRes = webClientBuilder.build()
                    .post()
                    .uri(paymentUrl + "/api/payments/process")
                    .bodyValue(new PaymentRequest(order.getOrderNumber(), amount, method))
                    .retrieve()
                    .bodyToMono(PaymentResponse.class)
                    .block();

            if (paymentRes != null && paymentRes.isSuccess()) {
                order.setStatus(Order.OrderStatus.CONFIRMED);
                order.setPaymentId(paymentRes.getPaymentId());
                log.info("Payment SUCCESS for order {}: paymentId={}", order.getOrderNumber(), paymentRes.getPaymentId());
            } else {
                order.setStatus(Order.OrderStatus.PAYMENT_FAILED);
                log.warn("Payment FAILED for order {}", order.getOrderNumber());
            }
        } catch (Exception e) {
            log.error("Payment service error for order {}: {}", order.getOrderNumber(), e.getMessage());
            order.setStatus(Order.OrderStatus.PAYMENT_FAILED);
        }
    }

    private void sendNotificationAsync(Order order) {
        try {
            webClientBuilder.build()
                    .post()
                    .uri(notificationUrl + "/api/notifications/send")
                    .bodyValue(new NotificationRequest(
                            order.getCustomerEmail(),
                            order.getOrderNumber(),
                            order.getStatus().name(),
                            order.getTotalAmount()))
                    .retrieve()
                    .bodyToMono(String.class)
                    .subscribe(
                            res  -> log.info("Notification sent for order {}", order.getOrderNumber()),
                            err  -> log.warn("Notification failed (non-critical): {}", err.getMessage())
                    );
        } catch (Exception e) {
            log.warn("Could not send notification: {}", e.getMessage());
        }
    }

    // ─────────────────────────────────────────────────────────
    // MAPPER
    // ─────────────────────────────────────────────────────────
    private OrderResponse toResponse(Order order) {
        List<OrderItemResponse> itemResponses = order.getItems().stream()
                .map(i -> OrderItemResponse.builder()
                        .id(i.getId())
                        .skuCode(i.getSkuCode())
                        .productName(i.getProductName())
                        .quantity(i.getQuantity())
                        .price(i.getPrice())
                        .subtotal(i.getPrice().multiply(BigDecimal.valueOf(i.getQuantity())))
                        .build())
                .collect(Collectors.toList());

        return OrderResponse.builder()
                .id(order.getId())
                .orderNumber(order.getOrderNumber())
                .customerEmail(order.getCustomerEmail())
                .status(order.getStatus().name())
                .totalAmount(order.getTotalAmount())
                .paymentId(order.getPaymentId())
                .paymentMethod(order.getPaymentMethod())
                .items(itemResponses)
                .createdAt(order.getCreatedAt())
                .updatedAt(order.getUpdatedAt())
                .build();
    }
}
