package com.ecommerce.payment.controller;

import com.ecommerce.payment.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;

/**
 * Payment REST Controller
 *
 * @author Ganga Lova Raju
 */
@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PaymentController {

    private final PaymentService paymentService;

    /** POST /api/payments/process — Process a payment for an order */
    @PostMapping("/process")
    public ResponseEntity<Map<String, Object>> processPayment(@RequestBody Map<String, Object> request) {
        String orderNumber = (String) request.get("orderNumber");
        BigDecimal amount = new BigDecimal(request.get("amount").toString());
        String method = (String) request.getOrDefault("paymentMethod", "CARD");
        return ResponseEntity.ok(paymentService.processPayment(orderNumber, amount, method));
    }
}
