import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

app.get("/", (req, res) => {
    res.send("Socket.IO server running ✔");
});

io.on("connection", socket => {
    console.log("🔗 Client connecté :", socket.id);

    socket.on("stream", data => {
        io.emit("stream", data); // diffuse à tout le monde
    });

    socket.on("disconnect", () => {
        console.log("❌ Client déconnecté :", socket.id);
    });
});

server.listen(process.env.PORT || 3000, () => {
    console.log("🚀 Serveur Socket.IO opérationnel sur Render");
});
