package com.ecommerce.inventory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Inventory Service — MicroCommerce Platform
 *
 * Manages product catalog and real-time stock levels.
 * Exposes REST APIs consumed by Order Service for stock validation.
 *
 * @author Ganga Lova Raju
 * @see <a href="https://github.com/Gangalovaraju">GitHub</a>
 * @see <a href="https://www.linkedin.com/in/gangalovaraju/">LinkedIn</a>
 */
@SpringBootApplication
public class InventoryServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(InventoryServiceApplication.class, args);
    }
}
