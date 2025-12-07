const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  }
});

// Quand un client se connecte
io.on("connection", (socket) => {
  console.log("Client connecté :", socket.id);

  socket.on("message", (msg) => {
    console.log("Message reçu :", msg);
    socket.emit("message", "Bien reçu !");
  });
});

// Lancer le serveurs
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Serveur Socket.IO lancé sur le port " + PORT);
});
