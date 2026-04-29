package com.ecommerce.order.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "order_items", indexes = {
    @Index(name = "idx_order_items_order_id",  columnList = "order_id"),
    @Index(name = "idx_order_items_sku_code",  columnList = "sku_code")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    @ToString.Exclude
    private Order order;

    @Column(name = "sku_code", nullable = false, length = 50)
    private String skuCode;

    @Column(name = "product_name", nullable = false, length = 200)
    private String productName;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "price", nullable = false, precision = 10, scale = 2)
    private BigDecimal price;
}
