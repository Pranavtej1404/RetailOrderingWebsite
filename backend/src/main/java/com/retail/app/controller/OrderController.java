package com.retail.app.controller;

import com.retail.app.dto.OrderRequest;
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
            @RequestBody OrderRequest request) {
        return ResponseEntity.ok(orderService.placeOrder(cartId, request));
    }
}
