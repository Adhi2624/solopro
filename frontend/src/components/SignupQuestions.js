import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import lottie from "./signuplottie.json";
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
      main: "#000000",
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
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
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
    console.log(activeStep);
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
          const canvas = document.createElement("canvas");
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
          }
        } catch (error) {
          console.error("Error checking email:", error);
          isValid = false;
        }
      }
    } else if (activeStep === 1) {
      if (!email || !password || !confirmPassword || !name || !phoneNumber) {
        isValid = false;
        alert("All fields are required.");
      } else if (password !== confirmPassword) {
        isValid = false;
        alert("Passwords do not match.");
      }
    } else if (activeStep === 2) {
      // Validate user questions
      userQuestions.forEach((question) => {
        if (!question.value) {
          isValid = false;
          alert("All user questions must be answered.");
        }
      });
    } else if (activeStep === 3) {
      if (!userType) {
        isValid = false;
        alert("User type is required.");
      }
    } else if (activeStep === 4) {
      if (userType === "Student") {
        if (!collegeName || !course || !collegeLocation || !collegeIdPhotoUrl) {
          isValid = false;
          alert("All Student details are required.");
        }
      } else if (userType === "professional") {
        if (!areaOfExpertise || !experience || !proofImageUrl || !profileImageUrl) {
          isValid = false;
          alert("All professional details are required.");
        }
      } else if (userType === "organization") {
        if (!orgnName || !orgnHead || !orgnLocation || !orgnType || !orgnProofPhotoUrl) {
          isValid = false;
          alert("All organization details are required.");
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
        name,
        phoneNumber,
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
        const response = await axios.post(`${backend}/api/signup`, userData);
        console.log("Signup successful:", response.data);
        navigate("/welcome");
      } catch (error) {
        console.error("Error during signup:", error);
        alert("Signup failed. Please try again.");
      }
    }
  };

  const renderStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <Box >
            <Lottie options={defaultOptions} height={400} width={400} />
            <Typography variant="h6" sx={{ marginBottom: "20px" }}>
              Email Verification
            </Typography>
            <CustomTextField
              sx={{ marginBottom: "20px" }}
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
            <Typography variant="h6" sx={{ marginBottom: "20px" }}>
              Basic Information
            </Typography>
            <CustomTextField
              sx={{ marginBottom: "20px" }}
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <CustomTextField
              sx={{ marginBottom: "20px" }}
              label="Phone Number"
              variant="outlined"
              fullWidth
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <CustomTextField
              sx={{ marginBottom: "20px" }}
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <CustomTextField
              sx={{ marginBottom: "20px" }}
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
            <Typography variant="h6" sx={{ marginBottom: "20px" }}>
              User Questions
            </Typography>
            {userQuestions.map((question, index) => (
              <CustomTextField
                key={index}
                sx={{ marginBottom: "20px" }}
                label={question.key}
                variant="outlined"
                fullWidth
                value={question.value}
                onChange={(e) => handleInputChange(question.key, e.target.value)}
              />
            ))}
          </Box>
        );
      case 3:
        return (
          <Box>
            <Typography variant="h6" sx={{ marginBottom: "20px" }}>
              User Type
            </Typography>
            <FormControl fullWidth variant="outlined">
              <InputLabel>User Type</InputLabel>
              <CustomSelect value={userType} onChange={handleUserTypeChange} label="User Type">
                <MenuItem value="Student">Student</MenuItem>
                <MenuItem value="Mentor">Mentor</MenuItem>
                <MenuItem value="Investor">Investor</MenuItem>
                <MenuItem value="organization">Organization</MenuItem>
              </CustomSelect>
            </FormControl>
          </Box>
        );
      case 4:
        const StudentDetails = ({
          collegeName,
          setCollegeName,
          course,
          setCourse,
          collegeLocation,
          setCollegeLocation,
          git,
          setGit,
          handleFileChange,
          collegeIdPhotoUrl,
          setCollegeIdPhoto,
          setCollegeIdPhotoUrl,
        }) => {
          return (
            <Box>
              <Typography variant="h6" sx={{ marginBottom: "20px" }}>
                Student Details
              </Typography>
              <CustomTextField
                sx={{ marginBottom: "20px" }}
                label="College Name"
                variant="outlined"
                fullWidth
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
              />
              <CustomTextField
                sx={{ marginBottom: "20px" }}
                label="Course"
                variant="outlined"
                fullWidth
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              />
              <CustomTextField
                sx={{ marginBottom: "20px" }}
                label="College Location"
                variant="outlined"
                fullWidth
                value={collegeLocation}
                onChange={(e) => setCollegeLocation(e.target.value)}
              />
              <CustomTextField
                sx={{ marginBottom: "20px" }}
                label="GitHub Profile"
                variant="outlined"
                fullWidth
                value={git}
                onChange={(e) => setGit(e.target.value)}
              />
              <Button
                variant="contained"
                component="label"
                sx={{ marginBottom: "20px" }}
              >
                Upload College ID Photo
                <input
                  type="file"
                  hidden
                  onChange={(e) =>
                    handleFileChange(e, setCollegeIdPhoto, setCollegeIdPhotoUrl)
                  }
                />
              </Button>
              {collegeIdPhotoUrl && (
                <img
                  src={collegeIdPhotoUrl}
                  alt="College ID"
                  style={{ width: "200px", marginBottom: "20px" }}
                />
              )}
            </Box>
          );
        };
        const MentorDetails = ({
          areaOfExpertise,
          setAreaOfExpertise,
          experience,
          setExperience,
          availableToMentor,
          setAvailableToMentor,
          mentorshipCount,
          setMentorshipCount,
          handleFileChange,
          proofImageUrl,
          setProofImage,
          setProofImageUrl,
          profileImageUrl,
          setProfileImage,
          setProfileImageUrl,
        }) => {
          return (
            <Box>
              <Typography variant="h6" sx={{ marginBottom: "20px" }}>
                Professional Details
              </Typography>
              <CustomTextField
                sx={{ marginBottom: "20px" }}
                label="Area of Expertise"
                variant="outlined"
                fullWidth
                value={areaOfExpertise}
                onChange={(e) => setAreaOfExpertise(e.target.value)}
              />
              <CustomTextField
                sx={{ marginBottom: "20px" }}
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
                sx={{ marginBottom: "20px" }}
              />
              {availableToMentor && (
                <Box>
                  <CustomTextField
                    sx={{ marginBottom: "20px" }}
                    label="Number of People Mentored"
                    variant="outlined"
                    fullWidth
                    value={mentorshipCount}
                    onChange={(e) => setMentorshipCount(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    component="label"
                    sx={{ marginBottom: "20px" }}
                  >
                    Upload Proof of Expertise
                    <input
                      type="file"
                      hidden
                      onChange={(e) => handleFileChange(e, setProofImage, setProofImageUrl)}
                    />
                  </Button>
                  {proofImageUrl && (
                    <img
                      src={proofImageUrl}
                      alt="Proof of Expertise"
                      style={{ width: "200px", marginBottom: "20px" }}
                    />
                  )}
                </Box>
              )}
        
              <Button
                variant="contained"
                component="label"
                sx={{ marginBottom: "20px" }}
              >
                Upload Profile Image
                <input
                  type="file"
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
                  style={{ width: "200px", marginBottom: "20px" }}
                />
              )}
            </Box>
          );
        };
        const InvestorDetails = ({
          areaOfExpertise,
          setAreaOfExpertise,
          experience,
          setExperience,
          availableToInvest,
          setAvailableToInvest,
          investmentCount,
          setInvestmentCount,
          investmentAmount,
          setInvestmentAmount,
          handleFileChange,
          proofImageUrl,
          setProofImage,
          setProofImageUrl,
          profileImageUrl,
          setProfileImage,
          setProfileImageUrl,
        }) => {
          return (
            <Box>
              <Typography variant="h6" sx={{ marginBottom: "20px" }}>
                Professional Details
              </Typography>
              <CustomTextField
                sx={{ marginBottom: "20px" }}
                label="Area of Expertise"
                variant="outlined"
                fullWidth
                value={areaOfExpertise}
                onChange={(e) => setAreaOfExpertise(e.target.value)}
              />
              <CustomTextField
                sx={{ marginBottom: "20px" }}
                label="Years of Experience"
                variant="outlined"
                fullWidth
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
        
              <FormControlLabel
                control={
                  <Switch
                    checked={availableToInvest}
                    onChange={(e) => setAvailableToInvest(e.target.checked)}
                  />
                }
                label="Available to Invest"
                sx={{ marginBottom: "20px" }}
              />
              {availableToInvest && (
                <Box>
                  <CustomTextField
                    sx={{ marginBottom: "20px" }}
                    label="Number of Investments"
                    variant="outlined"
                    fullWidth
                    value={investmentCount}
                    onChange={(e) => setInvestmentCount(e.target.value)}
                  />
                  <CustomTextField
                    sx={{ marginBottom: "20px" }}
                    label="Total Investment Amount"
                    variant="outlined"
                    fullWidth
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    component="label"
                    sx={{ marginBottom: "20px" }}
                  >
                    Upload Proof of Expertise
                    <input
                      type="file"
                      hidden
                      onChange={(e) => handleFileChange(e, setProofImage, setProofImageUrl)}
                    />
                  </Button>
                  {proofImageUrl && (
                    <img
                      src={proofImageUrl}
                      alt="Proof of Expertise"
                      style={{ width: "200px", marginBottom: "20px" }}
                    />
                  )}
                </Box>
              )}
        
              <Button
                variant="contained"
                component="label"
                sx={{ marginBottom: "20px" }}
              >
                Upload Profile Image
                <input
                  type="file"
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
                  style={{ width: "200px", marginBottom: "20px" }}
                />
              )}
            </Box>
          );
        };
        const OrganizationDetails = ({
          orgnName,
          setOrgnName,
          orgnHead,
          setOrgnHead,
          orgnLocation,
          setOrgnLocation,
          orgnType,
          setOrgnType,
          handleFileChange,
          orgnProofPhotoUrl,
          setOrgnProofPhoto,
          setOrgnProofPhotoUrl,
        }) => {
          return (
            <Box>
              <Typography variant="h6" sx={{ marginBottom: "20px" }}>
                Organization Details
              </Typography>
              <CustomTextField
                sx={{ marginBottom: "20px" }}
                label="Organization Name"
                variant="outlined"
                fullWidth
                value={orgnName}
                onChange={(e) => setOrgnName(e.target.value)}
              />
              <CustomTextField
                sx={{ marginBottom: "20px" }}
                label="Head of Organization"
                variant="outlined"
                fullWidth
                value={orgnHead}
                onChange={(e) => setOrgnHead(e.target.value)}
              />
              <CustomTextField
                sx={{ marginBottom: "20px" }}
                label="Location"
                variant="outlined"
                fullWidth
                value={orgnLocation}
                onChange={(e) => setOrgnLocation(e.target.value)}
              />
              <CustomTextField
                sx={{ marginBottom: "20px" }}
                label="Type"
                variant="outlined"
                fullWidth
                value={orgnType}
                onChange={(e) => setOrgnType(e.target.value)}
              />
              <Button
                variant="contained"
                component="label"
                sx={{ marginBottom: "20px" }}
              >
                Upload Proof of Organization
                <input
                  type="file"
                  hidden
                  onChange={(e) =>
                    handleFileChange(e, setOrgnProofPhoto, setOrgnProofPhotoUrl)
                  }
                />
              </Button>
              {orgnProofPhotoUrl && (
                <img
                  src={orgnProofPhotoUrl}
                  alt="Proof of Organization"
                  style={{ width: "200px", marginBottom: "20px" }}
                />
              )}
            </Box>
          );
        };
