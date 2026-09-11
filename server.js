const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Store connected users
const users = new Map();

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Socket.IO Connection
io.on('connection', (socket) => {
    console.log('New user connected:', socket.id);

    socket.on('join', (data) => {
        const userName = data.name;
        users.set(socket.id, userName);

        // Notify all users about the new user
        io.emit('userJoined', {
            name: userName,
            userCount: users.size,
            users: Array.from(users.values())
        });

        console.log(`${userName} joined. Total users: ${users.size}`);
    });

    socket.on('message', (data) => {
        const userName = users.get(socket.id);
        if (userName) {
            io.emit('message', {
                name: userName,
                text: data.text,
                timestamp: new Date()
            });
            console.log(`Message from ${userName}: ${data.text}`);
        }
    });

    socket.on('disconnect', () => {
        const userName = users.get(socket.id);
        users.delete(socket.id);

        if (userName) {
            io.emit('userLeft', {
                name: userName,
                userCount: users.size,
                users: Array.from(users.values())
            });
            console.log(`${userName} left. Total users: ${users.size}`);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Chat server running on http://localhost:${PORT}`);
});
