package com.ecommerce.payment.service;

import com.ecommerce.payment.entity.Payment;
import com.ecommerce.payment.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Map;
import java.util.UUID;

/**
 * Payment Service — Simulates payment gateway processing.
 *
 * In production: replace simulation with Stripe/Razorpay SDK.
 * All transactions are persisted for full audit trail.
 *
 * @author Ganga Lova Raju
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentService {

    private final PaymentRepository paymentRepository;

    @Transactional
    public Map<String, Object> processPayment(String orderNumber, BigDecimal amount, String method) {
        log.info("Processing payment for order={} amount={} method={}", orderNumber, amount, method);

        String paymentId = "PAY-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        // Simulate 90% success rate — replace with real gateway call in production
        boolean success = Math.random() > 0.1;

        Payment payment = Payment.builder()
                .paymentId(paymentId)
                .orderNumber(orderNumber)
                .amount(amount)
                .paymentMethod(method)
                .status(success ? Payment.PaymentStatus.SUCCESS : Payment.PaymentStatus.FAILED)
                .failureReason(success ? null : "Card declined by gateway")
                .build();

        paymentRepository.save(payment);

        if (success) {
            log.info("Payment SUCCESS: paymentId={} order={}", paymentId, orderNumber);
            return Map.of(
                    "success", true,
                    "paymentId", paymentId,
                    "message", "Payment processed successfully via " + method
            );
        } else {
            log.warn("Payment FAILED: paymentId={} order={}", paymentId, orderNumber);
            return Map.of(
                    "success", false,
                    "paymentId", paymentId,
                    "message", "Payment declined by gateway"
            );
        }
    }
}
