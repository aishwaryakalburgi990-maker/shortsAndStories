-- Database Schema for Shots & Stories Photography Portfolio

-- 1. Couples table
CREATE TABLE couples (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    names VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    date VARCHAR(100),
    cover_image_url VARCHAR(500),
    video_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_created_at (created_at)
);

-- 2. Couple Images table
CREATE TABLE couple_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    couple_id INT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    order_index INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (couple_id) REFERENCES couples(id) ON DELETE CASCADE,
    INDEX idx_couple_order (couple_id, order_index)
);

-- 3. Hero Images table
CREATE TABLE hero_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    image_url VARCHAR(500) NOT NULL,
    title VARCHAR(255),
    subtitle VARCHAR(255),
    order_index INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_order_active (order_index, is_active)
);

-- 4. About Me table (single row)
CREATE TABLE about_me (
    id INT PRIMARY KEY AUTO_INCREMENT,
    author_name VARCHAR(255) NOT NULL,
    description TEXT,
    years_experience INT DEFAULT 0,
    couples_served INT DEFAULT 0,
    awards_count INT DEFAULT 0,
    profile_image_url VARCHAR(500),
    location VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 5. Admin Users table (for authentication)
CREATE TABLE admin_users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
);

-- Insert default about_me record
INSERT INTO about_me (author_name, description, years_experience, couples_served, awards_count, location) 
VALUES ('Sujay', 'I am your photographer friend specialized to create art in beautiful chaos...', 8, 520, 50, 'Mumbai, India');

-- Insert default admin user (password should be hashed)
INSERT INTO admin_users (email, password_hash, name) 
VALUES ('admin@shotsandstories.com', '$2b$10$hashedpasswordhere', 'Admin User');