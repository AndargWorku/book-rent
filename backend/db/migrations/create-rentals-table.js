const createRentalsTable = `
CREATE TABLE IF NOT EXISTS rentals (
    id SERIAL PRIMARY KEY,
    book_id VARCHAR(255),
    user_id VARCHAR(255),
    price NUMERIC DEFAULT 0,
    rental_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    return_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIsMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

`;

export default createRentalsTable;