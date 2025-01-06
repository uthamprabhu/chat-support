const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors'); // Import the CORS library

const PORT = process.env.PORT || 8080;

const router = require('./router');

const app = express();
const server = http.createServer(app);

// Apply CORS middleware to Express
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: ['GET', 'POST'],
    credentials: true
}));

// Add CORS configuration to Socket.IO
const io = socketio(server, {
    cors: {
        origin: 'http://localhost:3000', // Replace with your frontend URL
        methods: ['GET', 'POST']
    }
})

io.on('connection', (socket) => {
    console.log('We have a new connection!!!')

    socket.on('join', ({ name, room }, callback) => {
        console.log(name, room)
    })

    socket.on('disconnect', () => {
        console.log('User had left!!!')
    })
})

app.use(router)

server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
