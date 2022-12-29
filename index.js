import express from "express";
import dotenv from "dotenv";
const app = express();
dotenv.config();
import connectDB from "./config/db.js";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import chatRouter from "./routes/chatRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";
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
app.use("/message", messageRouter);

const server = app.listen(process.env.PORT, () => {
  console.log("Server is started");
});

const io = new Server(server, {
  pingTimeout: 6000,
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  },
});
// https://illustrious-elf-472acb.netlify.app
// http://localhost:3000
io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user Joined Room" + room);
  });

  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) return;

      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });

  socket.off("setup", () => {
    console.log("User Disconnected");
    socket.leave(userData._id);
  });
});
