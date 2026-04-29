package com.ecommerce.notification;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Notification Service — MicroCommerce Platform
 *
 * Handles async email/event notifications for order lifecycle events.
 * Production-ready: integrate with AWS SES, SendGrid, or Kafka.
 *
 * @author Ganga Lova Raju
 * @see <a href="https://github.com/Gangalovaraju">GitHub</a>
 * @see <a href="https://www.linkedin.com/in/gangalovaraju/">LinkedIn</a>
 */
@SpringBootApplication
public class NotificationServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(NotificationServiceApplication.class, args);
    }
}
