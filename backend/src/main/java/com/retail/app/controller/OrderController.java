package com.retail.app.controller;

import com.retail.app.dto.PlaceOrderRequest;
import com.retail.app.dto.OrderResponse;
import com.retail.app.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponse> placeOrder(
            @RequestHeader("X-Cart-Id") String cartId,
            @RequestBody PlaceOrderRequest request,
            java.security.Principal principal) {
        String username = principal != null ? principal.getName() : null;
        return ResponseEntity.ok(orderService.placeOrder(cartId, request, username));
    }

    @GetMapping
    public ResponseEntity<java.util.List<OrderResponse>> getMyOrders(java.security.Principal principal) {
        return ResponseEntity.ok(orderService.getOrdersByUser(principal.getName()));
    }
}
