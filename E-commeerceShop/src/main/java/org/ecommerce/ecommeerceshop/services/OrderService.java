package org.ecommerce.ecommeerceshop.services;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.ecommerce.ecommeerceshop.exceptions.ResourceNotFoundException;
import org.ecommerce.ecommeerceshop.models.Order;
import org.ecommerce.ecommeerceshop.models.OrderItem;
import org.ecommerce.ecommeerceshop.models.OrderStatus;
import org.ecommerce.ecommeerceshop.models.Product;
import org.ecommerce.ecommeerceshop.repositories.OrderRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {
    private final OrderRepository orderRepository;
    private final ProductService productService;

    public List<Order> getOrdersByCustomer(Long customerId) {
        return orderRepository.findByCustomerId(customerId);
    }

    public Order placeOrder(Order order) throws ResourceNotFoundException {
        validateOrderItems(order.getOrderItems());
        BigDecimal totalPrice = calculateTotalPrice(order.getOrderItems());
        order.setTotalPrice(totalPrice);
        order.setStatus(OrderStatus.PENDING);

        for (OrderItem item : order.getOrderItems()) {
            productService.updateStock(item.getProduct().getId(), item.getQuantity());
        }

        return orderRepository.save(order);
    }

    private void validateOrderItems(List<OrderItem> orderItems) throws ResourceNotFoundException {
        for (OrderItem item : orderItems) {
            Product product = productService.getProductById(item.getProduct().getId());
            if (product.getStockQuantity() < item.getQuantity()) {
                throw new IllegalArgumentException("Insufficient stock for product: " + product.getName());
            }
        }
    }

    private BigDecimal calculateTotalPrice(List<OrderItem> orderItems) {
        return orderItems.stream()
                .map(item -> item.getUnitPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Order not found!"));
    }

    public void cancelOrder(Long id) {
        Optional<Order> order = orderRepository.findById(id);
        order.ifPresent(value -> value.setStatus(OrderStatus.CANCELLED));
    }
}
