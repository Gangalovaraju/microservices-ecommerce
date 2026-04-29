package com.ecommerce.payment;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Payment Service — MicroCommerce Platform
 *
 * Simulates payment gateway (replace with Stripe/Razorpay in production).
 * Persists all payment records with full audit trail.
 *
 * @author Ganga Lova Raju
 * @see <a href="https://github.com/Gangalovaraju">GitHub</a>
 * @see <a href="https://www.linkedin.com/in/gangalovaraju/">LinkedIn</a>
 */
@SpringBootApplication
public class PaymentServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(PaymentServiceApplication.class, args);
    }
}
