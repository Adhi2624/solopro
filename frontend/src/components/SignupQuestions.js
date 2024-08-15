import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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
import Nav from "./nav";

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
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [emailvalid, setemailvalid] = useState(true);
  const [userType, setUserType] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [proofImage, setProofImage] = useState(null);
  const [proofImageUrl, setProofImageUrl] = useState("");
  const [userQuestions, setUserQuestions] = useState([]);
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

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
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
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
            alert("Email already exists. Redirecting to Login .");
            navigate("/login");
          }
        } catch (error) {
          console.error("Error checking email:", error);
          isValid = false;
        }
      }
    } else if (activeStep === 1) {
      let numlen = phoneNumber.length;
      if (
        !name ||
        !phoneNumber ||
        !password ||
        !confirmPassword ||
        numlen != 10
      ) {
        isValid = false;
        alert(
          "Name, Phone Number,  Password, and Confirm Password are required."
        );
      } else if (password !== confirmPassword) {
        isValid = false;
        alert("Passwords do not match.");
      }
    } else if (activeStep === 2) {
      if (!userType) {
        isValid = false;
        alert("User Type is required.");
      }
    } else if (activeStep === 3) {
      // Validate user questions
      for (const question of userQuestions) {
        if (question.required && !formData[question.questionName]) {
          isValid = false;
          alert(`Please answer the question: ${question.label}`);
          break;
        }
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
    // return <Typography variant="h1">hi</Typography>
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
                  name={question.questionName}
                  accept="image/*"
                  hidden
                  onChange={(e) =>
                    handleFileChange(e, setProofImage, setProofImageUrl)
                  }
                />
              </Button>
              {proofImageUrl && (
                <img
                  src={proofImageUrl}
                  alt="Proof"
                  style={{
                    maxWidth: "100px",
                    maxHeight: "100px",
                    marginBottom: "20px",
                  }}
                />
              )}
            </Box>
          );
        default:
          return null;
      }
    });
  };
  const handleemailchange = (e) => {
    const newemail = e.target.value;
    setEmail(newemail);
    const emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
    setemailvalid(emailregex.test(newemail));
  };
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    // Example regex: at least one uppercase letter, one digit, and 8 characters long
    setIsPasswordValid(passwordRegex.test(newPassword));
  };
  // Handle form submission
 
  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("email", email);
    formDataToSend.append("name", name);
    formDataToSend.append("phone", phoneNumber);
    formDataToSend.append("password", password);

    formDataToSend.append("userType", userType);

    if (profileImage) {
      formDataToSend.append("profileImage", profileImageUrl);
    }
    if (proofImage) {
      formDataToSend.append("proofImage", proofImageUrl);
    }

    userQuestions.forEach((question) => {
      formDataToSend.append(
        question.questionName,
        formData[question.questionName]
      );
    });

    const data = {};
    for (let pair of formDataToSend.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
      data[pair[0]] = pair[1];
    }

    console.log(formDataToSend, data);

    try {
      await axios.post(`${backend}/api/signup`, data);
      alert("Signup successful!");
      navigate("/login");
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred during signup. Please try again.");
    }
  };

  // Render the content for each step
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div>
            <CustomTextField
              label="Email"
              type={email}
              value={email}
              onChange={handleemailchange}
              fullWidth
              textAlign="centre"
              variant="outlined"
            />
            <Typography
              sx={{
                textAlign: "center",
                paddingTop: "10px",
                fontStyle: "montserrat",
                fontSize: "15px",
              }}
            >
              prefferably work mail :-)
            </Typography>
            <RouterLink to="/login" style={{ textDecoration: "none" }}>
              <Button fullWidth variant="outlined" sx={{ mt: 3, mb: 2 }}>
                Already Have an Account?
              </Button>
            </RouterLink>
          </div>
        );
      case 1:
        return (
          <>
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                fontStyle: "Montserrat",
                paddingBottom: "30px",
              }}
            >
              Tell us something about you
            </Typography>
            <CustomTextField
              label="Tell us your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{ marginBottom: "20px" }}
            />
            <CustomTextField
              label="Phone Number"
              type="number"
              value={phoneNumber}
              inputProps={{
                maxLength: 10,
                minLength: 10,
              }}
              onChange={(e) => setPhoneNumber(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{ marginBottom: "20px" }}
            />

            <div>
              <CustomTextField
                label="Set a Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                fullWidth
                variant="outlined"
                sx={{ marginBottom: "20px" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                        sx={{ color: "white" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  style: {
                    borderColor: isPasswordValid ? "inherit" : "red",
                  },
                }}
              />
              <Typography
                variant="body2"
                color={isPasswordValid ? "green" : "error"}
                sx={{ marginBottom: "20px" }}
              >
                Password must be at least 8 characters long, contain at least
                one uppercase letter and one digit.
              </Typography>
            </div>
            <CustomTextField
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{ marginBottom: "20px "}}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                    sx={{color: "white"}}
                      aria-label="toggle confirm password visibility"
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
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
                onChange={(e) =>
                  handleFileChange(e, setProfileImage, setProfileImageUrl)
                }
              />
            </Button>
            {profileImageUrl && (
              <img
                src={profileImageUrl}
                alt="Profile"
                style={{
                  maxWidth: "100px",
                  maxHeight: "100px",
                  marginBottom: "20px",
                }}
              />
            )}
          </>
        );
      case 2:
        return (
          <div>
            <Typography
              variant="h6"
              sx={{ marginBottom: "20px", textAlign: "center" }}
            >
              Tell us Who you are!
            </Typography>
            <FormControl fullWidth style={{ backgroundColor: "transparent" }}>
              <InputLabel style={{ color: "white" }}>I am a</InputLabel>
              <CustomSelect
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                label="User Type"
                style={{ color: "white" }}
                MenuProps={{
                  PaperProps: { style: { backdropFilter: "blur(8px)" } },
                }} // Ensure menu transparent
              >
                {Object.keys(questions).map((type) => (
                  <MenuItem key={type} value={type} style={{ color: "black" }}>
                    {type}
                  </MenuItem>
                ))}
              </CustomSelect>
            </FormControl>
          </div>
        );
      case 3:
        return (
          <div>
            <Typography
              variant="h6"
              sx={{ textAlign: "center", paddingBottom: "10px" }}
            >
              Tell us a lil bit more about yourself...
            </Typography>
            {renderUserQuestions()}
          </div>
        );
      case 4:
        return (
          <>
            <Typography
              variant="h6"
              sx={{ textAlign: "center", paddingBottom: "10px" }}
            >
              Review your details
            </Typography>
            <TableContainer component={Paper}>
  <Table style={{ backgroundColor: "transparent" }}>
    <TableHead>
      <TableRow>
        <TableCell>Field</TableCell>
        <TableCell>Value</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>Email</TableCell>
        <TableCell>{email}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>{name}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Phone Number</TableCell>
        <TableCell>{phoneNumber}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>User Type</TableCell>
        <TableCell>{userType}</TableCell>
      </TableRow>
      {userQuestions.map((question) => (
        <TableRow key={question.questionName}>
          <TableCell>{question.label}</TableCell>
          <TableCell>
            {question.questionName === "collegeIdCardImage" ? (
              
              <img
                src={isBase64Image(formData[question.questionName])}
                alt={question.label}
                style={{ maxWidth: "100px", maxHeight: "100px" }}
              />
            ) : (
              formData[question.questionName]
            )}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
          </>
        );
    }
  };
  const isBase64Image = (str) => {
    return typeof str === 'string' && str.startsWith('data:image/');
};
  return (
    <ThemeProvider theme={theme}>
      <Nav />

      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "20px",
          overflowX: "hidden",
        }}
      >
        <Typography
          sx={{ paddingBottom: "40px", fontSize: "25px", textAlign: "center" }}
        >
          Signing up into Solopro
        </Typography>
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: signUpLottie,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
            },
          }}
          height={400}
          width={400}
        />
        <Typography variant="h6" sx={{ marginBottom: "20px" }}>
          Let's get you signed up to Solopro
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <CustomStepLabel>{label}</CustomStepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ width: "100%", marginTop: "20px" }}>
          {renderStepContent(activeStep)}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            {/* <Typography>All done! click on sumbit to start a great jouney</Typography> */}
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={
                activeStep === steps.length - 2 ? handleSubmit : handleNext
              }
              sx={{ marginLeft: "auto" }}
            >
              {activeStep === steps.length - 2 ? "Done" : "Next"}
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default SignupQuestions;