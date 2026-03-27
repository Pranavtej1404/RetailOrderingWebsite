package com.retail.app.security;

import com.retail.app.entity.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

/**
 * Utility class for extracting current authenticated user details.
 */
@Component
public class SecurityUtils {

    /**
     * Retrieves the current authenticated User entity.
     * @return User object or null if not authenticated
     */
    public static User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }

        Object principal = authentication.getPrincipal();
        if (principal instanceof User) {
            return (User) principal;
        }
        return null;
    }

    /**
     * Retrieves the current authenticated user's ID.
     * @return Long ID or null if not authenticated
     */
    public static Long getCurrentUserId() {
        User user = getCurrentUser();
        return user != null ? user.getId() : null;
    }

    /**
     * Retrieves the current authenticated user's email.
     * @return String email or null if not authenticated
     */
    public static String getCurrentUserEmail() {
        User user = getCurrentUser();
        return user != null ? user.getEmail() : null;
    }
}
