CREATE TABLE IF NOT EXISTS Products(
    ProductID SERIAL PRIMARY KEY,
    ProductName VARCHAR(255) NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    DESCRIPTION TEXT,
    IMAGE_URL VARCHAR(255)
);

INSERT INTO Products (ProductName, Price, DESCRIPTION, IMAGE_URL) VALUES 

('Jeans',500 , 'Comfortable Blue Denim Jeans', '/Assets/jeans.jpg'),
('Shirt', 300 , 'Stylish Button-Down Shirt', '/Assets/shirt.png'),
('Jacket', 800 , 'Warm Winter Jacket', '/Assets/jacket.jpeg'),
('laptop', 1500 , 'High-Performance Laptop', '/Assets/laptop.jpeg'),
('Cap', 50 , 'Trendy Baseball Cap', '/Assets/cap.jpg');



CREATE TABLE IF NOT EXISTS Cart(
    ProductID INT
);


CREATE TABLE IF NOT EXISTS USERS(
    USERID SERIAL PRIMARY KEY,
    USERNAME VARCHAR(100) UNIQUE NOT NULL,
    PASSWORD TEXT NOT NULL
)

  INSERT INTO USERS(USERNAME, PASSWORD) VALUES
  ('shahzaib','$2b$10$/RPb.1iwtvsCkKW0/nGRQumaZZs3YlGB8oONzZWCbu9zhbWRvK/FO');


SELECT * from cart;