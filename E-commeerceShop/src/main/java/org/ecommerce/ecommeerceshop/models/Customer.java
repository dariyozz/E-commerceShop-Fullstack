package org.ecommerce.ecommeerceshop.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "customers")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "First name is required")
    @Size(max = 255, message = "First name should not exceed 255 characters")
    private String firstName;

    @NotNull(message = "Last name is required")
    @Size(max = 255, message = "Last name should not exceed 255 characters")
    private String lastName;

    @Email(message = "Email should be valid")
    @NotNull(message = "Email is required")
    @Column(nullable = false, unique = true)
    private String email;

    @NotNull(message = "Address is required")
    private String address;

    @NotNull(message = "City is required")
    private String city;

    @NotNull(message = "Country is required")
    private String country;

    @NotNull(message = "Postal code is required")
    private String postalCode;

    @Pattern(regexp = "^\\+?[0-9. ()-]{7,25}$", message = "Phone number is invalid")
    private String phoneNumber;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Order> orders;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
