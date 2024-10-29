package org.ecommerce.ecommeerceshop.services;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.ecommerce.ecommeerceshop.exceptions.ResourceNotFoundException;
import org.ecommerce.ecommeerceshop.models.Product;
import org.ecommerce.ecommeerceshop.repositories.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductService {
    private final ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) throws ResourceNotFoundException {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
    }

    public List<Product> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) throws ResourceNotFoundException {
        Product product = getProductById(id);
        productRepository.delete(product);
    }

    public void updateStock(Long productId, int quantitySold) throws ResourceNotFoundException {
        Product product = getProductById(productId);
        int newStock = product.getStockQuantity() - quantitySold;
        if (newStock < 0) {
            throw new IllegalStateException("Insufficient stock for product: " + product.getName());
        }
        product.setStockQuantity(newStock);
        productRepository.save(product);
    }

    public List<Product> searchProducts(String query) {
        List<Product> productsNameContaining = productRepository.findByNameContainingIgnoreCase(query);
        if (!productsNameContaining.isEmpty()) {
            return productsNameContaining;
        }
        return productRepository.findByDescriptionContainingIgnoreCase(query);
    }

}
