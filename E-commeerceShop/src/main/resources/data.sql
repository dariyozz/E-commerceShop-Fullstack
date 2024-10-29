# -- Inserting Categories
# INSERT INTO categories (id, name, description)
# VALUES (1, 'Electronics', 'All kinds of electronic gadgets and devices.'),
#        (2, 'Clothing', 'Stylish and comfortable clothing for men and women.'),
#        (3, 'Books', 'Books from all genres and authors.');
#
# -- Inserting Customers
# INSERT INTO customers (id, first_name, last_name, email, address, city, country, postal_code, phone_number, created_at)
# VALUES (1, 'John', 'Doe', 'john.doe@example.com', '123 Main St', 'Los Angeles', 'USA', '90001', '+123456789', NOW()),
#        (2, 'Jane', 'Smith', 'jane.smith@example.com', '456 Elm St', 'New York', 'USA', '10001', '+987654321', NOW());
#
# -- Inserting Products
# INSERT INTO products (id, name, description, price, stock_quantity, category_id, image_url, created_at, updated_at)
# VALUES (1, 'Smartphone', 'Latest model smartphone with advanced features.', 699.99, 50, 1,
#         'https://example.com/smartphone.jpg', NOW(), NOW()),
#        (2, 'Laptop', 'High-performance laptop for gaming and productivity.', 1299.99, 30, 1,
#         'https://example.com/laptop.jpg', NOW(), NOW()),
#        (3, 'T-shirt', 'Comfortable cotton T-shirt.', 19.99, 100, 2, 'https://example.com/tshirt.jpg', NOW(), NOW()),
#        (4, 'Novel Book', 'Best-selling novel by a popular author.', 9.99, 200, 3, 'https://example.com/novel.jpg',
#         NOW(), NOW());
#
# -- Inserting Orders
# INSERT INTO orders (id, customer_id, total_price, status, created_at, updated_at)
# VALUES (1, 1, 709.98, 'COMPLETED', NOW(), NOW()),
#        (2, 2, 1299.99, 'PENDING', NOW(), NOW());
#
# -- Inserting OrderItems
# INSERT INTO order_items (id, product_id, quantity, unit_price, total_price, order_id)
# VALUES (1, 1, 1, 699.99, 699.99, 1),
#        (2, 3, 5, 19.99, 99.95, 1),
#        (3, 2, 1, 1299.99, 1299.99, 2);
#
