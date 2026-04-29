package com.ecommerce.order.repository;

import com.ecommerce.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {

    Optional<Order> findByOrderNumber(String orderNumber);

    List<Order> findByCustomerEmailOrderByCreatedAtDesc(String email);

    @Query("SELECT o FROM Order o WHERE o.customerEmail = :email ORDER BY o.createdAt DESC")
    List<Order> findByCustomerEmail(@Param("email") String email);

    List<Order> findByStatusOrderByCreatedAtDesc(Order.OrderStatus status);
}
