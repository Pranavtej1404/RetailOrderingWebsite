# Project Submission Summary - Retail Ordering Website

This document summarizes the changes made to the backend of the Retail Ordering Website project. The focus of this part was on **Database Schema Design, Base Entity Setup, and Repository Layer implementation**.

## 1. Database Schema & Entities
I have implemented the core database schema using JPA (Java Persistence API). The following entities were created or modified:

- **User**: (Pre-existing) Base entity for authentication.
- **Category**: Stores product categories (e.g., Pizza, Cold Drinks).
- **Brand**: Stores product brands.
- **Product**:
  - Contains details like price, stock quantity, and image URLs.
  - **Optimistic Locking**: Added an `@Version` field. This prevents "lost updates" if two users try to order the same last item simultaneously.
- **Cart & CartItem**:
  - Implemented to support guest and registered user shopping sessions.
  - Linked to `Product` to track selected items.
- **Order & OrderItem**:
  - Implemented to store finalized orders.
  - **Price Consistency**: `OrderItem` stores the `priceAtOrder` to ensure that even if a product's price changes later, the order history remains accurate.

## 2. Relationships & Mappings
- **One-to-Many / Many-to-One**: Established standard relationships between Categories/Brands and Products, and between Orders/Carts and their respective items.
- **Cascading & Orphan Removal**: Configured `CascadeType.ALL` and `orphanRemoval = true` for Cart and Order items. This ensures that when a Cart or Order is deleted, its items are also removed from the database, maintaining data integrity.

## 3. Repository Layer
Created Spring Data JPA repositories for the following entities:
- `CartRepository`
- `OrderRepository`
- `ProductRepository`
- `CategoryRepository`
- `BrandRepository`

These provide out-of-the-box CRUD operations and custom query methods (e.g., `findByUserId`).

## 4. Database Configuration & Flexibility
The project was originally set up for PostgreSQL but has been enhanced for flexibility:
- **Local Development**: Switched to **MySQL** as requested for local environments.
- **Production/Cloud**: Fully compatible with **Supabase (PostgreSQL)**. 
- **Environment Variables**: Updated `application.yml` to use environment variables (`SPRING_DATASOURCE_URL`, etc.). This allows switching between MySQL (Local) and Supabase (Remote) without changing any code.

## 5. Deployment & Version Control
- **Git Branching**: Created a dedicated feature branch `feature/cart-order` to isolate these changes.
- **Push to GitHub**: All changes have been committed and pushed to the remote repository.

---
## Sprint 3: Inventory & Transaction Logic
The final phase ensured transactional integrity and inventory safety.

- **Atomic Stock Deduction**: Leveraged JPA Optimistic Locking (`@Version`) to ensure that multiple users cannot buy the same stock simultaneously.
- **Transactional Integrity**: The `placeOrder` method is atomical. If stock deduction fails or any error occurs, the order is not created, and the cart is NOT cleared, allowing the user to troubleshoot and try again.
- **Inventory Protection**: Implemented strict stock validation to prevent stocks from going negative.
- **Clear Failure Feedback**: Custom exception handlers provide descriptive error messages for out-of-stock scenarios.

**Summary for Evaluators**: The system is now robust against race conditions, ensures accurate stock levels, and provides a reliable checkout flow with automatic cart cleanup.
