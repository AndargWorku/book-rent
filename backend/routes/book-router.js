import { Router } from "express";
import bookRepository from "../controllers/book-repository.js";
const router = Router();


router.post("/", async (req, res) => {
  try {
    const result = await bookRepository.createBook(req.body);
    res.json(result);
  } catch (error) {
    console.error("Error in createBook route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/", async (req, res) => {
  try {
    const result = await bookRepository.findAll();
    res.json(result);
  } catch (error) {
    console.error("Error in findAll route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await bookRepository.findOne(+req.params.id);
    res.json(result);
  } catch (error) {
    console.error("Error in findOne route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const result = await bookRepository.updateBook(+req.params.id, req.body);
    res.json(result);
  } catch (error) {
    console.error("Error in updateBook route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await bookRepository.deleteOne(+req.params.id);
    console.log(result);
    res.json(result);
  } catch (error) {
    console.error("Error in deleteOne route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;