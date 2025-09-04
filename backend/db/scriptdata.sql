--------------------------------------------------
-- SAMPLE DATA INSERTION
--------------------------------------------------

-- Insert sample users
INSERT INTO users (name, email, password, address)
VALUES
('Alice Johnson', 'alice@example.com', 'hashedpassword1', '123 Main St'),
('Bob Smith', 'bob@example.com', 'hashedpassword2', '456 Park Ave'),
('Charlie Brown', 'charlie@example.com', 'hashedpassword3', '789 Elm St'),
('Diana Prince', 'diana@example.com', 'hashedpassword4', '321 Oak St'),
('Ethan Hunt', 'ethan@example.com', 'hashedpassword5', '654 Pine St');

-- Insert sample products
INSERT INTO products (name, description, price, stock)
VALUES
('Smartphone', 'Latest 5G smartphone with 128GB storage', 699.99, 50),
('Laptop', 'Powerful laptop with 16GB RAM and 512GB SSD', 1199.99, 30),
('Wireless Headphones', 'Noise-cancelling headphones with Bluetooth 5.0', 199.99, 100),
('Smartwatch', 'Fitness tracking smartwatch with GPS', 249.99, 70),
('Gaming Console', 'Next-gen gaming console with 1TB storage', 499.99, 20);

-- Insert sample orders
INSERT INTO orders (user_id, total_amount, status)
VALUES
(1, 699.99, 'completed'),
(2, 1199.99, 'pending'),
(3, 449.98, 'completed'),
(4, 499.99, 'cancelled'),
(5, 249.99, 'completed');

-- Insert sample order items
INSERT INTO order_items (order_id, product_id, quantity, price)
VALUES
(1, 1, 1, 699.99),  -- Alice bought Smartphone
(2, 2, 1, 1199.99), -- Bob bought Laptop
(3, 3, 2, 199.99),  -- Charlie bought 2 Wireless Headphones
(4, 5, 1, 499.99),  -- Diana tried to buy Gaming Console
(5, 4, 1, 249.99);  -- Ethan bought Smartwatch

-- Insert sample payments
INSERT INTO payments (order_id, amount, method, status)
VALUES
(1, 699.99, 'credit_card', 'completed'),
(2, 1199.99, 'paypal', 'pending'),
(3, 449.98, 'debit_card', 'completed'),
(4, 499.99, 'credit_card', 'failed'),
(5, 249.99, 'cash_on_delivery', 'completed');