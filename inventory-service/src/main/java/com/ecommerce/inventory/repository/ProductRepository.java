package com.ecommerce.inventory.repository;

import com.ecommerce.inventory.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findBySkuCode(String skuCode);

    List<Product> findByCategory(String category);

    List<Product> findByQuantityGreaterThan(int threshold);

    @Query("SELECT p FROM Product p WHERE p.quantity >= :qty AND p.skuCode = :sku")
    Optional<Product> findBySkuCodeAndSufficientStock(@Param("sku") String skuCode,
                                                       @Param("qty") int quantity);

    @Modifying
    @Query("UPDATE Product p SET p.quantity = p.quantity - :qty WHERE p.skuCode = :sku AND p.quantity >= :qty")
    int decrementStock(@Param("sku") String skuCode, @Param("qty") int quantity);
}
