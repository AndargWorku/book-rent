import { Router } from "express";
import bcrypt from "bcrypt";
import hashPassword from "../utils/hash-password.js";
import userRepository from "../controllers/user-repository.js";
import generateToken from "../utils/generate-token.js";
const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userRepository.findByEmail(email);
    // const hashedPassword = await hashPassword(user.password);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password.toString(),
      user.password
    );
    // const isPasswordCorrect = password === admin.password;
    if (isPasswordCorrect) {
      const token = generateToken(user);
      // Assuming 'res' is the Express response object
      res.cookie(
        "authToken",
        token,
        { httpOnly: true, secure: true },
        { expire: new Date() + 3600 }
      );
      res.status(200).json({ token, message: "Login successful", user: user });
    } else {
      res.status(401).json({ error: "Invalid password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
});

router.post("/logout", (req, res) => {

  res.clearCookie("authToken");
  res.status(200).json({ message: "Logout successful" });
  console.log("Logout successful");
});

router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const result = await userRepository.createUser(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in createAdmin route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await userRepository.findAll();
    res.json(result);
  } catch (error) {
    console.error("Error in findAll route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await userRepository.findOne(+req.params.id);
    res.json(result);
  } catch (error) {
    console.error("Error in findOne route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const result = await userRepository.updateUser(+req.params.id, req.body);
    res.json(result);
  } catch (error) {
    console.error("Error in updateUser route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await userRepository.deleteOne(+req.params.id);
    console.log(result);
    res.json(result);
  } catch (error) {
    console.error("Error in deleteOne route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;