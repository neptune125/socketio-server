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

// Dictionnaire pour stocker les clients actifs par client_id
const clients = {};

io.on("connection", socket => {
    console.log("🔗 Client connecté :", socket.id);

    socket.on("stream", data => {
        const { client_id } = data;

        // Stocker/mettre à jour le socket pour ce client_id
        clients[client_id] = socket.id;

        // Émettre le flux à tous les clients sauf l’expéditeur
        socket.broadcast.emit("stream", data);
    });

    socket.on("disconnect", () => {
        // Supprimer le client de la liste
        for (const id in clients) {
            if (clients[id] === socket.id) {
                delete clients[id];
                break;
            }
        }
        console.log("❌ Client déconnecté :", socket.id);
    });
});

server.listen(process.env.PORT || 3000, () => {
    console.log("🚀 Serveur Socket.IO opérationnel sur Render");
});
