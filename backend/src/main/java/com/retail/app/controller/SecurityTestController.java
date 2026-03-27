package com.retail.app.controller;

import com.retail.app.security.SecurityUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * Controller strictly for verifying security role enforcement in Sprint 3.
 */
@RestController
@RequestMapping("/api")
public class SecurityTestController {

    @GetMapping("/test/user")
    public String userAccess() {
        return "User Access Granted";
    }

    @GetMapping("/test/identity")
    public Map<String, Object> identityAccess() {
        Map<String, Object> response = new HashMap<>();
        response.put("userId", SecurityUtils.getCurrentUserId());
        response.put("email", SecurityUtils.getCurrentUserEmail());
        response.put("username", SecurityUtils.getCurrentUser() != null ? SecurityUtils.getCurrentUser().getUsername() : null);
        return response;
    }

    @GetMapping("/admin/test")
    public String adminAccess() {
        return "Admin Access Granted";
    }

    @GetMapping("/cart/test")
    public String cartAccess() {
        return "Cart Access (Public) Granted";
    }
    
    @GetMapping("/orders/test")
    public String orderAccess() {
        return "Order Access (Protected) Granted";
    }
}
