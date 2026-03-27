package com.retail.app.service;

import com.retail.app.dto.ProductRequest;
import com.retail.app.entity.Brand;
import com.retail.app.entity.Category;
import com.retail.app.entity.Product;
import com.retail.app.repository.BrandRepository;
import com.retail.app.repository.CategoryRepository;
import com.retail.app.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final BrandRepository brandRepository;

    public ProductService(ProductRepository productRepository, 
                          CategoryRepository categoryRepository, 
                          BrandRepository brandRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.brandRepository = brandRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    @Transactional
    public Product createProduct(ProductRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
        
        Brand brand = brandRepository.findById(request.getBrandId())
                .orElseThrow(() -> new RuntimeException("Brand not found"));

        Product product = new Product();
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setCategory(category);
        product.setBrand(brand);
        product.setImageUrl(request.getImageUrl());
        product.setStockQuantity(request.getStockQuantity());

        return productRepository.save(product);
    }
    
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
}
