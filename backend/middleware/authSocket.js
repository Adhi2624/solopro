// socketServer.js
function authSocket(socket, next) {
    const { userId, role } = socket.handshake.auth;
  console.log(userId)
    if (!userId || !role) {
      return next(new Error('Authentication error'));
    }
  
    // Add additional authentication logic if needed
    // Example: Check against a database or an in-memory store
  
    socket.userId = userId;
    socket.role = role;
    next();
  }
  
  function socketServer(socket) {
    console.log(`User connected: ${socket.userId} with role: ${socket.role}`);
  
    socket.on('send-message', (recipientId, username, message) => {
      console.log(`Message from ${username}: ${message}`);
      socket.broadcast.emit('receive-message', recipientId, username, message);
    });
  }
  
  module.exports = { authSocket, socketServer };
  