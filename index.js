import express from "express";
import dotenv from "dotenv";
const app = express();
dotenv.config();
import connectDB from "./config/db.js";

connectDB();
app.get("/", (req, res) => {
  res.send("Api is Running");
});

app.listen(5000, () => {
  console.log("Server is started");
});
