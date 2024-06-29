import React, { useState } from 'react';
import {
  TextField, Box, Typography, Select, MenuItem, Button, Switch,
  FormControlLabel, Stepper, Step, StepLabel, LinearProgress
} from '@mui/material';
import { styled } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate } from 'react-router-dom';
import { setItemWithExpiry } from "./localStorageWithExpiry";
import Navbarr from './nav';

const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    color: 'white',
    '& fieldset': { border: '1px solid #fff' },
    '&.Mui-focused fieldset': { borderColor: '#fff' },
    '&:hover fieldset': { borderColor: '#fff' },
  },
  '& .MuiInputLabel-root': { color: 'white' },
  '& .MuiOutlinedInput-input': { color: 'white' },
  '& .MuiOutlinedInput-input::placeholder': {
    color: 'white', opacity: 1,
  },
});

const CustomSelect = styled(Select)({
  '& .MuiSelect-outlined': { color: 'white' },
  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
});

const CustomMenuItem = styled(MenuItem)({
  '&.MuiMenuItem-root': { color: 'black' },
});

const theme = createTheme({
  palette: {
    background: { default: "#040F15" },
    text: { primary: "#ffffff" },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@global': {
          'input:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 1000px #333 inset !important',
            WebkitTextFillColor: 'white !important',
          },
        },
      },
    },
  },
});

const steps = ['Email Check', 'Basic Information', 'User Type Details', 'Review & Submit'];

