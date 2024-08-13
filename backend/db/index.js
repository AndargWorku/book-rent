import pg from "pg";

const db = new pg.Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

export default db;