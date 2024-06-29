let users = [];
const mongoose = require('mongoose');
const Mentor = require('./models/Mentor');
const Student = require('./models/Student');
const Investor = require('./models/Investor');

const authSocket = async (socket, next) => {
  const { userId, role } = socket.handshake.auth;

  let user;
  try {
    if (role === 'mentor') {
      user = await Mentor.findOne({ userId });
    } else if (role === 'student') {
      user = await Student.findOne({ userId });
    } else if (role === 'investor') {
      user = await Investor.findOne({ userId });
    }

    if (user) {
      socket.decoded = { userId, role };
      next();
    } else {
      next(new Error("Authentication error"));
    }
  } catch (err) {
    next(new Error("Authentication error"));
  }
};

const socketServer = (socket) => {
  const { userId, role } = socket.decoded;
  users.push({ userId, role, socketId: socket.id });

  socket.on("send-message", (recipientUserId, username, content) => {
    const recipient = users.find(user => user.userId == recipientUserId);
    if (recipient) {
      socket
        .to(recipient.socketId)
        .emit("receive-message", userId, username, content);
    }
  });

  socket.on("disconnect", () => {
    users = users.filter(user => user.userId != userId);
  });
};

module.exports = { socketServer, authSocket };
