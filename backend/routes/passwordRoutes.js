import express from "express";
import { addPassword, getPasswords, editPassword, deletePassword } from "../controllers/passwordController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addPassword);
router.put("/:id", protect, editPassword);
router.delete("/:id", protect, deletePassword);
router.get("/", protect, getPasswords);

export default router;
