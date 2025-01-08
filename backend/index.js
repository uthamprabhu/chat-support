const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const crypto = require('crypto');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const PORT = process.env.PORT || 8080;
const app = express();
const server = http.createServer(app);

const Message = require('./models/message');
const connectToDB = require('./config/db');

connectToDB();

app.use(cors());

const io = socketio(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Active rooms tracker
const activeRooms = {};

io.on('connection', (socket) => {
  console.log('New connection!');

  socket.on('join', async ({ name, room }, callback) => {
    const sessionToken = crypto.randomBytes(16).toString('hex');
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    // Generate and send session token
    socket.emit('sessionToken', { sessionToken });

    console.log('sessionToken:', sessionToken);

    // Fetch and send chat history
    const messages = await Message.find({ room: user.room }).sort({ timestamp: 1 });

    const formattedMessages = messages.map((msg) => ({
      user: msg.user,
      text: msg.message,
      timestamp: msg.timestamp,
    }));

    console.log(formattedMessages);

    socket.emit('chatHistory', formattedMessages);

    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, welcome to the room ${user.room}.`,
      timestamp: new Date().toISOString(),
    });

    socket.broadcast.to(user.room).emit('message', {
      user: 'admin',
      text: `${user.name} has joined!`,
      timestamp: new Date().toISOString(),
    });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    // Update active rooms
    activeRooms[user.room] = (activeRooms[user.room] || 0) + 1;
    io.emit('activeRoomsUpdate', Object.keys(activeRooms).filter((room) => activeRooms[room] > 0));

    callback();
  });

  socket.on('sendMessage', async (message, callback) => {
    try {
      const user = getUser(socket.id);

      if (!user) {
        return callback('User not found');
      }

      const chatMessage = new Message({
        user: user.name,
        room: user.room,
        message,
        timestamp: new Date(),
      });

      const savedMessage = await chatMessage.save();

      io.to(user.room).emit('message', {
        user: savedMessage.user,
        text: savedMessage.message,
        timestamp: savedMessage.timestamp,
      });

      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

      callback();
    } catch (error) {
      console.error('Error saving message:', error);
      callback('Message could not be sent');
    }
  });

  socket.on('typing', ({ room }) => {
    const user = getUser(socket.id);
    if (user) {
      socket.broadcast.to(room).emit('typing', { user: user.name });
    }
  });

  socket.on('stopTyping', ({ room }) => {
    socket.broadcast.to(room).emit('stopTyping');
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', {
        user: 'admin',
        text: `${user.name} has left.`,
      });

      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

      // Update active rooms
      activeRooms[user.room] = (activeRooms[user.room] || 1) - 1;

      if (activeRooms[user.room] <= 0) {
        delete activeRooms[user.room];
      }

      io.emit('activeRoomsUpdate', Object.keys(activeRooms).filter((room) => activeRooms[room] > 0));
    }

    console.log('User disconnected.');
  });
});

server.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
