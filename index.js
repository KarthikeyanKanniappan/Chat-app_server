import express from "express";
import dotenv from "dotenv";
const app = express();
dotenv.config();
import connectDB from "./config/db.js";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import chatRouter from "./routes/chatRoutes.js";
// middleWare
app.use(express.json());
app.use(cors());

// mongodb connection
connectDB();

app.get("/", (req, res) => {
  res.send("Api is Running");
});

app.use("/users", userRouter);
app.use("/chat", chatRouter);

app.listen(process.env.PORT, () => {
  console.log("Server is started");
});
