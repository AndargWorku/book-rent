const createUsersTable = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100) DEFAULT NULL,
    user_name VARCHAR(50) DEFAULT NULL,
    email VARCHAR(30) UNIQUE,
    password VARCHAR(255),
    mobile VARCHAR(20),
    location VARCHAR(40),
    roles TEXT[],
    status VARCHAR(20),  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    count NUMERIC DEFAULT 0
);

`;

export default createUsersTable;