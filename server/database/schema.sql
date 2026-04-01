-- Career Guide Platform Database Schema

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS counselling_sessions;

DROP TABLE IF EXISTS career_skills;

DROP TABLE IF EXISTS courses;

DROP TABLE IF EXISTS assessment_answers;

DROP TABLE IF EXISTS assessment_questions;

DROP TABLE IF EXISTS skills;

DROP TABLE IF EXISTS careers;

DROP TABLE IF EXISTS users;

-- Users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    gender ENUM(
        'male',
        'female',
        'other',
        'prefer_not_to_say'
    ),
    education_level VARCHAR(100),
    current_status VARCHAR(100),
    interests TEXT,
    profile_completed BOOLEAN DEFAULT FALSE,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Careers table
CREATE TABLE careers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    field VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    detailed_description TEXT,
    avg_salary_min INT,
    avg_salary_max INT,
    salary_currency VARCHAR(10) DEFAULT 'INR',
    job_outlook VARCHAR(50),
    education_required VARCHAR(255),
    work_environment TEXT,
    future_scope TEXT,
    roadmap JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_field (field),
    INDEX idx_title (title)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Skills master table
CREATE TABLE skills (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(100),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_category (category)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Career Skills mapping table (Many-to-Many)
CREATE TABLE career_skills (
    id INT PRIMARY KEY AUTO_INCREMENT,
    career_id INT NOT NULL,
    skill_id INT NOT NULL,
    proficiency_level ENUM(
        'beginner',
        'intermediate',
        'advanced',
        'expert'
    ) DEFAULT 'intermediate',
    importance ENUM(
        'nice_to_have',
        'recommended',
        'required',
        'critical'
    ) DEFAULT 'required',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (career_id) REFERENCES careers (id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills (id) ON DELETE CASCADE,
    UNIQUE KEY unique_career_skill (career_id, skill_id),
    INDEX idx_career (career_id),
    INDEX idx_skill (skill_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Assessment questions
CREATE TABLE assessment_questions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    question_text TEXT NOT NULL,
    question_type ENUM(
        'interest',
        'personality',
        'aptitude'
    ) NOT NULL,
    category VARCHAR(100),
    options JSON,
    scoring_weights JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_type (question_type),
    INDEX idx_category (category)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- User assessment answers
CREATE TABLE assessment_answers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    question_id INT NOT NULL,
    answer TEXT NOT NULL,
    score INT,
    answered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES assessment_questions (id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_question (question_id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Courses and resources
CREATE TABLE courses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    platform VARCHAR(100),
    url TEXT,
    description TEXT,
    duration VARCHAR(100),
    price DECIMAL(10, 2),
    currency VARCHAR(10) DEFAULT 'INR',
    is_free BOOLEAN DEFAULT FALSE,
    rating DECIMAL(3, 2),
    career_id INT,
    skill_id INT,
    difficulty_level ENUM(
        'beginner',
        'intermediate',
        'advanced'
    ) DEFAULT 'beginner',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (career_id) REFERENCES careers (id) ON DELETE SET NULL,
    FOREIGN KEY (skill_id) REFERENCES skills (id) ON DELETE SET NULL,
    INDEX idx_career (career_id),
    INDEX idx_skill (skill_id),
    INDEX idx_platform (platform),
    INDEX idx_difficulty (difficulty_level),
    INDEX idx_is_free (is_free)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Counselling sessions
CREATE TABLE counselling_sessions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    counsellor_name VARCHAR(255),
    session_date DATE NOT NULL,
    session_time TIME NOT NULL,
    duration INT DEFAULT 60,
    status ENUM(
        'pending',
        'confirmed',
        'completed',
        'cancelled'
    ) DEFAULT 'pending',
    meeting_link TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_date (session_date),
    INDEX idx_status (status)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- Contact form submissions
CREATE TABLE contacts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('new', 'read', 'replied') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;