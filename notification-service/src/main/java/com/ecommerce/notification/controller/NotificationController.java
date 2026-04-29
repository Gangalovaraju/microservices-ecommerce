package com.ecommerce.notification.controller;

import com.ecommerce.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;

/**
 * Notification REST Controller
 *
 * @author Ganga Lova Raju
 */
@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class NotificationController {

    private final NotificationService notificationService;

    /** POST /api/notifications/send */
    @PostMapping("/send")
    public ResponseEntity<Map<String, String>> sendNotification(@RequestBody Map<String, Object> request) {
        String email       = (String) request.get("email");
        String orderNumber = (String) request.get("orderNumber");
        String status      = (String) request.get("status");
        BigDecimal amount  = new BigDecimal(request.get("amount").toString());

        notificationService.sendOrderNotification(email, orderNumber, status, amount);
        return ResponseEntity.ok(Map.of("message", "Notification queued for: " + email));
    }
}
