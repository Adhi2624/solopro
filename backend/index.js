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


const blogRoutes = require("./routes/blogs");
const featuredStoryRoutes = require("./routes/featuredStories");
const moreStoryRoutes = require("./routes/moreStories");
const userRoutes = require("./routes/userRoutes");
const loginRoutes = require("./routes/loginRoutes");

const email = require("./controllers/emailverify");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Establish database connections before starting the server
const startServer = async () => {
  try {
    await connectDB();
    await connectDB1();
    // Import controllers
    const mentorController = require("./controllers/mentorController");
    const meetingController = require("./controllers/meetingController");
    const studentController = require("./controllers/studentController");
    const investorController = require("./controllers/investorController");
    const postControllers=require("./controllers/communityController");
    // Socket.io Setup
    
    
    app.use("/api/blogs", blogRoutes);
    app.use("/api/featuredStories", featuredStoryRoutes);
    app.use("/api/moreStories", moreStoryRoutes);
    app.use("/api/signup", userRoutes);
    app.use("/api/login", loginRoutes);
    app.use("/api/check-email", email);
    

    // Define API Endpoints
    app.get("/getmentors", mentorController.getAllMentors);
    app.get("/getinvestors", investorController.getAllInvestors);
    app.post("/getInvestor", investorController.getInvestorById);
    app.post("/getMentor", mentorController.getmentortById);
    app.post("/getstudent", studentController.getStudentById);
    app.post("/schedulemeeting", meetingController.scheduleMeeting);
    app.post("/getmeetingstu", meetingController.getMeetingByStudentId);
    app.post("/updatestudent", studentController.updateStudent);
    app.post("/student/getprofileimg", studentController.getprofileimg);
    app.post("/getappointments", meetingController.getAppointmentsByMentorId);
    app.post("/updatestatus", meetingController.updateAppointmentStatus);
    app.post("/Mentor/getprofileimg", mentorController.getprofileimg);
    app.post("/Investor/getprofileimg", investorController.getprofileimg);
    app.post("/updatementor", mentorController.updateMentor);
    app.post("/updateinvestor", investorController.updateInvestor);


    //community
    app.post('/posts', upload.fields([{ name: 'images' }, { name: 'videos' }]), postControllers.createPost);
    app.put('/posts/:id', postControllers.updatePost);
    app.get('/posts', postControllers.getPosts);
    app.put('/posts/:id/like', postControllers.likePost);
    app.post('/posts/:id/comments', postControllers.addComment);
    app.delete('/posts/:id', postControllers.deletePost);


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
