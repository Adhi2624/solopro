// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db'); // Ensure this points to the correct path of your db connection file
// const { auth } = require('./middleware/auth');

// const mentorController = require('./controllers/mentorController');
// const studentController = require('./controllers/studentController');
// const meetingController = require('./controllers/meetingController');
// const blogRoutes = require('./routes/blogs');
// const featuredStoryRoutes = require('./routes/featuredStories');
// const moreStoryRoutes = require('./routes/moreStories');
// const userRoutes = require('./routes/userRoutes'); // Import userRoutes
// const mentorRoutes = require('./routes/mentorRoutes'); // Import mentorRoutes
// const studentRoutes = require('./routes/studentRoutes'); // Import studentRoutes
// const investorRoutes = require('./routes/investorRoutes'); // Import investorRoutes
// const { errorHandler } = require('./middleware/errorHandler');
// Import required route files first
const userRoutes = require('./routes/userRoutes');
const mentorRoutes = require('./routes/mentorRoutes');
const studentRoutes = require('./routes/studentRoutes');
const investorRoutes = require('./routes/investorRoutes');

// Other imports
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const mentorController = require('./controllers/mentorController');
const studentController = require('./controllers/studentController');
const meetingController = require('./controllers/meetingController');
const blogRoutes = require('./routes/blogs');
const featuredStoryRoutes = require('./routes/featuredStories');
const moreStoryRoutes = require('./routes/moreStories');
const { errorHandler } = require('./middleware/errorHandler');

// Rest of the code remains the same

dotenv.config();
const app = express();

// Init Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Connect to MongoDB before setting up routes
connectDB()
    .then(() => {
        console.log('MongoDB connection established');

        // Define Routes for first project
        // app.get('/getmentors', mentorController.getAllMentors);
        // app.post('/getmentor', mentorController.getAppointmentById);
        // app.post('/getstudent', studentController.getStudentById);
        // app.post('/schedulemeeting', meetingController.scheduleMeeting);
        // app.post('/getmeetingstu', meetingController.getMeetingByStudentId);
        // app.post('/getappointments', meetingController.getAppointmentsByMentorId);
        // app.post('/updatestatus', meetingController.updateAppointmentStatus);

        // Define Routes for second project
        app.use('/api/blogs', blogRoutes);
        app.use('/api/featuredStories', featuredStoryRoutes);
        app.use('/api/moreStories', moreStoryRoutes);
        
        // Define Routes for users, mentors, students, and investors
        app.use('/api/signup', userRoutes);
        // app.use('/api/mentors', mentorRoutes);
        // app.use('/api/students', studentRoutes);
        // app.use('/api/investors', investorRoutes);

        // Error Handler Middleware
        app.use(errorHandler);

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Error establishing MongoDB connection:', error);
        process.exit(1); // Stop the server if there's an error connecting to MongoDB
    });
