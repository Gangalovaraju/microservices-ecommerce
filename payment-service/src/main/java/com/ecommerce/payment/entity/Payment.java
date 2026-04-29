package com.ecommerce.payment.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments", indexes = {
    @Index(name = "idx_payments_payment_id",   columnList = "payment_id", unique = true),
    @Index(name = "idx_payments_order_number", columnList = "order_number"),
    @Index(name = "idx_payments_status",       columnList = "status")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "payment_id", nullable = false, unique = true, length = 50)
    private String paymentId;

    @Column(name = "order_number", nullable = false, length = 30)
    private String orderNumber;

    @Column(name = "amount", nullable = false, precision = 12, scale = 2)
    private BigDecimal amount;

    @Column(name = "payment_method", nullable = false, length = 30)
    private String paymentMethod;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private PaymentStatus status;

    @Column(name = "failure_reason", length = 255)
    private String failureReason;

    @Column(name = "processed_at", updatable = false)
    private LocalDateTime processedAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.processedAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public enum PaymentStatus { PENDING, SUCCESS, FAILED, REFUNDED }
}
