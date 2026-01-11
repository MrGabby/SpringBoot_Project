-- Dummy Data for crop_details table

-- Fruits
INSERT INTO crop_details (crop_name, crop_type, quantity, price, crop_detail_description, location) VALUES
('Apple', 'Fruit', 500, 150, 'Fresh Red Delicious Apples', 'Shimla'),
('Banana', 'Fruit', 1000, 40, 'Organic Robusta Bananas', 'Kerala'),
('Mango', 'Fruit', 300, 120, 'Premium Alphonso Mangoes', 'Ratnagiri'),
('Orange', 'Fruit', 600, 80, 'Juicy Nagpur Oranges', 'Nagpur'),
('Grapes', 'Fruit', 400, 90, 'Sweet Black Seedless Grapes', 'Nashik');

-- Vegetables
INSERT INTO crop_details (crop_name, crop_type, quantity, price, crop_detail_description, location) VALUES
('Tomato', 'Vegetable', 800, 25, 'Farm Fresh Red Tomatoes', 'Bangalore'),
('Potato', 'Vegetable', 1500, 20, 'High Quality Potatoes', 'Agra'),
('Onion', 'Vegetable', 1200, 30, 'Nashik Red Onions', 'Nashik'),
('Carrot', 'Vegetable', 400, 45, 'Sweet Ooty Carrots', 'Ooty'),
('Spinach', 'Vegetable', 200, 15, 'Organic Fresh Spinach', 'Pune');

-- Pulses
INSERT INTO crop_details (crop_name, crop_type, quantity, price, crop_detail_description, location) VALUES
('Toor Dal', 'Pulses', 500, 110, 'Polished Toor Dal', 'Latur'),
('Moong Dal', 'Pulses', 400, 130, 'Yellow Split Moong Dal', 'Indore'),
('Chana Dal', 'Pulses', 600, 90, 'Premium Chana Dal', 'Punjab'),
('Masoor Dal', 'Pulses', 300, 100, 'Red Masoor Dal', 'Madhya Pradesh'),
('Urad Dal', 'Pulses', 350, 140, 'Whole Black Urad Dal', 'Andhra Pradesh');
