package com.retail.app.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller strictly for verifying security role enforcement in Sprint 2.
 */
@RestController
@RequestMapping("/api")
public class SecurityTestController {

    @GetMapping("/test/user")
    public String userAccess() {
        return "User Access Granted";
    }

    @GetMapping("/admin/test")
    public String adminAccess() {
        return "Admin Access Granted";
    }

    @GetMapping("/cart/test")
    public String cartAccess() {
        return "Cart Access (Public) Granted";
    }
}
