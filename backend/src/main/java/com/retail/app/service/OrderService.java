package com.retail.app.service;

import com.retail.app.dto.OrderItemResponse;
import com.retail.app.dto.PlaceOrderRequest;
import com.retail.app.dto.OrderResponse;
import com.retail.app.entity.*;
import com.retail.app.exception.ConcurrentUpdateException;
import com.retail.app.exception.OutOfStockException;
import com.retail.app.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartService cartService;

    @Transactional
    public OrderResponse placeOrder(String cartIdStr, PlaceOrderRequest request, String username) {
        // 1. Fetch Cart
        Long cartId = Long.parseLong(cartIdStr);
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Cannot place order with empty cart");
        }

        // 3. Create Order
        Order order = new Order();

        // Use authenticated user if present, otherwise fallback to cart's user
        if (username != null) {
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            order.setUser(user);
        } else {
            order.setUser(cart.getUser());
        }

        // 2. Validate Stock and Deduct Atomically
        List<OrderItem> orderItems = new ArrayList<>();
        BigDecimal totalAmount = BigDecimal.ZERO;

        // Prepare OrderItem
        for (CartItem cartItem : cart.getItems()) {
            Product product = cartItem.getProduct();

            // Stock Validation
            if (product.getStockQuantity() < cartItem.getQuantity()) {
                throw new OutOfStockException("Insufficient stock for product: " + product.getName() +
                        ". Available: " + product.getStockQuantity() + ", Requested: " + cartItem.getQuantity());
            }

            // Deduct Stock
            product.setStockQuantity(product.getStockQuantity() - cartItem.getQuantity());
            try {
                productRepository.save(product);
            } catch (OptimisticLockingFailureException e) {
                throw new ConcurrentUpdateException(
                        "Concurrency conflict while updating stock for product: " + product.getName());
            }

            // Prepare OrderItem
            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(product);
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPriceAtOrder(product.getPrice());
            orderItems.add(orderItem);

            BigDecimal lineTotal = product.getPrice().multiply(new BigDecimal(cartItem.getQuantity()));
            totalAmount = totalAmount.add(lineTotal);
        }

        // 3. Finalize Order fields
        order.setCreatedAt(LocalDateTime.now());
        order.setStatus("PLACED");
        order.setTotalAmount(totalAmount);
        order.setDeliveryAddress(request.getDeliveryAddress());

        final Order savedOrder = orderRepository.save(order);

        // 4. Save Order Items
        for (OrderItem item : orderItems) {
            item.setOrder(savedOrder);
            orderItemRepository.save(item);
        }

        // 5. Clear Cart
        cartService.clearCart(cartIdStr);

        return mapToOrderResponse(savedOrder, orderItems);
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> getOrdersByUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found: " + username));

        List<Order> orders = orderRepository.findByUserOrderByCreatedAtDesc(user);

        return orders.stream()
                .map(order -> mapToOrderResponse(order, order.getItems()))
                .collect(Collectors.toList());
    }

    private OrderResponse mapToOrderResponse(Order order, List<OrderItem> items) {
        OrderResponse response = new OrderResponse();
        response.setOrderId(order.getId());
        response.setStatus(order.getStatus());
        response.setTotalAmount(order.getTotalAmount());
        response.setAddress(order.getDeliveryAddress());
        response.setOrderDate(order.getCreatedAt());

        List<OrderItemResponse> itemResponses = items.stream().map(item -> {
            OrderItemResponse ir = new OrderItemResponse();
            ir.setProductId(item.getProduct().getId());
            ir.setProductName(item.getProduct().getName());
            ir.setQuantity(item.getQuantity());
            ir.setPriceAtOrder(item.getPriceAtOrder());
            return ir;
        }).collect(Collectors.toList());

        response.setItems(itemResponses);
        return response;
    }
}
