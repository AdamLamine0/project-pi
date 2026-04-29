CREATE TABLE IF NOT EXISTS ml_scores (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    project_id BIGINT NOT NULL,
    sector VARCHAR(120),
    stage VARCHAR(120),
    score DOUBLE NOT NULL,
    confidence DOUBLE NOT NULL,
    explanation TEXT NOT NULL,
    features JSON NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_ml_scores_project_id (project_id)
);

CREATE TABLE IF NOT EXISTS roadmap_templates (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    sector VARCHAR(120),
    stage VARCHAR(120),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    score DOUBLE NOT NULL DEFAULT 0,
    metadata JSON NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS roadmap_steps (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    project_id BIGINT NOT NULL,
    template_id BIGINT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    phase VARCHAR(80) NOT NULL,
    order_index INT NOT NULL,
    status VARCHAR(40) NOT NULL DEFAULT 'A_FAIRE',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_roadmap_steps_project_id (project_id)
);

CREATE TABLE IF NOT EXISTS plagiarism_results (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    project_id BIGINT NOT NULL,
    job_id VARCHAR(120),
    score DOUBLE NOT NULL,
    status VARCHAR(40) NOT NULL,
    sources JSON NOT NULL,
    report JSON NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_plagiarism_results_project_id (project_id)
);

CREATE TABLE IF NOT EXISTS recommendations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    project_id BIGINT NOT NULL,
    category VARCHAR(120) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    score DOUBLE NOT NULL,
    payload JSON NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_recommendations_project_id (project_id)
);