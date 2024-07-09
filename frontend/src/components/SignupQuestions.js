import React, { useState } from 'react';
import {
  Box, Button, CssBaseline, Stepper, Step, StepLabel, Typography, TextField, Select, MenuItem, FormControlLabel, Switch,
  FormControl, InputLabel, ThemeProvider, createTheme, Table, TableBody, TableCell, TableHead, TableRow
} from '@mui/material';
import { styled } from '@mui/system';
import { useSpring, animated } from '@react-spring/web';
import { Transition } from 'react-transition-group';
import Lottie from 'lottie-react';
import axios from 'axios';
import emailAnimation from './BLOG.json';
import commonQuestionsAnimation from './BLOG.json';
import userTypeAnimation from './BLOG.json';
import specificQuestionsAnimation from './BLOG.json';
import reviewAnimation from './BLOG.json';

const CustomTextField = styled(TextField)({
  '& .MuiInputBase-input': {
    color: 'white',
  },
  '& .MuiInputLabel-root': {
    color: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
  },
});

const CustomSelect = styled(Select)({
  '& .MuiInputBase-input': {
    color: 'white',
  },
  '& .MuiInputLabel-root': {
    color: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
  },
  '& .MuiSelect-icon': {
    color: 'white',
  },
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#0E86D4',
    },
  },
});

const steps = ['Email Verification', 'Common Questions', 'Select User Type', 'Specific Questions', 'Review and Submit'];

