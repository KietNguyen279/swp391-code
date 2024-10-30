CREATE TABLE `User` (
  `id` BIGINT PRIMARY KEY auto_increment,
  `name` VARCHAR(255),
  `email` VARCHAR(255),
  `password` VARCHAR(255),
  `role` ENUM('GUEST', 'MEMBER', 'SHOP', 'ADMIN')
);

CREATE TABLE `Pond` (
  `id` BIGINT PRIMARY KEY auto_increment,
  `name` VARCHAR(255),
  `image` VARCHAR(255),
  `size` FLOAT,
  `depth` FLOAT,
  `volume` FLOAT,
  `num_of_drains` BIGINT,
  `pump_capacity` FLOAT,
  `user_id` BIGINT,
  `salt_kg_required` FLOAT,
  FOREIGN KEY (`user_id`) REFERENCES `User` (`id`)
);

CREATE TABLE `Koi` (
  `id` BIGINT PRIMARY KEY auto_increment,
  `name` VARCHAR(255),
  `image` VARCHAR(255),
  `body_shape` VARCHAR(255),
  `age` BIGINT,
  `size` FLOAT,
  `weight` FLOAT,
  `gender` ENUM('male', 'female'),
  `breed` VARCHAR(255),
  `origin` VARCHAR(255),
  `pond_id` BIGINT,
  `user_id` BIGINT,
  `food_required_kg_per_day` FLOAT,
  FOREIGN KEY (`pond_id`) REFERENCES `Pond` (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `User` (`id`)
);

CREATE TABLE `Koi_growth_record` (
  `id` BIGINT PRIMARY KEY auto_increment,
  `growth_date` DATE,
  `age` BIGINT,
  `size` FLOAT,
  `weight` FLOAT,
  `koi_id` BIGINT,
  FOREIGN KEY (`koi_id`) REFERENCES `Koi` (`id`)
);

CREATE TABLE `Water_parameters` (
  `id` BIGINT PRIMARY KEY auto_increment,
  `measurement_time` DATETIME,
  `pond_id` BIGINT,
  FOREIGN KEY (`pond_id`) REFERENCES `Pond` (`id`)
);

CREATE TABLE `Water_parameter_value` (
  `id` BIGINT PRIMARY KEY auto_increment,
  `name` VARCHAR(255),
  `param_value` FLOAT,
  `water_parameters_id` BIGINT,
  FOREIGN KEY (`water_parameters_id`) REFERENCES `Water_parameters` (`id`)
);

CREATE TABLE `Product` (
  `id` BIGINT PRIMARY KEY auto_increment,
  `name` VARCHAR(255),
  `image` VARCHAR(255),
  `description` TEXT,
  `price` DECIMAL(10, 2),
  `quantity` BIGINT
);

CREATE TABLE `Order` (
  `id` BIGINT PRIMARY KEY auto_increment,
  `order_date` DATETIME,
  `user_id` BIGINT,
  `status` ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  FOREIGN KEY (`user_id`) REFERENCES `User` (`id`)
);

CREATE TABLE `Order_Product` (
  `order_id` BIGINT,
  `product_id` BIGINT,
  `quantity` INT NOT NULL,
  `price` DECIMAL(10, 2) NOT NULL, 
  PRIMARY KEY (`order_id`, `product_id`),
  FOREIGN KEY (`order_id`) REFERENCES `Order` (`id`),
  FOREIGN KEY (`product_id`) REFERENCES `Product` (`id`)
);

CREATE TABLE `News_blog` (
  `id` BIGINT PRIMARY KEY auto_increment,
  `image` VARCHAR(255),
  `title` VARCHAR(255),
  `content` TEXT,
  `date_published` DATETIME
);

CREATE TABLE `Cart` (
    `id` BIGINT PRIMARY KEY auto_increment,
    `user_id` BIGINT,   
    FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) 
);

CREATE TABLE `Cart_item` (
    `cart_id` BIGINT ,
    `product_id` BIGINT ,
    `quantity` INT ,
    PRIMARY KEY (`cart_id`, `product_id`), 
    FOREIGN KEY (`cart_id`) REFERENCES `Cart` (`id`),
    FOREIGN KEY (`product_id`) REFERENCES `Product` (`id`)
);