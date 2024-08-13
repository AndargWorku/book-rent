const createBooksTable = `
CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    author VARCHAR(100),
    price NUMERIC DEFAULT 0,
    owner VARCHAR(30) DEFAULT NULL,
    category VARCHAR(255),
    quantity NUMERIC DEFAULT 0,
    cover_image VARCHAR(255),
    status VARCHAR(15),
    inactive_by VARCHAR(20) DEFAULT NULL,  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

`;

export default createBooksTable;