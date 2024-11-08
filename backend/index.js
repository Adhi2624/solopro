// index.js

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const { connectDB, connectDB1 } = require("./config/db");
const { errorHandler } = require("./middleware/errorHandler");
const multer = require('multer');
const sharp = require('sharp');
const { forgotPassword, updatePassword } = require('./controllers/authcontroller');

const { getAllData, getDataByName } = require('./controllers/allusercontroller');

const blogRoutes = require("./routes/blogs");
const featuredStoryRoutes = require("./routes/featuredStories");
const moreStoryRoutes = require("./routes/moreStories");
const userRoutes = require("./routes/userRoutes");
const loginRoutes = require("./routes/loginRoutes");
const authRoutes = require('./routes/authroutes');

const email = require("./controllers/emailverify");

const totalCountRoutes = require('./routes/totalCountRoutes'); 
const usersRouter = require('./routes/users');
const investorRoutes = require('./routes/investorRoutes'); // Adjust the path as necessary
const MentorRoutes = require('./routes/mentorRoutes'); // Adjust the path as necessary
const studentRoutes = require('./routes/studentRoutes');
const entrepreneurRoutes = require('./routes/entrepreneurRoutes');


// const { default: ForgotPassword } = require("../frontend/src/components/forgotpassword");

dotenv.config();
const app = express();



// Middleware
app.use(express.json({ limit: '5mb' }));
app.use(cors());
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Establish database connections before starting the server
const startServer = async () => {
  
  try {
    await connectDB();
    await connectDB1();
    console.log('MongoDB connection established');
        app.get('/', (req, res) => {
            res.send('Welcome to the API');
        });
    // Import controllers
    const mentorController = require("./controllers/mentorController");
    const meetingController = require("./controllers/meetingController");
    const studentController = require("./controllers/studentController");
    const investorController = require("./controllers/investorController");
    const postControllers=require("./controllers/communityController");
    const allusercontroller=require("./controllers/allusercontroller")
    const entrepreneurcontroller=require('./controllers/entrepreneurcontroller');
    // Socket.io Setup
    app.get('/users/:id',allusercontroller.getUserById)
    app.get('/getstudents',studentController.getallstudents)
    app.use("/api/blogs", blogRoutes);
    app.use("/api/featuredStories", featuredStoryRoutes);
    app.use("/api/moreStories", moreStoryRoutes);
    app.use("/api/signup", userRoutes);
    app.use("/api/login", loginRoutes);
    app.use("/api/check-email", email);
    // app.use('/password', passwordRoutes);
    // app.post('/createMeet', createMeet);
        
    app.use('/api', investorRoutes); // Use the new routes
    app.use('/api', MentorRoutes);
    app.use('/api', studentRoutes);

    app.use('/api', entrepreneurRoutes);


    // Define API Endpoints
    app.get('/totaldata', getAllData);
    //app.get('/:name', getDataByName);
    app.get("/getmentors", mentorController.getAllMentors);
    app.get("/getentrepreneur",entrepreneurcontroller.getAllEntrepreneur);
    app.get("/getinvestors", investorController.getAllInvestors);
    app.post("/getInvestor", investorController.getInvestorById);
    app.post("/getEntrepreneur",entrepreneurcontroller.getentrepreneurById);
    app.post("/getMentor", mentorController.getmentortById);
    app.post("/getstudent", studentController.getStudentById);
    app.post("/schedulemeeting", meetingController.scheduleMeeting);
    app.post("/getmeetingstu", meetingController.getMeetingByStudentId);
    app.post("/updatestudent", studentController.updateStudent);
    app.post("/student/getprofileimg", studentController.getprofileimg);
    app.post("/getappointments", meetingController.getAppointmentsByMentorId);
    app.post("/updatestatus", meetingController.updateAppointmentStatus);
    app.post("/Mentor/getprofileimg", mentorController.getprofileimg);
    app.post("/Entrepreneur/getprofileimg",entrepreneurcontroller.getprofileimg);
    app.post("/Investor/getprofileimg", investorController.getprofileimg);
    app.post("/updatementor", mentorController.updateMentor);
    app.post("/updateentrepreneur",entrepreneurcontroller.updateentrepreneur);
    app.post("/updateinvestor", investorController.updateInvestor);


    //totalCount
    
    app.use('/api/total', totalCountRoutes); // Use the new routes

    app.use('/', usersRouter); // Use the new routes  

    //community
    app.post('/posts', upload.fields([{ name: 'images' }, { name: 'videos' }]), postControllers.createPost);
    app.put('/posts/:id', postControllers.updatePost);
    app.get('/posts/:id', postControllers.getPost);
    app.get('/posts', postControllers.getPosts);
    app.put('/posts/:id/like', postControllers.likePost);
    app.post('/posts/:id/comments', postControllers.addComment);
    app.delete('/posts/:id', postControllers.deletePost);

    app.post('/forgot_password',forgotPassword);
    app.post('/update_password',updatePassword)
    // Error Handler Middleware
    app.use(errorHandler);

    // Start Server
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database", error);
    process.exit(1);
  }
};

startServer();