DROP DATABASE IF EXISTS item_finder_db;

CREATE DATABASE item_finder_db;
USE item_finder_db;

CREATE TABLE category (
    id INT NOT NULL AUTO_INCREMENT, 
    category_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE product (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    product_name VARCHAR(30) NOT NULL,
    price DECIMAL NOT NULL,
    stock INT NOT NULL DEFAULT 10,
    FOREIGN KEY (category_id)
    REFERENCES category (id)
    ON DELETE SET NULL
);

CREATE TABLE tag (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tag_name VARCHAR(30)
);

CREATE TABLE product_tag (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    tag_id INT,
    FOREIGN KEY (product_id)
    REFERENCES product (id)
    ON DELETE SET NULL,
    FOREIGN KEY (tag_id)
    REFERENCES tag (id)
    ON DELETE SET NULL
);
