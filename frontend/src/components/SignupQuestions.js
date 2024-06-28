import React, { useState } from 'react';
import { TextField, Box, Typography, Select, MenuItem, Button, Switch, FormControlLabel } from '@mui/material';
import { styled } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate } from 'react-router-dom';
import { setItemWithExpiry } from "./localStorageWithExpiry"; // Import the utility function
import Navbarr from './nav';

const CustomTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    color: white;

    & fieldset {
      border: 1px solid #fff;
    }
    &.Mui-focused fieldset {
      border-color: #fff;
    }
    &:hover fieldset {
      border-color: #fff;
    }
  }

  & .MuiInputLabel-root {
    color: white;
  }

  & .MuiOutlinedInput-input {
    color: white;
  }

  & .MuiOutlinedInput-input::placeholder {
    color: white;
    opacity: 1; // Override MUI default opacity
  }
`;

const CustomSelect = styled(Select)`
  & .MuiSelect-outlined {
    color: white;
  }
  & .MuiOutlinedInput-notchedOutline {
    border-color: white;
  }
  &:hover .MuiOutlinedInput-notchedOutline {
    border-color: white;
  }
  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: white;
  }
`;

const CustomMenuItem = styled(MenuItem)`
  &.MuiMenuItem-root {
    color: black;
  }
