CREATE DATABASE bamazonDB;
USE  bamazonDB;

CREATE TABLE products (

item_id INT NOT NULL AUTO_INCREMENT;
product_name VARCHAR(50) NULL,
department_name VARCHAR(50) NULL,
price DECIMAL(10,2) NULL,
stock_quantity INT,
PRIMARY KEY (id)
);




