CREATE DATABASE IF NOT EXISTS taskmanager;
USE taskmanager;

CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO tasks (title, description, completed) VALUES
('Learn React', 'Complete React tutorial and build a project', false),
('Setup Flask API', 'Create REST API with Flask and MySQL', true),
('Deploy Application', 'Deploy the full-stack app to production', false);