`;

const theme = createTheme({
  palette: {
    background: {
      default: "#040F15",
    },
    text: {
      primary: "#ffffff",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@global': {
          'input:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 1000px #333 inset !important',
            WebkitTextFillColor: 'white !important',
          },
          'input:-webkit-autofill:focus': {
            WebkitBoxShadow: '0 0 0 1000px #333 inset !important',
            WebkitTextFillColor: 'white !important',
          },
          'input:-webkit-autofill:hover': {
            WebkitBoxShadow: '0 0 0 1000px #333 inset !important',
            WebkitTextFillColor: 'white !important',
          },
        },
      },
    },
  },
});

const steps = ['Basic Information', 'User Type Details', 'Review & Submit'];

export default function SignupQuestions() {
  const [userType, setUserType] = useState('');
  const [userQuestions, setUserQuestions] = useState([
    { label: 'Name', key: 'name', value: '', required: true, error: '' },
    { label: 'Email', key: 'email', value: '', required: true, error: '' },
    { label: 'Password', key: 'password', value: '', required: true, error: '', type: "password" },
    { label: 'Confirm Password', key: 'confirmpassword', value: '', required: true, error: '', type: "password" },
    { label: 'Institution', key: 'institution', value: '', required: true, error: '' },
    { label: 'Native/Place of Work', key: 'nativePlaceOrWork', value: '', required: true, error: '' },
    { label: 'Phone', key: 'phone', value: '', minLength: 10, maxLength: 10, required: true, error: '' },
    { label: 'LinkedIn', key: 'linkedin', value: '', required: true, error: '' },
  ]);

  const backend = process.env.REACT_APP_BACKEND;
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [collegeIdPhoto, setcollegeIdPhoto] = useState(null);
  const [collegeIdPhotoUrl, setcollegeIdPhotoUrl] = useState(null);
  const [proofImage, setProofImage] = useState(null);
  const [proofImageUrl, setProofImageUrl] = useState(null);
  const [availableToMentor, setAvailableToMentor] = useState(false);
  const [availableToInvest, setAvailableToInvest] = useState(false);
  const [mentorshipCount, setMentorshipCount] = useState(0);
  const [investmentCount, setInvestmentCount] = useState(0);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [course, setCourse] = useState('');
  const [collegeLocation, setCollegeLocation] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [git, setGit] = useState('');
  const [areaOfExpertise, setAreaOfExpertise] = useState('');
  const [experience, setExperience] = useState('');
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);

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

  const handleFileChange = (event, setImage, setImageUrl) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 500; // Maximum width for resizing (adjust as needed)
          const MAX_HEIGHT = 500; // Maximum height for resizing (adjust as needed)
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

          const dataUrl = canvas.toDataURL('image/jpeg'); // Convert to base64

          setImage(file); // Set the original file if needed
          setImageUrl(dataUrl); // Set the base64 string as the URL
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm(userQuestions.map(q => q.key))) {
      console.log('Form submitted', userQuestions);
      const formData = new FormData();
      userQuestions.forEach((question) => {
        formData.append(question.key, question.value);
      });
      console.log(formData);
      formData.append('userType', userType); // Add userType to form data

      // Append additional data based on user type
      if (userType === 'Student') {
        formData.append('collegeName', collegeName);
        formData.append('course', course);
        formData.append('collegeLocation', collegeLocation);
        formData.append('git', git);
        if (profileImage) formData.append('profileImage', profileImageUrl);
        if (collegeIdPhoto) formData.append('collegeIdPhoto', collegeIdPhotoUrl);
      } else if (userType === 'Mentor') {
        formData.append('areaOfExpertise', areaOfExpertise);
        formData.append('experience', experience);
        if (profileImage) formData.append('profileImage', profileImageUrl);
        if (proofImage) formData.append('proofImage', proofImageUrl);
      } else if (userType === 'Investor') {
        formData.append('availableToInvest', availableToInvest);
        formData.append('investmentAmount', investmentAmount);
        if (profileImage) formData.append('profileImage', profileImageUrl);
        if (proofImage) formData.append('proofImage', proofImageUrl);
      }

      try {
        const response = await axios.post(`${backend}/api/signup`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.data.success) {
          console.log('Form submitted successfully', response.data);
          // Store email and password with expiry in local storage
          const email = userQuestions.find(q => q.key === 'email').value;
          const password = userQuestions.find(q => q.key === 'password').value;
          setItemWithExpiry('email', email, 3600); // Set expiry time to 1 hour (3600 seconds)
          setItemWithExpiry('password', password, 3600); // Set expiry time to 1 hour (3600 seconds)
          navigate('/welcome'); // Redirect to welcome page
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
    if (activeStep === 0) {
      currentQuestions = userQuestions.slice(0, 4);
    } else if (activeStep === 1) {
      currentQuestions = [];
      if (userType === 'Student') {
        currentQuestions = ['collegeName', 'course', 'collegeLocation', 'git'];
      } else if (userType === 'Mentor') {
        currentQuestions = ['areaOfExpertise', 'experience'];
      } else if (userType === 'Investor') {
        currentQuestions = ['investmentAmount'];
      }
    } else {
      currentQuestions = userQuestions.map(q => q.key); // Validate all questions on the last step
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
      <Box sx={{ width: '100%', marginTop: 2 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <LinearProgress variant="determinate" value={(activeStep + 1) / steps.length * 100} sx={{ marginTop: 2 }} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2 }}>
        {activeStep === steps.length ? (
          <Typography variant="h6" align="center">All steps completed</Typography>
        ) : (
          <Box component="form" sx={{ width: '80%' }}>
            {activeStep === 0 && (
              <>
                {userQuestions.slice(0, 4).map((question) => (
                  <CustomTextField
                    key={question.key}
                    label={question.label}
                    type={question.type || "text"}
                    value={question.value}
                    onChange={(e) => handleInputChange(question.key, e.target.value)}
                    fullWidth
                    required={question.required}
                    error={Boolean(question.error)}
                    helperText={question.error}
                    margin="normal"
                  />
                ))}
              </>
            )}
            {activeStep === 1 && (
              <>
                <CustomSelect
                  value={userType}
                  onChange={handleUserTypeChange}
                  displayEmpty
                  fullWidth
                  required
                >
                  <CustomMenuItem value="" disabled>
                    Select User Type
                  </CustomMenuItem>
                  <CustomMenuItem value="Student">Student</CustomMenuItem>
                  <CustomMenuItem value="Mentor">Mentor</CustomMenuItem>
                  <CustomMenuItem value="Investor">Investor</CustomMenuItem>
                </CustomSelect>
                {userType === 'Student' && (
                  <>
                    <CustomTextField
                      label="College Name"
                      value={collegeName}
                      onChange={(e) => setCollegeName(e.target.value)}
                      fullWidth
                      required
                      margin="normal"
                    />
                    <CustomTextField
                      label="Course"
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      fullWidth
                      required
                      margin="normal"
                    />
                    <CustomTextField
                      label="College Location"
                      value={collegeLocation}
                      onChange={(e) => setCollegeLocation(e.target.value)}
                      fullWidth
                      required
                      margin="normal"
                    />
                    <CustomTextField
                      label="Git"
                      value={git}
                      onChange={(e) => setGit(e.target.value)}
                      fullWidth
                      required
                      margin="normal"
                    />
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="profile-image-upload"
                      type="file"
                      onChange={(event) => handleFileChange(event, setProfileImage, setProfileImageUrl)}
                    />
                    <label htmlFor="profile-image-upload">
                      <Button variant="contained" color="primary" component="span">
                        Upload Profile Image
                      </Button>
                    </label>
                    {profileImageUrl && (
                      <Box mt={2}>
                        <img src={profileImageUrl} alt="Profile" style={{ width: '100%', maxWidth: 200 }} />
                      </Box>
                    )}
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="college-id-photo-upload"
                      type="file"
                      onChange={(event) => handleFileChange(event, setcollegeIdPhoto, setcollegeIdPhotoUrl)}
                    />
                    <label htmlFor="college-id-photo-upload">
                      <Button variant="contained" color="primary" component="span">
                        Upload College ID Photo
                      </Button>
                    </label>
                    {collegeIdPhotoUrl && (
                      <Box mt={2}>
                        <img src={collegeIdPhotoUrl} alt="College ID" style={{ width: '100%', maxWidth: 200 }} />
                      </Box>
                    )}
                  </>
                )}
                {userType === 'Mentor' && (
                  <>
                    <CustomTextField
                      label="Area of Expertise"
                      value={areaOfExpertise}
                      onChange={(e) => setAreaOfExpertise(e.target.value)}
                      fullWidth
                      required
                      margin="normal"
                    />
                    <CustomTextField
                      label="Experience"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      fullWidth
                      required
                      margin="normal"
                    />
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="proof-image-upload"
                      type="file"
                      onChange={(event) => handleFileChange(event, setProofImage, setProofImageUrl)}
                    />
                    <label htmlFor="proof-image-upload">
                      <Button variant="contained" color="primary" component="span">
                        Upload Proof Image
                      </Button>
                    </label>
                    {proofImageUrl && (
                      <Box mt={2}>
                        <img src={proofImageUrl} alt="Proof" style={{ width: '100%', maxWidth: 200 }} />
                      </Box>
                    )}
                  </>
                )}
                {userType === 'Investor' && (
                  <>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={availableToInvest}
                          onChange={(e) => setAvailableToInvest(e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Available to Invest"
                      labelPlacement="end"
                    />
                    <CustomTextField
                      label="Investment Amount"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(e.target.value)}
                      fullWidth
                      required
                      margin="normal"
                    />
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="proof-image-upload"
                      type="file"
                      onChange={(event) => handleFileChange(event, setProofImage, setProofImageUrl)}
                    />
                    <label htmlFor="proof-image-upload">
                      <Button variant="contained" color="primary" component="span">
                        Upload Proof Image
                      </Button>
                    </label>
                    {proofImageUrl && (
                      <Box mt={2}>
                        <img src={proofImageUrl} alt="Proof" style={{ width: '100%', maxWidth: 200 }} />
                      </Box>
                    )}
                  </>
                )}
              </>
            )}
            {activeStep === 2 && (
              <Typography variant="h6" align="center">
                Review your details and submit the form
              </Typography>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
              {activeStep > 0 && (
                <Button onClick={handleBack} sx={{ mr: 1 }}>
                  Back
                </Button>
              )}
              {activeStep < steps.length - 1 && (
                <Button variant="contained" onClick={handleNext}>
                  Next
                </Button>
              )}
              {activeStep === steps.length - 1 && (
                <Button variant="contained" onClick={handleSubmit}>
                  Submit
                </Button>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
}
