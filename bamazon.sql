DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(

    id INT AUTO_INCREMENT NOT NULL,
    item_name VARCHAR(30) NULL,
    department_name VARCHAR(30) NULL,
    price INT NULL,
    stock_quantity INT(100) NULL,
    PRIMARY KEY(id)

);

INSERT INTO products(item_name, department_name, price, stock_quantity)
Values ("Maple Staff", "Weapon", 35000, 50)

INSERT INTO products (item_name, department_name, price, stock_quantity)
VALUES("Maple Claw", "Weapon", 70000, 50);

INSERT INTO products (item_name, department_name, price, stock_quantity)
VALUES("Maple Skanda", "Weapon", 35000, 50);

INSERT INTO products (item_name, department_name, price, stock_quantity)
VALUES("Flaming Katana", "Weapon", 10000, 50);

INSERT INTO products (item_name, department_name, price, stock_quantity)
VALUES("Maple Karstan", "Weapon", 240000, 50);

INSERT INTO products (item_name, department_name, price, stock_quantity)
VALUES("Icarus Cape", "Cape", 40000, 50);

INSERT INTO products (item_name, department_name, price, stock_quantity)
VALUES("Blue Sauna Robe", "Overall", 15000, 50);

INSERT INTO products (item_name, department_name, price, stock_quantity)
VALUES("Zakum Helmet", "Helmet", 500000, 50);

INSERT INTO products (item_name, department_name, price, stock_quantity)
VALUES("Esther Shield", "Shield", 65000, 50);

INSERT INTO products (item_name, department_name, price, stock_quantity)
VALUES("Squishy Shoes", "Shoes", 65000, 50);