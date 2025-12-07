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

  // Pour les messages simples
  socket.on("message", (msg) => {
    console.log("Message reçu :", msg);
    socket.emit("message", "Bien reçu !");
  });

  // Pour recevoir les frames du stream Python
  socket.on("stream", (frame) => {
    console.log("Frame reçue:", frame.length);
    // Ici tu peux diffuser à d'autres clients si besoin
    // io.emit("stream", frame);
  });
});

// Lancer le serveur
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Serveur Socket.IO lancé sur le port " + PORT);
});
