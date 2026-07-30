CREATE DATABASE beyond_media;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users(name,email,password)
VALUES
(
'Admin',
'admin@beyondmedia.com',
'admin@123'
);

-- beyond_media.news definition

CREATE TABLE `news` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `short_description` text,
  `content` longtext NOT NULL,
  `featured_image` varchar(500) DEFAULT NULL,
  `status` enum('draft','published') DEFAULT 'draft',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE categories (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(150) NOT NULL,
    slug VARCHAR(180) NOT NULL UNIQUE,

    description TEXT NULL,

    image VARCHAR(500) NULL,

    status ENUM('active','inactive') NOT NULL DEFAULT 'active',

    sort_order INT NOT NULL DEFAULT 0,

    created_by INT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_status(status),
    INDEX idx_sort(sort_order),
    INDEX idx_name(name),

    CONSTRAINT fk_category_user
        FOREIGN KEY (created_by)
        REFERENCES users(id)
        ON DELETE SET NULL
); 
CREATE TABLE subcategories (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    category_id BIGINT UNSIGNED NOT NULL,

    name VARCHAR(150) NOT NULL,

    slug VARCHAR(180) NOT NULL,

    description TEXT NULL,

    image VARCHAR(500) NULL,

    status ENUM('active','inactive') NOT NULL DEFAULT 'active',

    sort_order INT NOT NULL DEFAULT 0,

    created_by INT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    UNIQUE KEY uk_category_slug(category_id, slug),

    INDEX idx_category(category_id),
    INDEX idx_status(status),

    CONSTRAINT fk_subcategory_category
        FOREIGN KEY(category_id)
        REFERENCES categories(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_subcategory_user
        FOREIGN KEY(created_by)
        REFERENCES users(id)
        ON DELETE SET NULL
);
CREATE TABLE roles (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL UNIQUE,

    description TEXT,

    status ENUM('active','inactive')
        DEFAULT 'active',

    created_by INT DEFAULT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_role_user
        FOREIGN KEY(created_by)
        REFERENCES users(id)
        ON DELETE SET NULL
);
CREATE TABLE permissions (

    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL UNIQUE,

    module VARCHAR(100) NOT NULL,

    description TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_roles (

    user_id INT NOT NULL,

    role_id BIGINT UNSIGNED NOT NULL,

    PRIMARY KEY(user_id, role_id),

    FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY(role_id)
        REFERENCES roles(id)
        ON DELETE CASCADE
);
CREATE TABLE role_permissions (

    role_id BIGINT UNSIGNED NOT NULL,

    permission_id BIGINT UNSIGNED NOT NULL,

    PRIMARY KEY(role_id, permission_id),

    FOREIGN KEY(role_id)
        REFERENCES roles(id)
        ON DELETE CASCADE,

    FOREIGN KEY(permission_id)
        REFERENCES permissions(id)
        ON DELETE CASCADE
);

INSERT INTO permissions (name, module, description) VALUES
('dashboard.view', 'dashboard', 'View Dashboard'),

('news.view', 'news', 'View News'),
('news.create', 'news', 'Create News'),
('news.update', 'news', 'Update News'),
('news.delete', 'news', 'Delete News'),
('news.publish', 'news', 'Publish News'),

('categories.view', 'categories', 'View Categories'),
('categories.create', 'categories', 'Create Categories'),
('categories.update', 'categories', 'Update Categories'),
('categories.delete', 'categories', 'Delete Categories'),

('subcategories.view', 'subcategories', 'View Subcategories'),
('subcategories.create', 'subcategories', 'Create Subcategories'),
('subcategories.update', 'subcategories', 'Update Subcategories'),
('subcategories.delete', 'subcategories', 'Delete Subcategories'),

('users.view', 'users', 'View Users'),
('users.create', 'users', 'Create Users'),
('users.update', 'users', 'Update Users'),
('users.delete', 'users', 'Delete Users'),

('roles.view', 'roles', 'View Roles'),
('roles.create', 'roles', 'Create Roles'),
('roles.update', 'roles', 'Update Roles'),
('roles.delete', 'roles', 'Delete Roles'),

('permissions.view', 'permissions', 'View Permissions'),
('permissions.create', 'permissions', 'Create Permissions'),
('permissions.update', 'permissions', 'Update Permissions'),
('permissions.delete', 'permissions', 'Delete Permissions');