const express = require("express");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
dotenv.config();
const PORT = 8004;
const app = express();
const http = require("http");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    // allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const router = require("./ routes/router");
app.use(router);
require("./mongoDB/config");

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
