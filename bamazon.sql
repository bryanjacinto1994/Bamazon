DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(

    id INT AUTO_INCREMENT NOT NULL,
    item_name VARCHAR(30) NULL,
    department_name VARCHAR(30) NULL,
    price INT NULL,
    stock_quantity INT(100) NULL,


)