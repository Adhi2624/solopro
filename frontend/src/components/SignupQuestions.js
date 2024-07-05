import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import lottie from "./BLOG.json";
import {
  TextField,
  Button,
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import Lottie from "react-lottie";
import axios from "axios";

const CustomTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
  "& input:-webkit-autofill": {
    "-webkit-box-shadow": "0 0 0 1000px #000 inset",
    "-webkit-text-fill-color": "white",
    "caret-color": "white",
  },
});

const CustomStepLabel = styled(StepLabel)({
  "& .MuiStepLabel-label": {
    color: "white",
  },
  "& .MuiStepLabel-label.Mui-active": {
    color: "white",
  },
  "& .MuiStepLabel-label.Mui-completed": {
    color: "white",
  },
});

const CustomSelect = styled(Select)({
  color: "white",
  borderColor: "white",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
  "& .MuiSelect-select": {
    backgroundColor: "transparent",
  },
  "& input:-webkit-autofill": {
    "-webkit-box-shadow": "0 0 0 1000px #000 inset",
    "-webkit-text-fill-color": "white",
    "caret-color": "white",
  },
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

const steps = [
  "Email Verification",
  "Basic Information",
  "User Questions",
  "User Type",
  "Additional Details",
  "Review & Submit",
];

const SignupQuestions = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userQuestions, setUserQuestions] = useState([]);
  const [userType, setUserType] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [course, setCourse] = useState("");
  const [collegeLocation, setCollegeLocation] = useState("");
  const [git, setGit] = useState("");
  const [collegeIdPhoto, setCollegeIdPhoto] = useState(null);
  const [collegeIdPhotoUrl, setCollegeIdPhotoUrl] = useState("");
  const [areaOfExpertise, setAreaOfExpertise] = useState("");
  const [experience, setExperience] = useState("");
  const [availableToMentor, setAvailableToMentor] = useState(false);
  const [mentorshipCount, setMentorshipCount] = useState("");
  const [availableToInvest, setAvailableToInvest] = useState(false);
  const [investmentCount, setInvestmentCount] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [proofImage, setProofImage] = useState(null);
  const [proofImageUrl, setProofImageUrl] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [orgnName, setOrgnName] = useState("");
  const [orgnHead, setOrgnHead] = useState("");
  const [orgnLocation, setOrgnLocation] = useState("");
  const [orgnType, setOrgnType] = useState("");
  const [orgnProofPhoto, setOrgnProofPhoto] = useState(null);
  const [orgnProofPhotoUrl, setOrgnProofPhotoUrl] = useState("");

  const backend = process.env.REACT_APP_BACKEND;

  const handleInputChange = (key, value) => {
    setUserQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.key === key ? { ...question, value } : question
      )
    );
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleNext = async () => {
    if (await validateCurrentStep()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFileChange = (e, setFile, setFileUrl) => {
    const file = e.target.files[0];
    if (file) {
        setFile(file);

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 500; // Set maximum width for resizing
                const MAX_HEIGHT = 500; // Set maximum height for resizing
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                const dataUrl = canvas.toDataURL('image/jpeg'); // Converts image to base64 JPEG format
                setFileUrl(dataUrl);
            };
            img.src = event.target.result;
        };

        reader.readAsDataURL(file);
    }
};


  const validateCurrentStep = async () => {
    let isValid = true;

    if (activeStep === 0) {
      if (!email) {
        isValid = false;
        alert("Please enter your email.");
      } else {
        try {
          const response = await axios.post(`${backend}/api/check-email`, {
            email,
          });
          if (response.data.exists) {
            alert(
              "This email is already in use. Redirecting to the login page."
            );
            navigate("/login");
            isValid = false;
          }
        } catch (error) {
          console.error("Error checking email:", error);
          alert("There was an error checking your email.");
          isValid = false;
        }
      }
    } else if (activeStep === 1) {
      if (!email || !password || !confirmPassword) {
        isValid = false;
        alert("All fields are required.");
      } else if (password !== confirmPassword) {
        isValid = false;
        alert("Passwords do not match.");
      }
    } else if (activeStep === 2) {
      const incompleteQuestion = userQuestions.some((q) => !q.value);
      if (incompleteQuestion) {
        isValid = false;
        alert("All questions are mandatory.");
      }
    } else if (activeStep === 3) {
      if (!userType) {
        isValid = false;
        alert("Please select a user type.");
      }
    } else if (activeStep === 4) {
      if (userType === "Student") {
        if (
          !collegeName ||
          !course ||
          !collegeLocation ||
          !git ||
          !collegeIdPhotoUrl
        ) {
          isValid = false;
          alert("All fields are required for students.");
        }
      } else if (userType === "Mentor") {
        if (
          !areaOfExpertise ||
          !experience ||
          (availableToMentor && !mentorshipCount)
        ) {
          isValid = false;
          alert("All fields are required for mentors.");
        }
      } else if (userType === "Investor") {
        if (
          (availableToInvest && (!investmentCount || !investmentAmount)) ||
          !proofImageUrl
        ) {
          isValid = false;
          alert("All fields are required for investors.");
        }
      } else if (userType === "Organization") {
        if (
          !orgnName ||
          !orgnHead ||
          !orgnLocation ||
          !orgnType ||
          !orgnProofPhotoUrl
        ) {
          isValid = false;
          alert("All fields are required for organizations.");
        }
      }
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (await validateCurrentStep()) {
      const userData = {
        email,
        password,
        userQuestions,
        userType,
        collegeName,
        course,
        collegeLocation,
        git,
        collegeIdPhotoUrl,
        areaOfExpertise,
        experience,
        availableToMentor,
        mentorshipCount,
        availableToInvest,
        investmentCount,
        investmentAmount,
        proofImageUrl,
        profileImageUrl,
        orgnName,
        orgnHead,
        orgnLocation,
        orgnType,
        orgnProofPhotoUrl,
      };
      try {
        await axios.post(`${backend}/api/submit-signup`, userData);
        alert("Signup successful!");
        navigate("/login");
      } catch (error) {
        console.error("Error submitting signup:", error);
        alert("There was an error submitting your signup.");
      }
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Lottie options={defaultOptions} height={400} width={400} />
            <Typography variant="h6">Email Verification</Typography>
            <CustomTextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
        );
      case 1:
        return (
          <Box>
            <Lottie options={defaultOptions} height={400} width={400} />
            <Typography variant="h6">Basic Information</Typography>
            <CustomTextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <CustomTextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Box>
        );
      case 2:
        return (
          <Box>
            <Lottie options={defaultOptions} height={400} width={400} />
            <Typography variant="h6">
              Lets Proceed with User Specific Questions
            </Typography>
            {userQuestions.map((question, index) => (
              <CustomTextField
                key={index}
                label={question.question}
                variant="outlined"
                fullWidth
                value={question.value}
                onChange={(e) =>
                  handleInputChange(question.key, e.target.value)
                }
              />
            ))}
          </Box>
        );
      case 3:
        return (
          <Box>
            <Lottie options={defaultOptions} height={400} width={400} />
            <Typography variant="h6">User Type</Typography>
            <FormControl fullWidth>
              <InputLabel>User Type</InputLabel>
              <CustomSelect
                value={userType}
                onChange={handleUserTypeChange}
                label="User Type"
              >
                <MenuItem value="Student">Student</MenuItem>
                <MenuItem value="Mentor">Mentor</MenuItem>
                <MenuItem value="Investor">Investor</MenuItem>
                <MenuItem value="Organization">Organization</MenuItem>
              </CustomSelect>
            </FormControl>
          </Box>
        );
      case 4:
        return (
          <Box>
            <Lottie options={defaultOptions} height={400} width={400} />
            <Typography variant="h6">Additional Details</Typography>
            {userType === "Student" && (
              <>
                <CustomTextField
                  label="College Name"
                  variant="outlined"
                  fullWidth
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                />
                <CustomTextField
                  label="Course"
                  variant="outlined"
                  fullWidth
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                />
                <CustomTextField
                  label="College Location"
                  variant="outlined"
                  fullWidth
                  value={collegeLocation}
                  onChange={(e) => setCollegeLocation(e.target.value)}
                />
                <CustomTextField
                  label="GitHub Profile"
                  variant="outlined"
                  fullWidth
                  value={git}
                  onChange={(e) => setGit(e.target.value)}
                />
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Upload College ID Photo
                  <input
                    type="file"
                    hidden
                    onChange={(e) =>
                      handleFileChange(
                        e,
                        setCollegeIdPhoto,
                        setCollegeIdPhotoUrl
                      )
                    }
                  />
                </Button>
                {collegeIdPhotoUrl && (
                  <img
                    src={collegeIdPhotoUrl}
                    alt="College ID"
                    style={{ width: "100%", marginTop: "10px" }}
                  />
                )}
              </>
            )}
            {userType === "Mentor" && (
              <>
                <CustomTextField
                  label="Area of Expertise"
                  variant="outlined"
                  fullWidth
                  value={areaOfExpertise}
                  onChange={(e) => setAreaOfExpertise(e.target.value)}
                />
                <CustomTextField
                  label="Years of Experience"
                  variant="outlined"
                  fullWidth
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={availableToMentor}
                      onChange={(e) => setAvailableToMentor(e.target.checked)}
                    />
                  }
                  label="Available to Mentor"
                />
                {availableToMentor && (
                  <CustomTextField
                    label="Number of People Mentored"
                    variant="outlined"
                    fullWidth
                    value={mentorshipCount}
                    onChange={(e) => setMentorshipCount(e.target.value)}
                  />
                )}
              </>
            )}
            {userType === "Investor" && (
              <>
                <FormControlLabel
                  control={
                    <Switch
                      checked={availableToInvest}
                      onChange={(e) => setAvailableToInvest(e.target.checked)}
                    />
                  }
                  label="Available to Invest"
                />
                {availableToInvest && (
                  <>
                    <CustomTextField
                      label="Number of Investments"
                      variant="outlined"
                      fullWidth
                      value={investmentCount}
                      onChange={(e) => setInvestmentCount(e.target.value)}
                    />
                    <CustomTextField
                      label="Total Investment Amount"
                      variant="outlined"
                      fullWidth
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(e.target.value)}
                    />
                  </>
                )}
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Upload Proof of Investment
                  <input
                    type="file"
                    hidden
                    onChange={(e) =>
                      handleFileChange(e, setProofImage, setProofImageUrl)
                    }
                  />
                </Button>
                {proofImageUrl && (
                  <img
                    src={proofImageUrl}
                    alt="Proof of Investment"
                    style={{ width: "100%", marginTop: "10px" }}
                  />
                )}
              </>
            )}
            {userType === "Organization" && (
              <>
                <CustomTextField
                  label="Organization Name"
                  variant="outlined"
                  fullWidth
                  value={orgnName}
                  onChange={(e) => setOrgnName(e.target.value)}
                />
                <CustomTextField
                  label="Organization Head"
                  variant="outlined"
                  fullWidth
                  value={orgnHead}
                  onChange={(e) => setOrgnHead(e.target.value)}
                />
                <CustomTextField
                  label="Organization Location"
                  variant="outlined"
                  fullWidth
                  value={orgnLocation}
                  onChange={(e) => setOrgnLocation(e.target.value)}
                />
                <CustomTextField
                  label="Organization Type"
                  variant="outlined"
                  fullWidth
                  value={orgnType}
                  onChange={(e) => setOrgnType(e.target.value)}
                />
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Upload Proof of Organization
                  <input
                    type="file"
                    hidden
                    onChange={(e) =>
                      handleFileChange(
                        e,
                        setOrgnProofPhoto,
                        setOrgnProofPhotoUrl
                      )
                    }
                  />
                </Button>
                {orgnProofPhotoUrl && (
                  <img
                    src={orgnProofPhotoUrl}
                    alt="Proof of Organization"
                    style={{ width: "100%", marginTop: "10px" }}
                  />
                )}
              </>
            )}
          </Box>
        );
      case 5:
        return (
          <Box>
            <Lottie options={defaultOptions} height={400} width={400} />
            <Typography variant="h6">Review & Submit</Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {email}
            </Typography>
            <Typography variant="body1">
              <strong>User Type:</strong> {userType}
            </Typography>
            {userQuestions.map((question, index) => (
              <Typography key={index} variant="body1">
                <strong>{question.question}:</strong> {question.value}
              </Typography>
            ))}
            {userType === "Student" && (
              <>
                <Typography variant="body1">
                  <strong>College Name:</strong> {collegeName}
                </Typography>
                <Typography variant="body1">
                  <strong>Course:</strong> {course}
                </Typography>
                <Typography variant="body1">
                  <strong>College Location:</strong> {collegeLocation}
                </Typography>
                <Typography variant="body1">
                  <strong>GitHub Profile:</strong> {git}
                </Typography>
                {collegeIdPhotoUrl && (
                  <img
                    src={collegeIdPhotoUrl}
                    alt="College ID"
                    style={{ width: "100%", marginTop: "10px" }}
                  />
                )}
              </>
            )}
            {userType === "Mentor" && (
              <>
                <Typography variant="body1">
                  <strong>Area of Expertise:</strong> {areaOfExpertise}
                </Typography>
                <Typography variant="body1">
                  <strong>Years of Experience:</strong> {experience}
                </Typography>
                <Typography variant="body1">
                  <strong>Available to Mentor:</strong>{" "}
                  {availableToMentor ? "Yes" : "No"}
                </Typography>
                {availableToMentor && (
                  <Typography variant="body1">
                    <strong>Number of People Mentored:</strong>{" "}
                    {mentorshipCount}
                  </Typography>
                )}
              </>
            )}
            {userType === "Investor" && (
              <>
                <Typography variant="body1">
                  <strong>Available to Invest:</strong>{" "}
                  {availableToInvest ? "Yes" : "No"}
                </Typography>
                {availableToInvest && (
                  <>
                    <Typography variant="body1">
                      <strong>Number of Investments:</strong> {investmentCount}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Total Investment Amount:</strong>{" "}
                      {investmentAmount}
                    </Typography>
                  </>
                )}
                {proofImageUrl && (
                  <img
                    src={proofImageUrl}
                    alt="Proof of Investment"
                    style={{ width: "100%", marginTop: "10px" }}
                  />
                )}
              </>
            )}
            {userType === "Organization" && (
              <>
                <Typography variant="body1">
                  <strong>Organization Name:</strong> {orgnName}
                </Typography>
                <Typography variant="body1">
                  <strong>Organization Head:</strong> {orgnHead}
                </Typography>
                <Typography variant="body1">
                  <strong>Organization Location:</strong> {orgnLocation}
                </Typography>
                <Typography variant="body1">
                  <strong>Organization Type:</strong> {orgnType}
                </Typography>
                {orgnProofPhotoUrl && (
                  <img
                    src={orgnProofPhotoUrl}
                    alt="Proof of Organization"
                    style={{ width: "100%", marginTop: "10px" }}
                  />
                )}
              </>
            )}
          </Box>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%", color: "white" }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <CustomStepLabel>{label}</CustomStepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <Box>
            <Typography variant="h6" gutterBottom>
              All steps completed
            </Typography>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        ) : (
          <Box>
            {renderStepContent(activeStep)}
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Submit" : "Next"}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default SignupQuestions;
