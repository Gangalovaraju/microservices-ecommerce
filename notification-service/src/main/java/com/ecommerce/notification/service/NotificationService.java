package com.ecommerce.notification.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * Notification Service
 *
 * Currently logs structured notification events.
 * Production integration: AWS SES / SendGrid / JavaMailSender.
 *
 * @author Ganga Lova Raju
 */
@Service
@Slf4j
public class NotificationService {

    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public void sendOrderNotification(String email, String orderNumber, String status, BigDecimal amount) {
        String timestamp = LocalDateTime.now().format(FORMATTER);

        log.info("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        log.info("📧 ORDER NOTIFICATION — {}", timestamp);
        log.info("   To      : {}", email);
        log.info("   Subject : Order {} — {}", orderNumber, getStatusMessage(status));
        log.info("   Amount  : ${}", amount);
        log.info("   Body    : {}", buildEmailBody(email, orderNumber, status, amount));
        log.info("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

        // TODO: Integrate real email provider
        // Example with SendGrid:
        // sendGridClient.send(Mail.build().to(email).subject(subject).body(body));
    }

    private String getStatusMessage(String status) {
        return switch (status) {
            case "CONFIRMED"      -> "Confirmed ✅";
            case "PAYMENT_FAILED" -> "Payment Failed ❌";
            case "SHIPPED"        -> "Shipped 🚚";
            case "DELIVERED"      -> "Delivered 🎉";
            case "CANCELLED"      -> "Cancelled ❌";
            default               -> status;
        };
    }

    private String buildEmailBody(String email, String orderNumber, String status, BigDecimal amount) {
        return String.format(
                "Dear Customer, your order %s has been %s. " +
                "Total amount: $%.2f. Thank you for shopping with MicroCommerce!",
                orderNumber, status.toLowerCase(), amount
        );
    }
}
