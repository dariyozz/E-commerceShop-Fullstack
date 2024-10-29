package org.ecommerce.ecommeerceshop.services;

import lombok.RequiredArgsConstructor;
import org.ecommerce.ecommeerceshop.exceptions.ResourceNotFoundException;
import org.ecommerce.ecommeerceshop.models.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.ecommerce.ecommeerceshop.repositories.CustomerRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    public Customer getCustomerByEmail(String email) {
        return customerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    public Customer saveCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer getCustomerById(Long id) {
        return customerRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Customer not found"));
    }

    public void deleteCustomer(Long id) {
        Optional<Customer> customer = customerRepository.findById(id);
        if (customer.isPresent()) return;
        customerRepository.deleteById(id);
    }
}
