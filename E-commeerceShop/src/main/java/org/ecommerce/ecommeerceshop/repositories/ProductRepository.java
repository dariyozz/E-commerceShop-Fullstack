package org.ecommerce.ecommeerceshop.repositories;

import org.ecommerce.ecommeerceshop.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product,Long> {
    List<Product> findByCategoryId(Long categoryId);

    List<Product> findByNameContainingIgnoreCase(String query);
    List<Product> findByDescriptionContainingIgnoreCase(String query);


}
