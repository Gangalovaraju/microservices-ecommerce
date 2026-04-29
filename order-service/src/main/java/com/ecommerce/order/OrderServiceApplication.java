package com.ecommerce.order;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.function.client.WebClient;

/**
 * Order Service — MicroCommerce Platform
 *
 * Orchestrates the complete order lifecycle:
 * stock check → order creation → payment → notification.
 *
 * @author Ganga Lova Raju
 * @see <a href="https://github.com/Gangalovaraju">GitHub</a>
 * @see <a href="https://www.linkedin.com/in/gangalovaraju/">LinkedIn</a>
 */
@SpringBootApplication
public class OrderServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(OrderServiceApplication.class, args);
    }

    @Bean
    public WebClient.Builder webClientBuilder() {
        return WebClient.builder();
    }
}
