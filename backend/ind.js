const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { authSocket, socketServer } = require('./socketServer');

dotenv.config();

const port = process.env.PORT || 4000;
const app = express();
const httpServer = http.createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {
    origin: ['http://localhost:3000'], // Adjust based on your frontend URL
  },
});

// Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// Middleware to parse JSON bodies
app.use(express.json());

// Authentication Middleware for Socket.io
io.use(authSocket);

// Handle WebSocket Connections
io.on('connection', (socket) => socketServer(socket));

// Start the Server
httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
