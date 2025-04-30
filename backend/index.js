import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import passwordRoutes from "./routes/passwordRoutes.js";
import cors from "cors";


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "https://password-manager-omega-one.vercel.app/", credentials: true }));

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));


app.use("/api/users", userRoutes); 
app.use("/api/passwords", passwordRoutes);

app.get("/", (req, res) => {
  res.send("Password Manager API is Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