export default function SignupQuestions() {
  const [email, setEmail] = useState('');
  const [userExists, setUserExists] = useState(false);
  const [userType, setUserType] = useState('');
  const [userQuestions, setUserQuestions] = useState([
    { label: 'Name', key: 'name', value: '', required: true, error: '' },
    { label: 'Email', key: 'email', value: '', required: true, error: '' },
    { label: 'Password', key: 'password', value: '', required: true, error: '', type: "password" },
    { label: 'Confirm Password', key: 'confirmpassword', value: '', required: true, error: '', type: "password" },
    { label: 'Phone', key: 'phone', value: '', minLength: 10, maxLength: 10, required: true, error: '' },
    { label: 'Id Proof', key: 'idProof', value: '', required: true, error: '' },
    { label: 'Profile Image', key: 'profileImage', value: '', required: true, error: '' },
  ]);

  const backend = process.env.REACT_APP_BACKEND;
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [idProofImage, setIdProofImage] = useState(null);
  const [idProofImageUrl, setIdProofImageUrl] = useState(null);
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);

  const handleInputChange = (key, value) => {
    setUserQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.key === key ? { ...question, value: value, error: '' } : question
      )
    );
  };

  const handleFileChange = (event, setImage, setImageUrl) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
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
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const dataUrl = canvas.toDataURL('image/jpeg');

          setImage(file);
          setImageUrl(dataUrl);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (questions) => {
    let isValid = true;
    setUserQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        let error = '';
        if (questions.includes(question.key)) {
          if (question.required && !question.value) {
            error = `${question.label} is required`;
            isValid = false;
          } else if (question.minLength && question.value.length < question.minLength) {
            error = `${question.label} should be at least ${question.minLength} characters`;
            isValid = false;
          } else if (question.maxLength && question.value.length > question.maxLength) {
            error = `${question.label} should be at most ${question.maxLength} characters`;
            isValid = false;
          }
        }
        return { ...question, error };
      })
    );
    return isValid;
  };

  const handleEmailSubmit = async () => {
    try {
      const response = await axios.get(`${backend}/api/check-email`, { params: { email } });
      if (response.data.exists) {
        setUserExists(true);
        // Load user data if needed
      } else {
        setUserExists(false);
        handleNext();
      }
    } catch (error) {
      console.error('Error checking email', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm(userQuestions.map(q => q.key))) {
      const formData = new FormData();
      userQuestions.forEach((question) => {
        formData.append(question.key, question.value);
      });
      formData.append('userType', userType);
      if (profileImage) formData.append('profileImage', profileImageUrl);
      if (idProofImage) formData.append('idProof', idProofImageUrl);

      try {
        const response = await axios.post(`${backend}/api/signup`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (response.data.success) {
          const email = userQuestions.find(q => q.key === 'email').value;
          const password = userQuestions.find(q => q.key === 'password').value;
          setItemWithExpiry('email', email, 3600);
          setItemWithExpiry('password', password, 3600);
          navigate('/welcome');
        } else {
          console.error('Form submission failed', response.data);
        }
      } catch (error) {
        console.error('Error submitting form', error);
      }
    } else {
      console.log('Form validation failed');
    }
  };

  const handleNext = () => {
    let currentQuestions;
    if (activeStep === 1) {
      currentQuestions = userQuestions.slice(0, 4);
    } else if (activeStep === 2) {
      currentQuestions = [];
      if (userType === 'Student') {
        currentQuestions = ['collegeName', 'course', 'collegeLocation', 'git'];
      } else if (userType === 'Mentor') {
        currentQuestions = ['areaOfExpertise', 'experience'];
      } else if (userType === 'Investor') {
        currentQuestions = ['investmentAmount'];
      }
    } else {
      currentQuestions = userQuestions.map(q => q.key);
    }

    if (validateForm(currentQuestions)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbarr />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', pt: 8 }}>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ width: '100%', mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
          onSubmit={handleSubmit}
        >
          {activeStep === 0 && (
            <Box sx={{ width: '100%', maxWidth: 600 }}>
              <Typography variant="h6" gutterBottom>
                Enter your email
              </Typography>
              <CustomTextField
                label="Email"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button variant="contained" color="primary" onClick={handleEmailSubmit} sx={{ mt: 2 }}>
                Check Email
              </Button>
            </Box>
          )}
          {activeStep === 1 && (
            <Box sx={{ width: '100%', maxWidth: 600 }}>
              <Typography variant="h6" gutterBottom>
                Basic Information
              </Typography>
              {userQuestions.slice(0, 4).map((question) => (
                <CustomTextField
                  key={question.key}
                  label={question.label}
                  type={question.type || 'text'}
                  fullWidth
                  value={question.value}
                  onChange={(e) => handleInputChange(question.key, e.target.value)}
                  error={!!question.error}
                  helperText={question.error}
                  sx={{ mt: 2 }}
                />
              ))}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button variant="contained" onClick={handleBack}>Back</Button>
                <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>
              </Box>
            </Box>
          )}
          {activeStep === 2 && (
            <Box sx={{ width: '100%', maxWidth: 600 }}>
              <Typography variant="h6" gutterBottom>
                User Type Details
              </Typography>
              <CustomSelect
                label="User Type"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                fullWidth
                sx={{ mt: 2 }}
              >
                <CustomMenuItem value=""><em>Select User Type</em></CustomMenuItem>
                <CustomMenuItem value="Student">Student</CustomMenuItem>
                <CustomMenuItem value="Mentor">Mentor</CustomMenuItem>
                <CustomMenuItem value="Investor">Investor</CustomMenuItem>
              </CustomSelect>
              {userType && (
                <>
                  {userType === 'Student' && (
                    <>
                      <CustomTextField
                        label="College Name"
                        fullWidth
                        value={userQuestions.find(q => q.key === 'collegeName')?.value || ''}
                        onChange={(e) => handleInputChange('collegeName', e.target.value)}
                        sx={{ mt: 2 }}
                      />
                      <CustomTextField
                        label="Course"
                        fullWidth
                        value={userQuestions.find(q => q.key === 'course')?.value || ''}
                        onChange={(e) => handleInputChange('course', e.target.value)}
                        sx={{ mt: 2 }}
                      />
                      <CustomTextField
                        label="College Location"
                        fullWidth
                        value={userQuestions.find(q => q.key === 'collegeLocation')?.value || ''}
                        onChange={(e) => handleInputChange('collegeLocation', e.target.value)}
                        sx={{ mt: 2 }}
                      />
                      <CustomTextField
                        label="GitHub"
                        fullWidth
                        value={userQuestions.find(q => q.key === 'git')?.value || ''}
                        onChange={(e) => handleInputChange('git', e.target.value)}
                        sx={{ mt: 2 }}
                      />
                    </>
                  )}
                  {userType === 'Mentor' && (
                    <>
                      <CustomTextField
                        label="Area of Expertise"
                        fullWidth
                        value={userQuestions.find(q => q.key === 'areaOfExpertise')?.value || ''}
                        onChange={(e) => handleInputChange('areaOfExpertise', e.target.value)}
                        sx={{ mt: 2 }}
                      />
                      <CustomTextField
                        label="Experience"
                        fullWidth
                        value={userQuestions.find(q => q.key === 'experience')?.value || ''}
                        onChange={(e) => handleInputChange('experience', e.target.value)}
                        sx={{ mt: 2 }}
                      />
                    </>
                  )}
                  {userType === 'Investor' && (
                    <CustomTextField
                      label="Investment Amount"
                      fullWidth
                      value={userQuestions.find(q => q.key === 'investmentAmount')?.value || ''}
                      onChange={(e) => handleInputChange('investmentAmount', e.target.value)}
                      sx={{ mt: 2 }}
                    />
                  )}
                </>
              )}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button variant="contained" onClick={handleBack}>Back</Button>
                <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>
              </Box>
            </Box>
          )}
          {activeStep === 3 && (
            <Box sx={{ width: '100%', maxWidth: 600 }}>
              <Typography variant="h6" gutterBottom>
                Review & Submit
              </Typography>
              {userQuestions.map((question) => (
                <Box key={question.key} sx={{ mt: 2 }}>
                  <Typography variant="body1"><strong>{question.label}:</strong> {question.value}</Typography>
                </Box>
              ))}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button variant="contained" onClick={handleBack}>Back</Button>
                <Button variant="contained" color="primary" type="submit">Submit</Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
