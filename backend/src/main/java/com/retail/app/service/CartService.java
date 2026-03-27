package com.retail.app.service;

import com.retail.app.dto.*;
import com.retail.app.entity.Cart;
import com.retail.app.entity.CartItem;
import com.retail.app.entity.Product;
import com.retail.app.repository.CartItemRepository;
import com.retail.app.repository.CartRepository;
import com.retail.app.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public CartResponse getOrCreateCart(String cartIdStr) {
        Cart cart;
        if (cartIdStr == null || cartIdStr.isEmpty() || cartIdStr.equals("new")) {
            cart = new Cart();
            cart = cartRepository.save(cart);
        } else {
            try {
                Long cartId = Long.parseLong(cartIdStr);
                cart = cartRepository.findById(cartId)
                        .orElseGet(() -> cartRepository.save(new Cart()));
            } catch (NumberFormatException e) {
                // If cartId is not a number, create a new one for simplicity
                cart = new Cart();
                cart = cartRepository.save(cart);
            }
        }
        return mapToCartResponse(cart);
    }

    @Transactional
    public CartResponse addToCart(String cartIdStr, AddCartItemRequest request) {
        Cart cart = getCartEntity(cartIdStr);
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (request.getQuantity() <= 0) {
            throw new RuntimeException("Quantity must be greater than 0");
        }

        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(request.getProductId()))
                .findFirst();

        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + request.getQuantity());
        } else {
            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setProduct(product);
            newItem.setQuantity(request.getQuantity());
            cart.getItems().add(newItem);
        }

        cart = cartRepository.save(cart);
        return mapToCartResponse(cart);
    }

    @Transactional
    public CartResponse updateQuantity(String cartIdStr, Long itemId, UpdateCartItemRequest request) {
        Cart cart = getCartEntity(cartIdStr);
        CartItem item = cart.getItems().stream()
                .filter(i -> i.getId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        if (request.getQuantity() <= 0) {
            cart.getItems().remove(item);
        } else {
            item.setQuantity(request.getQuantity());
        }

        cart = cartRepository.save(cart);
        return mapToCartResponse(cart);
    }

    @Transactional
    public CartResponse removeItem(String cartIdStr, Long itemId) {
        Cart cart = getCartEntity(cartIdStr);
        cart.getItems().removeIf(item -> item.getId().equals(itemId));
        cart = cartRepository.save(cart);
        return mapToCartResponse(cart);
    }

    @Transactional
    public void clearCart(String cartIdStr) {
        Cart cart = getCartEntity(cartIdStr);
        cart.getItems().clear();
        cartRepository.save(cart);
    }

    private Cart getCartEntity(String cartIdStr) {
        if (cartIdStr == null || cartIdStr.isEmpty()) {
            throw new RuntimeException("Cart ID is required");
        }
        try {
            Long cartId = Long.parseLong(cartIdStr);
            return cartRepository.findById(cartId)
                    .orElseThrow(() -> new RuntimeException("Cart not found"));
        } catch (NumberFormatException e) {
            throw new RuntimeException("Invalid Cart ID format");
        }
    }

    private CartResponse mapToCartResponse(Cart cart) {
        CartResponse response = new CartResponse();
        response.setCartId(cart.getId().toString());
        
        List<CartItemResponse> itemResponses = cart.getItems().stream()
                .map(this::mapToCartItemResponse)
                .collect(Collectors.toList());
        
        response.setItems(itemResponses);
        
        int totalItems = itemResponses.stream()
                .mapToInt(CartItemResponse::getQuantity)
                .sum();
        response.setTotalItems(totalItems);
        
        BigDecimal subtotal = itemResponses.stream()
                .map(CartItemResponse::getLineTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        response.setSubtotal(subtotal);
        
        return response;
    }

    private CartItemResponse mapToCartItemResponse(CartItem item) {
        CartItemResponse response = new CartItemResponse();
        response.setItemId(item.getId());
        response.setProductId(item.getProduct().getId());
        response.setProductName(item.getProduct().getName());
        response.setPrice(item.getProduct().getPrice());
        response.setQuantity(item.getQuantity());
        response.setLineTotal(item.getProduct().getPrice().multiply(new BigDecimal(item.getQuantity())));
        return response;
    }
}
