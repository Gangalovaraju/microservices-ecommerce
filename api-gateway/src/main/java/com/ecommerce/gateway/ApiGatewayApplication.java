package com.ecommerce.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * API Gateway — MicroCommerce Platform
 *
 * Single entry point for all microservices.
 * Handles CORS, routing, and request header enrichment.
 *
 * Routes:
 *   /api/orders/**        → order-service:8081
 *   /api/inventory/**     → inventory-service:8082
 *   /api/payments/**      → payment-service:8083
 *   /api/notifications/** → notification-service:8084
 *
 * @author Ganga Lova Raju
 * @see <a href="https://github.com/Gangalovaraju">GitHub</a>
 * @see <a href="https://www.linkedin.com/in/gangalovaraju/">LinkedIn</a>
 */
@SpringBootApplication
public class ApiGatewayApplication {
    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayApplication.class, args);
    }
}