const MainComponent = (props) => {
  const { userType, ...otherProps } = props;

  if (userType === "Student") {
    return <StudentDetails {...otherProps} />;
  } else if (userType === "Mentor") {
    return <MentorDetails {...otherProps} />;
  } else if (userType === "Investor") {
    return <InvestorDetails {...otherProps} />;
  } else if (userType === "Organization") {
    return <OrganizationDetails {...otherProps} />;
  }

  return null;
};
                                
      case 5:
        return (
          <Box>
            <Typography variant="h6" sx={{ marginBottom: "20px" }}>
              Review & Submit
            </Typography>
            <Typography sx={{ marginBottom: "10px" }}>
              <strong>Email:</strong> {email}
            </Typography>
            <Typography sx={{ marginBottom: "10px" }}>
              <strong>Name:</strong> {name}
            </Typography>
            <Typography sx={{ marginBottom: "10px" }}>
              <strong>Phone Number:</strong> {phoneNumber}
            </Typography>
            <Typography sx={{ marginBottom: "10px" }}>
              <strong>User Type:</strong> {userType}
            </Typography>
            {userType === "Student" && (
              <>
                <Typography sx={{ marginBottom: "10px" }}>
                  <strong>College Name:</strong> {collegeName}
                </Typography>
                <Typography sx={{ marginBottom: "10px" }}>
                  <strong>Course:</strong> {course}
                </Typography>
                <Typography sx={{ marginBottom: "10px" }}>
                  <strong>College Location:</strong> {collegeLocation}
                </Typography>
                <Typography sx={{ marginBottom: "10px" }}>
                  <strong>GitHub Profile:</strong> {git}
                </Typography>
                {collegeIdPhotoUrl && (
                  <img
                    src={collegeIdPhotoUrl}
                    alt="College ID"
                    style={{ width: "200px", marginBottom: "10px" }}
                  />
                )}
              </>
            )}
            {userType === "professional" && (
              <>
                <Typography sx={{ marginBottom: "10px" }}>
                  <strong>Area of Expertise:</strong> {areaOfExpertise}
                </Typography>
                <Typography sx={{ marginBottom: "10px" }}>
                  <strong>Years of Experience:</strong> {experience}
                </Typography>
                <Typography sx={{ marginBottom: "10px" }}>
                  <strong>Available to Mentor:</strong>{" "}
                  {availableToMentor ? "Yes" : "No"}
                </Typography>
                {availableToMentor && (
                  <Typography sx={{ marginBottom: "10px" }}>
                    <strong>Number of People Mentored:</strong> {mentorshipCount}
                  </Typography>
                )}
                <Typography sx={{ marginBottom: "10px" }}>
                  <strong>Available to Invest:</strong>{" "}
                  {availableToInvest ? "Yes" : "No"}
                </Typography>
                {availableToInvest && (
                  <>
                    <Typography sx={{ marginBottom: "10px" }}>
                      <strong>Number of Investments:</strong> {investmentCount}
                    </Typography>
                    <Typography sx={{ marginBottom: "10px" }}>
                      <strong>Total Investment Amount:</strong>{" "}
                      {investmentAmount}
                    </Typography>
                  </>
                )}
                {proofImageUrl && (
                  <img
                    src={proofImageUrl}
                    alt="Proof of Expertise"
                    style={{ width: "200px", marginBottom: "10px" }}
                  />
                )}
                {profileImageUrl && (
                  <img
                    src={profileImageUrl}
                    alt="Profile"
                    style={{ width: "200px", marginBottom: "10px" }}
                  />
                )}
              </>
            )}
            {userType === "organization" && (
              <>
                <Typography sx={{ marginBottom: "10px" }}>
                  <strong>Organization Name:</strong> {orgnName}
                </Typography>
                <Typography sx={{ marginBottom: "10px" }}>
                  <strong>Head of Organization:</strong> {orgnHead}
                </Typography>
                <Typography sx={{ marginBottom: "10px" }}>
                  <strong>Location:</strong> {orgnLocation}
                </Typography>
                <Typography sx={{ marginBottom: "10px" }}>
                  <strong>Type:</strong> {orgnType}
                </Typography>
                {orgnProofPhotoUrl && (
                  <img
                    src={orgnProofPhotoUrl}
                    alt="Proof of Organization"
                    style={{ width: "200px", marginBottom: "10px" }}
                  />
                )}
              </>
            )}
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme} style={{ maxWidth: '100%', overflowX: 'hidden' }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // width:'100%',
          backgroundColor: "black",
        }}
      >
        <Box
          sx={{
            
            backgroundColor: "#000000",
            padding: "40px",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
            color: "white",
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: "20px" }}>
            Sign Up
          </Typography>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box sx={{ marginTop: "40px" }}>{renderStepContent(activeStep)}</Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "40px",
            }}
          >
            <Button
              variant="contained"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              Back
            </Button>
            {activeStep !== steps.length - 1 && (
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default SignupQuestions;
