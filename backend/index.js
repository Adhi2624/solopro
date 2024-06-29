// index.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const { authSocket, socketServer } = require('./socketServer');
const { connectDB, connectDB1 } = require('./config/db');
const { errorHandler } = require('./middleware/errorHandler');

// Import routes
const posts = require('./routes/posts');
const users = require('./routes/users');
const comments = require('./routes/comments');
const blogRoutes = require('./routes/blogs');
const featuredStoryRoutes = require('./routes/featuredStories');
const moreStoryRoutes = require('./routes/moreStories');
const userRoutes = require('./routes/userRoutes');
const loginRoutes = require('./routes/loginRoutes');



dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Establish database connections before starting the server
const startServer = async () => {
  try {
    await connectDB();
    await connectDB1();
// Import controllers
const mentorController = require('./controllers/mentorController');
const meetingController = require('./controllers/meetingController');
const studentController = require('./controllers/studentController');
const investorController = require('./controllers/investorController');
    // Socket.io Setup
    const httpServer = require('http').createServer(app);
    const io = require('socket.io')(httpServer, {
      cors: {
        origin: ['http://localhost:3000'],
      },
    });
    io.use(authSocket);
    io.on('connection', (socket) => socketServer(socket));

    // Routes
    app.use('/api/posts', posts);
    app.use('/api/users', users);
    app.use('/api/comments', comments);
    app.use('/api/blogs', blogRoutes);
    app.use('/api/featuredStories', featuredStoryRoutes);
    app.use('/api/moreStories', moreStoryRoutes);
    app.use('/api/signup', userRoutes);
    app.use('/api/login', loginRoutes);

    // Serve React App
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });

    // Define API Endpoints
    app.get('/getmentors', mentorController.getAllMentors);
    app.get('/getinvestors', investorController.getAllInvestors);
    app.post('/getInvestor', investorController.getInvestorById);
    app.post('/getMentor', mentorController.getmentortById);
    app.post('/getstudent', studentController.getStudentById);
    app.post('/schedulemeeting', meetingController.scheduleMeeting);
    app.post('/getmeetingstu', meetingController.getMeetingByStudentId);
    app.post('/updatestudent', studentController.updateStudent);
    app.post('/student/getprofileimg', studentController.getprofileimg);
    app.post('/getappointments', meetingController.getAppointmentsByMentorId);
    app.post('/updatestatus', meetingController.updateAppointmentStatus);
    app.post('/Mentor/getprofileimg', mentorController.getprofileimg);
    app.post('/Investor/getprofileimg', investorController.getprofileimg);
    app.post('/updatementor', mentorController.updateMentor);
    app.post('/updateinvestor', investorController.updateInvestor);

    // Error Handler Middleware
    app.use(errorHandler);

    // Start Server
    const PORT = process.env.PORT || 4000;
    httpServer.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database', error);
    process.exit(1);
  }
};

startServer();