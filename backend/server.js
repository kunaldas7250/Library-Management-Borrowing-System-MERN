
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import bookRoutes from "./routes/books.js";
import transactionRoutes from "./routes/transactions.js";
import categoryRoutes from "./routes/categories.js";
import { seedBooks } from "./data/seedBooks.js";
import borrowRoutes from "./routes/borrow.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;


app.use(express.json());
app.use(cors());
app.use("/api/borrow", borrowRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/categories", categoryRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Smart Library App");
});


mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async () => {
    console.log("MONGODB CONNECTED");
    await seedBooks();
  })
  .catch((err) => console.log(err));

/* Start Server */
app.listen(port, () => {
  console.log(`Server running on PORT ${port}`);
});
