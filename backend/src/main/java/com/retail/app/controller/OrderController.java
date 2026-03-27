package com.retail.app.controller;

import com.retail.app.dto.OrderDetailResponse;
import com.retail.app.dto.OrderResponse;
import com.retail.app.dto.PlaceOrderRequest;
import com.retail.app.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*") // For development purposes
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<OrderResponse> placeOrder(@Valid @RequestBody PlaceOrderRequest request) {
        return ResponseEntity.ok(orderService.placeOrder(request));
    }

    @GetMapping
    public ResponseEntity<List<OrderResponse>> getOrderHistory() {
        return ResponseEntity.ok(orderService.getUserOrderHistory());
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDetailResponse> getOrderDetails(@PathVariable Long orderId) {
        try {
            return ResponseEntity.ok(orderService.getOrderDetails(orderId));
        } catch (RuntimeException e) {
            if (e.getMessage().contains("Access denied") || e.getMessage().contains("Order not found")) {
                return ResponseEntity.status(403).build(); // Return 403 or 404
            }
            throw e;
        }
    }
}
