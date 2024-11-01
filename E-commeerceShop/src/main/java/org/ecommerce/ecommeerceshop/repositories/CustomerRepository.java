package org.ecommerce.ecommeerceshop.repositories;

import org.ecommerce.ecommeerceshop.models.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer,Long> {
    Optional<Customer> findByEmail(String email);
}