function SignupQuestions() {
  const [activeStep, setActiveStep] = useState(1);
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('');
  const [userQuestions, setUserQuestions] = useState([
    { label: 'First Name', key: 'firstName', value: '', error: '' },
    { label: 'Last Name', key: 'lastName', value: '', error: '' },
    { label: 'Phone Number', key: 'phoneNumber', value: '', error: '' },
  ]);
  const backend = process.env.REACT_APP_BACKEND;

  const [collegeName, setCollegeName] = useState('');
  const [course, setCourse] = useState('');
  const [collegeLocation, setCollegeLocation] = useState('');
  const [git, setGit] = useState('');
  const [collegeIdPhoto, setCollegeIdPhoto] = useState(null);
  const [collegeIdPhotoUrl, setCollegeIdPhotoUrl] = useState('');
  const [areaOfExpertise, setAreaOfExpertise] = useState('');
  const [experience, setExperience] = useState('');
  const [availableToMentor, setAvailableToMentor] = useState(false);
  const [mentorshipCount, setMentorshipCount] = useState('');
  const [availableToInvest, setAvailableToInvest] = useState(false);
  const [investmentCount, setInvestmentCount] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [proofImage, setProofImage] = useState(null);
  const [proofImageUrl, setProofImageUrl] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState('');

  const handleNext = async () => {
    // Check if all required fields in the current step are filled
    if (!validateCurrentStep()) {
      return;
    }

    if (activeStep === 0) {
      const isEmailVerified = await verifyEmail();
      if (!isEmailVerified) {
        return;
      }
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleInputChange = (key, value) => {
    setUserQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.key === key ? { ...question, value: value, error: '' } : question
      )
    );
  };

  const handleFileChange = (e, setter, urlSetter) => {
    const file = e.target.files[0];
    if (file) {
      setter(file);
      urlSetter(URL.createObjectURL(file));
    }
  };

  const validateCurrentStep = () => {
    let hasError = false;
    const updatedUserQuestions = userQuestions.map((question) => {
      if (!question.value) {
        hasError = true;
        return { ...question, error: 'This field is required' };
      }
      return question;
    });
    setUserQuestions(updatedUserQuestions);

    if (activeStep === 0 && !email) {
      alert("Email is required");
      return false;
    }

    if (hasError) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation logic
    if (!validateCurrentStep()) {
      return;
    }

    if (activeStep === steps.length - 1) {
      const formData = new FormData();
      formData.append('email', email);
      userQuestions.forEach((question) => {
        formData.append(question.key, question.value);
      });

      if (userType === 'Student') {
        formData.append('collegeName', collegeName);
        formData.append('course', course);
        formData.append('collegeLocation', collegeLocation);
        formData.append('git', git);
        if (collegeIdPhoto) {
          formData.append('collegeIdPhoto', collegeIdPhoto);
        }
      } else if (userType === 'Mentor') {
        formData.append('areaOfExpertise', areaOfExpertise);
        formData.append('experience', experience);
        formData.append('availableToMentor', availableToMentor);
        formData.append('mentorshipCount', mentorshipCount);
      } else if (userType === 'Investor') {
        formData.append('availableToInvest', availableToInvest);
        formData.append('investmentCount', investmentCount);
        formData.append('investmentAmount', investmentAmount);
        if (proofImage) {
          formData.append('proofImage', proofImage);
        }
      }

      if (profileImage) {
        formData.append('profileImage', profileImage);
      }

      try {
        const response = await axios.post(`${backend}/api/signup`, formData);
        if (response.status === 200) {
          alert('Signup successful');
        } else {
          alert('Signup failed');
        }
      } catch (error) {
        console.error('Signup error:', error);
        alert('Signup failed');
      }
    }
  };

  const verifyEmail = async () => {
    try {
      const response = await axios.get(`${backend}/api/verify-email`, { params: { email } });
      if (response.data.found) {
        return true;
      } else {
        window.location.href = '/login';
        return false;
      }
    } catch (error) {
      console.error('Email verification error:', error);
      window.location.href = '/login';
      return false;
    }
  };

  const getAnimationData = (step) => {
    switch (step) {
      case 0:
        return (
          <CustomTextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            variant="outlined"
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
              variant="outlined"
              sx={{ marginBottom: "20px" }}
            />
            <CustomTextField
              label="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{ marginBottom: "20px" }}
            />
            <CustomTextField
              label="LinkedIn Profile"
              value={linkedinProfile}
              onChange={(e) => setLinkedinProfile(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{ marginBottom: "20px" }}
            />
            <CustomTextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{ marginBottom: "20px" }}
            />
            <CustomTextField
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{ marginBottom: "20px" }}
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
          <FormControl fullWidth style={{ backgroundColor: 'transparent' }}>
  <InputLabel style={{ color: 'white' }}>User Type</InputLabel>
  <CustomSelect
    value={userType}
    onChange={(e) => setUserType(e.target.value)}
    label="User Type"
    style={{ color: 'white' }}
    MenuProps={{ PaperProps: { style: { backgroundColor: 'transparent' } } }} // Ensure menu background is transparent
  >
    {Object.keys(questions).map((type) => (
      <MenuItem key={type} value={type} style={{ color: 'white' }}>
        {type}
      </MenuItem>
    ))}
  </CustomSelect>
</FormControl>


        );
      case 3:
        return renderUserQuestions();
      case 4:
        return (
          <>
            <Typography variant="h6">Review your details:</Typography>
            <TableContainer component={Paper}>
              <Table style={{backgroundColor:"transparent"}}>
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
                    <TableCell>LinkedIn Profile</TableCell>
                    <TableCell>{linkedinProfile}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>User Type</TableCell>
                    <TableCell>{userType}</TableCell>
                  </TableRow>
                  {userQuestions.map((question) => (
                    <TableRow key={question.questionName}>
                      <TableCell>{question.label}</TableCell>
                      <TableCell>{formData[question.questionName]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        );
      
      
    }
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
        }}
      >
       
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: signUpLottie,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
            },
          }}
          height={200}
          width={200}
        />
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          Signup
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
          <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            <Button
  variant="contained"
  color="primary"
  onClick={activeStep === steps.length - 2 ? handleSubmit : handleNext}
  sx={{ marginLeft: "auto" }}
>
  {activeStep === steps.length - 2  ? "Review and Submit" : "Next"}
</Button>

          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default SignupQuestions;
