package org.ecommerce.ecommeerceshop.repositories;

import org.ecommerce.ecommeerceshop.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Long> {
    List<Order> findByCustomerId(Long customerId);
}
