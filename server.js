const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',   // Autorise toutes les origines (pour test)
        methods: ['GET', 'POST']
    }
});

// Simple route pour tester si le serveur est actif
app.get('/', (req, res) => {
    res.send('🚀 Serveur Socket.IO actif !');
});

// Gestion des connexions Socket.IO
io.on('connection', (socket) => {
    console.log(`⚡ Client connecté : ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`⚠️ Client déconnecté : ${socket.id}`);
    });

    // Recevoir les frames du Python et diffuser aux clients HTML
    socket.on('stream', (frame) => {
        socket.broadcast.emit('stream', frame);
    });
});

// Port pour Render
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 Serveur lancé sur le port ${PORT}`));
