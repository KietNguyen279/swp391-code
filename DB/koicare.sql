
CREATE TABLE `User` (
  `id` BIGINT PRIMARY KEY auto_increment,
  `name` VARCHAR(255),
  `email` VARCHAR(255),
  `password` VARCHAR(255),
  `role` ENUM('GUEST', 'MEMBER', 'SHOP', 'ADMIN'), 
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
  `food_required_kg_per_day` FLOAT,
  FOREIGN KEY (`pond_id`) REFERENCES `Pond` (`id`)
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
  `date_published` DATETIME,
  `user_id` BIGINT, 
  FOREIGN KEY (`user_id`) REFERENCES `User` (`id`)
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


-- User Values
INSERT INTO `User` (`name`, `email`, `password`, `role`) VALUES
('TranThinh', 'tranthinh@example.com', '123', 'MEMBER'), -- Member
('DucQuang', 'ducquang@example.com', '999', 'GUEST'), -- Guest
('PhuongNam', 'phuongnam@example.com', '111', 'SHOP'), -- Shop
('KietNguyen', 'kietnguyen@example.com', '279', 'ADMIN'); -- Admin

-- Pond Values
INSERT INTO `Pond` (`name`, `image`, `size`, `depth`, `volume`, `num_of_drains`, `pump_capacity`, `user_id`) VALUES
('Big Pond', 'mainpond.jpg', 15.0, 2.5, 375.0, 2, 150.0, 1), -- TranThinh pond
('Small Pond', 'smallpond.jpg', 8.0, 1.8, 144.0, 1, 80.0, 2), -- DucQuang pond
('Tiny Pond', 'smallpond.jpg', 2.0, 0.7, 110.0, 1, 20.0, 3), -- PhuongNam pond
('Medium Pond', 'smallpond.jpg', 5.0, 1.2, 122.0, 2, 50.0, 4); -- KietNguyen pond

-- Koi Values
INSERT INTO `Koi` (`name`, `image`, `body_shape`, `age`, `size`, `weight`, `gender`, `breed`, `origin`, `pond_id`) VALUES
('Koi A', 'koia.jpg', 'round', 2, 30.0, 1.5, 'male', 'Kohaku', 'Japan', 1), 
('Koi B', 'koib.jpg', 'oval', 3, 40.0, 2.0, 'female', 'Kudoshinichi', 'Japan', 2),
('Koi C', 'koic.jpg', 'slim', 1, 20.0, 1.0, 'female', 'Kakhi', 'Japan', 3),
('Koi D', 'koid.jpg', 'triangle', 5, 80.0, 7.0, 'male', 'Kaito', 'Japan', 4);


-- Koi Update Values
INSERT INTO `Koi_growth_record` (`growth_date`,`age`, `size`, `weight`, `koi_id`) VALUES
('2024-09-17',2, 31.0, 1.6, 1),
('2024-09-17',3,41.0, 2.1, 2),
('2024-09-17',1,21.0, 1.1, 3),
('2024-09-17',5,81.0, 8.1, 4),
('2024-09-18',2,31.5, 1.7, 1),
('2024-09-18',3,41.5, 2.2, 2),
('2024-09-18',1,31.5, 1.2, 3),
('2024-09-18',5,82.5, 8.3, 4);

-- Water Parameters Update 
INSERT INTO `Water_parameters` (`measurement_time`, `pond_id`) VALUES
('2024-09-17 08:00:00', 1), -- For Big Pond
('2024-09-17 10:00:00', 2), -- For Small Pond
('2024-09-17 11:00:00', 3), -- For Tiny Pond
('2024-09-17 11:32:00', 4); -- For Medium Pond

-- Water Parameters Values Update 
INSERT INTO `Water_parameter_value` (`name`, `param_value`, `water_parameters_id`) VALUES
('pH', 7.5, 1),
('O2', 6.8, 1),
('NO2', 0.02, 1),
('PO4', 7.2, 1),
('salinity', 1.0, 1),
('temperature', 27.00, 1),
('pH', 6.5, 2),
('O2', 4.8, 2),
('NO2', 0.05, 2),
('PO4', 4.2, 2),
('salinity', 1.0, 2),
('temperature', 28.00, 2),
('pH', 3.5, 3),
('O2', 3.8, 3),
('NO2', 0.02, 3),
('PO4', 2.2, 3),
('salinity', 0.06, 3),
('temperature', 27.00, 3),
('pH', 5.5, 4),
('O2', 5.8, 4),
('NO2', 0.04, 4),
('PO4', 5.2, 4),
('salinity', 1.0, 4),
('temperature', 27.00, 4);

-- Product Values 
INSERT INTO `Product` (`name`, `image`, `description`, `price`, `quantity`) VALUES
('Koi Food', 'koifood.jpg', 'Premium koi food for all stages of growth.', 25.000, 93),
('Water Treatment', 'watertreatment.jpg', 'Improves water quality and balances pH.', 60.000, 48),
('Thermometer', 'thermometer.jpg', 'to check the temperature of the water.', 20.000, 47),
('Salt', 'salt.jpg', 'Improves water salinity.', 10.000, 49);

-- Order Values
INSERT INTO `Order` (`order_date`, `user_id`, `status`) VALUES
('2024-09-17 12:00:00', 1, 'pending'), -- TranThinh order
('2024-09-17 13:00:00', 2, 'processing'), -- DucQuang order
('2024-09-17 14:00:00', 3, 'cancelled'), -- PhuongNam order
('2024-09-17 15:00:00', 4,'shipped'); -- KietNguyen order

-- Order_Product Values
INSERT INTO `Order_Product` (`order_id`, `product_id`, `quantity`, `price`) VALUES
(1, 1, 2, 100.000), -- 2 units of Koi Food in TranThinh order
(2, 3, 2, 48.000), -- 2 units of Thermometer in DucQuang order
(3, 1, 1, 50.000), -- 1 units of Koi Food in PhuongNam order
(4, 4, 2, 70.000); -- 2 units of Salt in KietNguyen order

-- Article Values
INSERT INTO `News_blog` (`image`, `title`, `content`, `date_published`) VALUES
(2, 'Koi Pond Maintenance Tips', 'Here are some tips to maintain your koi pond...', '2024-09-17 09:00:00');




