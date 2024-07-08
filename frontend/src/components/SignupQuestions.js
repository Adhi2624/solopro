import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
import questions from "./questions.json"; // Import the JSON file
import Lottie from "react-lottie";
import signUpLottie from "./signuplottie.json"; // Import the Lottie animation

// Custom TextField styling for white text and border
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

// Custom StepLabel styling for white text
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

// Custom Select styling for black text and white border
const CustomSelect = styled(Select)({
  color: "black",
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
    "-webkit-text-fill-color": "black",
    "caret-color": "black",
  },
});

// Theme configuration with blue background
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#000000",
    },
    background: {
      default: "#07161F", // Blue shade for the background
    },
  },
  typography: {
    allVariants: {
      color: "white",
    },
  },
});

// Step labels for the stepper
const steps = [
  "Email Verification",
  "Basic Information",
  "User Type",
  "User Questions",
  "Additional Details",
  "Review & Submit",
];

const SignupQuestions = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [linkedinProfile, setLinkedinProfile] = useState("");
  const [userType, setUserType] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [proofImage, setProofImage] = useState(null);
  const [proofImageUrl, setProofImageUrl] = useState("");
  const [userQuestions, setUserQuestions] = useState([]);
  const [formData, setFormData] = useState({});

  const backend = process.env.REACT_APP_BACKEND;

  // Load questions based on user type
  useEffect(() => {
    if (userType) {
      setUserQuestions(questions[userType]);
    }
  }, [userType]);

  // Handle file change and resize the image
  const handleFileChange = (e, setFile, setFileUrl) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 500;
          const MAX_HEIGHT = 500;
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
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          const resizedImage = canvas.toDataURL("image/jpeg");
          setFileUrl(resizedImage);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle next step validation and progression
  const handleNext = async () => {
    if (await validateCurrentStep()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  // Handle back step
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Validate current step
  const validateCurrentStep = async () => {
    let isValid = true;
    if (activeStep === 0) {
      if (!email) {
        isValid = false;
        alert("Email is required.");
      } else {
        try {
          const response = await axios.post(`${backend}/api/check-email`, {
            email,
          });
          if (response.data.exists) {
            isValid = false;
            alert("Email already exists. Please use a different email.");
            navigate("/login");
          }
        } catch (error) {
          console.error("Error checking email:", error);
          isValid = false;
        }
      }
    } else if (activeStep === 1) {
      if (!name || !phoneNumber || !linkedinProfile) {
        isValid = false;
        alert("Name, Phone Number, and LinkedIn Profile are required.");
      }
    } else if (activeStep === 2) {
      if (!userType) {
        isValid = false;
        alert("User Type is required.");
      }
    }
    return isValid;
  };

  // Handle input change for text fields
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Render user-specific questions based on input type
  const renderUserQuestions = () => {
    return userQuestions.map((question) => {
      switch (question.inputType) {
        case "text":
          return (
            <CustomTextField
              key={question.questionName}
              label={question.label}
              name={question.questionName}
              required={question.required}
              fullWidth
              variant="outlined"
              sx={{ marginBottom: "20px" }}
              onChange={handleInputChange}
            />
          );
        case "number":
          return (
            <CustomTextField
              key={question.questionName}
              label={question.label}
              name={question.questionName}
              type="number"
              required={question.required}
              fullWidth
              variant="outlined"
              sx={{ marginBottom: "20px" }}
              onChange={handleInputChange}
            />
          );
        case "checkbox":
          return (
            <FormControlLabel
              key={question.questionName}
              control={
                <Checkbox
                  name={question.questionName}
                  onChange={handleInputChange}
                />
              }
              label={question.label}
              sx={{ marginBottom: "20px" }}
            />
          );
        case "file":
          return (
            <Box key={question.questionName}>
              <Button
                variant="contained"
                component="label"
                sx={{ marginBottom: "20px" }}
              >
                {question.label}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => handleFileChange(e, setProfileImage, setProfileImageUrl)}
                />
              </Button>
              {profileImageUrl && (
                <Box
                  component="img"
                  sx={{
                    height: 100,
                    width: 100,
                    marginBottom: "20px",
                  }}
                  alt="Profile Preview"
                  src={profileImageUrl}
                />
              )}
            </Box>
          );
        default:
          return null;
      }
    });
  };

  // Render content for each step
  const renderStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <CustomTextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            sx={{ marginBottom: "20px" }}
          />
        );
      case 1:
        return (
          <>
            <CustomTextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
              sx={{ marginBottom: "20px" }}
            />
            <CustomTextField
              label="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              fullWidth
              required
              sx={{ marginBottom: "20px" }}
            />
            <CustomTextField
              label="LinkedIn Profile"
              value={linkedinProfile}
              onChange={(e) => setLinkedinProfile(e.target.value)}
              fullWidth
              required
              sx={{ marginBottom: "20px" }}
            />
          </>
        );
      case 2:
        return (
          <FormControl fullWidth>
            <InputLabel>User Type</InputLabel>
            <CustomSelect
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Student">Student</MenuItem>
              <MenuItem value="Mentor">Mentor</MenuItem>
              <MenuItem value="Investor">Investor</MenuItem>
              <MenuItem value="Organization">Organization</MenuItem>
            </CustomSelect>
          </FormControl>
        );
      case 3:
        return renderUserQuestions();
      case 4:
        return (
          <>
            <Button
              variant="contained"
              component="label"
              sx={{ marginBottom: "20px" }}
            >
              Upload Profile Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => handleFileChange(e, setProfileImage, setProfileImageUrl)}
              />
            </Button>
            {profileImageUrl && (
              <Box
                component="img"
                sx={{
                  height: 100,
                  width: 100,
                  marginBottom: "20px",
                }}
                alt="Profile Preview"
                src={profileImageUrl}
              />
            )}
            <Button
              variant="contained"
              component="label"
              sx={{ marginBottom: "20px" }}
            >
              Upload Proof of Identity
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => handleFileChange(e, setProofImage, setProofImageUrl)}
              />
            </Button>
            {proofImageUrl && (
              <Box
                component="img"
                sx={{
                  height: 100,
                  width: 100,
                  marginBottom: "20px",
                }}
                alt="Proof Preview"
                src={proofImageUrl}
              />
            )}
          </>
        );
      case 5:
        return (
          <TableContainer component={Paper} style={{ backgroundColor: "#07161F" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: "white" }}>Field</TableCell>
                  <TableCell style={{ color: "white" }}>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell style={{ color: "white" }}>Email</TableCell>
                  <TableCell style={{ color: "white" }}>{email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ color: "white" }}>Name</TableCell>
                  <TableCell style={{ color: "white" }}>{name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ color: "white" }}>Phone Number</TableCell>
                  <TableCell style={{ color: "white" }}>{phoneNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ color: "white" }}>LinkedIn Profile</TableCell>
                  <TableCell style={{ color: "white" }}>{linkedinProfile}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ color: "white" }}>User Type</TableCell>
                  <TableCell style={{ color: "white" }}>{userType}</TableCell>
                </TableRow>
                {Object.entries(formData).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell style={{ color: "white" }}>{key}</TableCell>
                    <TableCell style={{ color: "white" }}>{value.toString()}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell style={{ color: "white" }}>Profile Image</TableCell>
                  <TableCell>
                    {profileImageUrl && (
                      <Box
                        component="img"
                        sx={{
                          height: 100,
                          width: 100,
                        }}
                        alt="Profile"
                        src={profileImageUrl}
                      />
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ color: "white" }}>Proof Image</TableCell>
                  <TableCell>
                    {proofImageUrl && (
                      <Box
                        component="img"
                        sx={{
                          height: 100,
                          width: 100,
                        }}
                        alt="Proof"
                        src={proofImageUrl}
                      />
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        );
      default:
        return null;
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("email", email);
    formDataToSubmit.append("name", name);
    formDataToSubmit.append("phoneNumber", phoneNumber);
    formDataToSubmit.append("linkedinProfile", linkedinProfile);
    formDataToSubmit.append("userType", userType);
    formDataToSubmit.append("profileImage", profileImage);
    formDataToSubmit.append("proofImage", proofImage);

    for (const [key, value] of Object.entries(formData)) {
      formDataToSubmit.append(key, value);
    }

    try {
      await axios.post(`${backend}/api/signup`, formDataToSubmit, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred during registration. Please try again.");
    }
  };

  // Lottie animation options
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: signUpLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <ThemeProvider theme={theme}>
      
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#07161F",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "800px",
            // backgroundColor: "#000",
            borderRadius: "10px",
            padding: "20px",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
          }}
        >
          <Lottie options={defaultOptions} height={500}  />
          <Typography variant="h4" align="center" gutterBottom>
            User Registration
          </Typography>
      <Nav/>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <CustomStepLabel>{label}</CustomStepLabel>
              </Step>
            ))}
          </Stepper>
          <Box sx={{ marginTop: "20px" }}>
            {renderStepContent(activeStep)}
            <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ marginRight: "10px" }}
              >
                Back
              </Button>
              {activeStep === steps.length - 1 ? (
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                  Submit
                </Button>
              ) : (
                <Button variant="contained" color="primary" onClick={handleNext}>
                  Next
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default SignupQuestions;
