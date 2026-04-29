package com.ecommerce.order.controller;

import com.ecommerce.order.dto.OrderDtos.*;
import com.ecommerce.order.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Order REST Controller
 *
 * @author Ganga Lova Raju
 * @see <a href="https://github.com/Gangalovaraju">GitHub</a>
 */
@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderService orderService;

    /** POST /api/orders — Place a new order */
    @PostMapping
    public ResponseEntity<OrderResponse> placeOrder(@Valid @RequestBody PlaceOrderRequest request) {
        log.info("Received order request from: {}", request.getCustomerEmail());
        OrderResponse response = orderService.placeOrder(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /** GET /api/orders/customer/{email} — Get orders by customer email */
    @GetMapping("/customer/{email}")
    public ResponseEntity<List<OrderResponse>> getOrdersByEmail(@PathVariable String email) {
        return ResponseEntity.ok(orderService.getOrdersByEmail(email));
    }

    /** GET /api/orders/{orderNumber} — Get single order by order number */
    @GetMapping("/{orderNumber}")
    public ResponseEntity<OrderResponse> getOrder(@PathVariable String orderNumber) {
        return ResponseEntity.ok(orderService.getOrderByNumber(orderNumber));
    }

    /** GET /api/orders — Get all orders (admin) */
    @GetMapping
    public ResponseEntity<List<OrderResponse>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }
}
