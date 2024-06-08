const express = require("express");
const cors = require("cors");
const mentorController = require("./controllers/mentorController");
const studentController = require("./controllers/studentController");
const meetingController = require("./controllers/meetingController");
const { errorHandler } = require("./middleware/errorHandler");
const { connectDB } = require("./db"); // Import connectDB function

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB before setting up routes
connectDB()
    .then(() => {
        console.log("MongoDB connection established");
        
        app.get("/getmentors", mentorController.getAllMentors);
        app.post("/getmentor", mentorController.getAppointmentById);
        app.post("/getstudent", studentController.getStudentById);
        app.post("/schedulemeeting", meetingController.scheduleMeeting);
        app.post("/getmeetingstu", meetingController.getMeetingByStudentId);
        app.post("/getappointments", meetingController.getAppointmentsByMentorId);
        app.post("/updatestatus", meetingController.updateAppointmentStatus);

        app.use(errorHandler);

        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error("Error establishing MongoDB connection:", error);
        process.exit(1); // Stop the server if there's an error connecting to MongoDB
    });
