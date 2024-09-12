import express from "express";
import productRoute from "../src/Routes/productRoute";
import authRoute from "../src/Routes/authRoute";
import userRoute from "./Routes/userRoute";
import weatherRoute from "./Routes/weatherRoute";
import dotenv from "dotenv";
import { connect } from "mongoose";
import { Authenticate } from "./Middlewares/Authentication";
import { createClient } from "redis";
import { createServer } from "http";
import { Server } from "socket.io";
import { logger } from "./Utils/logger";

dotenv.config();

const app = express();
const port = 3000;

// Create a Redis client
const redisClient = createClient({
  url: "redis://localhost:6379",
});

redisClient.connect().catch(console.error);

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

connect(process.env.MONGO_URI).then(() => {
  console.log("connected to database");
});

const server = createServer(app);

const io = new Server(server);

app.use(express.json());

app.use("/auth", authRoute);
app.use("/product", productRoute);
app.use("/weather", weatherRoute);

app.use(Authenticate);

// protected routes
app.use("/user", userRoute);

// WebSocket connection handler
io.on("connection", (socket) => {
  console.log("A client connected", socket.id);

  socket.emit("message", "Welcome! You are connected.");

  socket.on("disconnect", () => {
    console.log("A client disconnected", socket.id);
  });

  socket.on("newMessage", (data) => {
    console.log("New message received:", data);

    io.emit("notification", `New message: ${data}`);
  });
});

// Start the server
app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});

export default redisClient;
