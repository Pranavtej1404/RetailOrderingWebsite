package com.retail.app.controller;

import com.retail.app.dto.AddCartItemRequest;
import com.retail.app.dto.CartResponse;
import com.retail.app.dto.UpdateCartItemRequest;
import com.retail.app.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    /**
     * Get or create a cart.
     * Identification strategy: Use X-Cart-Id header. 
     * If missing or invalid, a new cart will be created and returned with its ID.
     */
    @GetMapping
    public ResponseEntity<CartResponse> getCart(@RequestHeader(value = "X-Cart-Id", required = false) String cartId) {
        return ResponseEntity.ok(cartService.getOrCreateCart(cartId));
    }

    /**
     * Add an item to the cart.
     */
    @PostMapping("/items")
    public ResponseEntity<CartResponse> addItem(
            @RequestHeader(value = "X-Cart-Id") String cartId,
            @RequestBody AddCartItemRequest request) {
        return ResponseEntity.ok(cartService.addToCart(cartId, request));
    }

    /**
     * Update an item's quantity in the cart.
     */
    @PutMapping("/items/{itemId}")
    public ResponseEntity<CartResponse> updateItem(
            @RequestHeader(value = "X-Cart-Id") String cartId,
            @PathVariable Long itemId,
            @RequestBody UpdateCartItemRequest request) {
        return ResponseEntity.ok(cartService.updateQuantity(cartId, itemId, request));
    }

    /**
     * Remove an item from the cart.
     */
    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<CartResponse> deleteItem(
            @RequestHeader(value = "X-Cart-Id") String cartId,
            @PathVariable Long itemId) {
        return ResponseEntity.ok(cartService.removeItem(cartId, itemId));
    }
}
