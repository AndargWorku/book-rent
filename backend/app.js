import express from "express";
import cors from "cors";

import userRouter from "./routes/user-router.js";
import bookRouter from "./routes/book-router.js";
import rentalRouter from "./routes/rental-router.js";
import db from "./db/index.js";



const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "https://book-rent-x75w.vercel.app/",
      "https://book-rent-x75w.vercel.app",
      "https://book-rent-x75w-git-main-andargworkus-projects.vercel.app/",
      "https://book-rent-x75w-git-main-andargworkus-projects.vercel.app",
      "http://localhost:5173",
      "http://localhost:5173/",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/users", userRouter);
app.use("/books", bookRouter);
app.use("/rentals", rentalRouter);

app.get('/categories-count', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        COUNT(*) FILTER (WHERE category = 'fiction') AS fiction,
        COUNT(*) FILTER (WHERE category = 'self-help') AS selfhelp,
        COUNT(*) FILTER (WHERE category = 'business') AS business
      FROM 
        books;
    `);

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching category counts:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/sum', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
    COALESCE(SUM(CASE 
        WHEN date_trunc('month', rental_date) = date_trunc('month', CURRENT_DATE) 
        THEN price 
        ELSE 0 
    END), 0) AS this_month,
    
    COALESCE(SUM(CASE 
        WHEN date_trunc('month', rental_date) = date_trunc('month', CURRENT_DATE) - interval '1 month' 
        THEN price 
        ELSE 0 
    END), 0) AS last_month
FROM 
    rentals;
    `);

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching rental sums:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/", (req, res) => {
  res.send("hello from express server");
});

export default app;