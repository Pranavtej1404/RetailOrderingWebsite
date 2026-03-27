package com.retail.app.config;

import com.retail.app.entity.Brand;
import com.retail.app.entity.Category;
import com.retail.app.entity.Product;
import com.retail.app.repository.BrandRepository;
import com.retail.app.repository.CategoryRepository;
import com.retail.app.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class DataSeeder implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final BrandRepository brandRepository;

    public DataSeeder(ProductRepository productRepository,
            CategoryRepository categoryRepository,
            BrandRepository brandRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.brandRepository = brandRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (categoryRepository.count() > 0) {
            return; // Data already seeded
        }

        // Seed Categories
        Category pizza = new Category();
        pizza.setName("Pizza");
        categoryRepository.save(pizza);

        Category drinks = new Category();
        drinks.setName("Cold Drinks");
        categoryRepository.save(drinks);

        Category breads = new Category();
        breads.setName("Breads");
        categoryRepository.save(breads);

        // Seed Brands
        Brand dominoes = new Brand();
        dominoes.setName("Dominoes");
        brandRepository.save(dominoes);

        Brand pizzaHut = new Brand();
        pizzaHut.setName("Pizza Hut");
        brandRepository.save(pizzaHut);

        Brand cocaCola = new Brand();
        cocaCola.setName("Coca Cola");
        brandRepository.save(cocaCola);

        Brand pepsi = new Brand();
        pepsi.setName("Pepsi");
        brandRepository.save(pepsi);

        Brand bakersDelight = new Brand();
        bakersDelight.setName("Bakers Delight");
        brandRepository.save(bakersDelight);

        // Seed Products
        Product p1 = new Product();
        p1.setName("Margherita Pizza");
        p1.setDescription("Classic cheese and tomato pizza with fresh basil.");
        p1.setPrice(new BigDecimal("299"));
        p1.setCategory(pizza);
        p1.setBrand(dominoes);
        p1.setStockQuantity(15);
        productRepository.save(p1);

        Product p2 = new Product();
        p2.setName("Pepperoni Feast");
        p2.setDescription("Double pepperoni with extra mozzarella cheese.");
        p2.setPrice(new BigDecimal("449"));
        p2.setCategory(pizza);
        p2.setBrand(pizzaHut);
        p2.setStockQuantity(8);
        productRepository.save(p2);

        Product p3 = new Product();
        p3.setName("Classic Coke");
        p3.setDescription("Refreshing 500ml Coca Cola bottle.");
        p3.setPrice(new BigDecimal("45"));
        p3.setCategory(drinks);
        p3.setBrand(cocaCola);
        p3.setStockQuantity(50);
        productRepository.save(p3);

        Product p4 = new Product();
        p4.setName("Garlic Bread");
        p4.setDescription("Toasted bread with buttery garlic and herbs.");
        p4.setPrice(new BigDecimal("129"));
        p4.setCategory(breads);
        p4.setBrand(bakersDelight);
        p4.setStockQuantity(20);
        productRepository.save(p4);

        Product p5 = new Product();
        p5.setName("Veggie Paradise");
        p5.setDescription("Loaded with olives, bell peppers, corn, and mushrooms.");
        p5.setPrice(new BigDecimal("399"));
        p5.setCategory(pizza);
        p5.setBrand(dominoes);
        p5.setStockQuantity(12);
        productRepository.save(p5);

        Product p6 = new Product();
        p6.setName("Pepsi Zero");
        p6.setDescription("Zero sugar Pepsi, 500ml.");
        p6.setPrice(new BigDecimal("40"));
        p6.setCategory(drinks);
        p6.setBrand(pepsi);
        p6.setStockQuantity(30);
        productRepository.save(p6);
    }
}
