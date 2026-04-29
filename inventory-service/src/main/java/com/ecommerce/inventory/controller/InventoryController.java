package com.ecommerce.inventory.controller;

import com.ecommerce.inventory.dto.InventoryDtos.*;
import com.ecommerce.inventory.service.InventoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Inventory REST Controller
 *
 * @author Ganga Lova Raju
 */
@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class InventoryController {

    private final InventoryService inventoryService;

    /**
     * GET /api/inventory
     * Returns all products with current stock levels.
     */
    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAllProducts() {
        return ResponseEntity.ok(inventoryService.getAllProducts());
    }

    /**
     * GET /api/inventory/category/{category}
     * Filter products by category.
     */
    @GetMapping("/category/{category}")
    public ResponseEntity<List<ProductResponse>> getByCategory(@PathVariable String category) {
        return ResponseEntity.ok(inventoryService.getProductsByCategory(category));
    }

    /**
     * GET /api/inventory/check?skuCode=...&quantity=...
     * Stock availability check used by Order Service.
     */
    @GetMapping("/check")
    public ResponseEntity<Boolean> checkStock(
            @RequestParam String skuCode,
            @RequestParam(defaultValue = "1") int quantity) {
        StockCheckResponse result = inventoryService.checkStock(skuCode, quantity);
        log.info("Stock check: skuCode={} qty={} inStock={}", skuCode, quantity, result.isInStock());
        return ResponseEntity.ok(result.isInStock());
    }

    /**
     * GET /api/inventory/check/details?skuCode=...&quantity=...
     * Detailed stock check response.
     */
    @GetMapping("/check/details")
    public ResponseEntity<StockCheckResponse> checkStockDetails(
            @RequestParam String skuCode,
            @RequestParam(defaultValue = "1") int quantity) {
        return ResponseEntity.ok(inventoryService.checkStock(skuCode, quantity));
    }

    /**
     * POST /api/inventory/reserve
     * Reserve stock when order is confirmed (deducts from inventory).
     */
    @PostMapping("/reserve")
    public ResponseEntity<ApiResponse<Boolean>> reserveStock(
            @RequestParam String skuCode,
            @RequestParam int quantity) {
        boolean reserved = inventoryService.reserveStock(skuCode, quantity);
        return reserved
                ? ResponseEntity.ok(ApiResponse.success(true))
                : ResponseEntity.badRequest().body(ApiResponse.error("Insufficient stock for: " + skuCode));
    }
}
