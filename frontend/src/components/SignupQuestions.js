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
  const [activeStep, setActiveStep] = useState(4);
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
        return emailAnimation;
      case 1:
        return commonQuestionsAnimation;
      case 2:
        return userTypeAnimation;
      case 3:
        return specificQuestionsAnimation;
      case 4:
        return reviewAnimation;
      default:
        return emailAnimation;
    }
  };

  const AnimatedBox = animated(Box);

  const pageTransitions = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };

  // Function to render image preview
  const renderImagePreview = (imageUrl) => {
    return imageUrl ? <img src={imageUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }} /> : null;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel sx={{ color: 'white' }}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ marginTop: 3 }}>
          <Transition in={true} timeout={300}>
            {(state) => (
              <AnimatedBox style={{ ...pageTransitions[state] }}>
                <Lottie animationData={getAnimationData(activeStep)} style={{ height: 500, marginBottom: 10 }} />
                {activeStep === 0 && (
                  <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Typography variant="h6" gutterBottom color="white" mt={10} sx={{alignContent:'center',textAlign:'center'}}>Enter your email to get started:</Typography>
                    <CustomTextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      error={!email}
                      helperText={!email ? 'Email is required' : ''}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleNext}
                      >
                        Next
                      </Button>
                    </Box>
                  </Box>
                )}
                {activeStep === 1 && (
                  <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Typography variant="h6" gutterBottom color="white">Tell us about yourself:</Typography>
                    {userQuestions.map((question, index) => (
                      <CustomTextField
                        key={index}
                        margin="normal"
                        required
                        fullWidth
                        label={question.label}
                        value={question.value}
                        onChange={(e) => handleInputChange(question.key, e.target.value)}
                        error={!!question.error}
                        helperText={question.error}
                      />
                    ))}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Button
                        type="button"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleBack}
                      >
                        Back
                      </Button>
                      <Button
                        type="button"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleNext}
                      >
                        Next
                      </Button>
                    </Box>
                  </Box>
                )}
                {activeStep === 2 && (
                  <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Typography variant="h6" gutterBottom color="white">Select your user type:</Typography>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                      <InputLabel id="userTypeLabel" sx={{ color: 'white' }}>User Type</InputLabel>
                      <CustomSelect
                        labelId="userTypeLabel"
                        id="userType"
                        value={userType}
                        label="User Type"
                        onChange={handleUserTypeChange}
                      >
                        <MenuItem value="Student">Student</MenuItem>
                        <MenuItem value="Mentor">Mentor</MenuItem>
                        <MenuItem value="Investor">Investor</MenuItem>
                      </CustomSelect>
                    </FormControl>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Button
                        type="button"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleBack}
                      >
                        Back
                      </Button>
                      <Button
                        type="button"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleNext}
                      >
                        Next
                      </Button>
                    </Box>
                  </Box>
                )}
                {activeStep === 3 && (
                  <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Typography variant="h6" gutterBottom color="white">
                      Please provide more details based on your selected user type:
                    </Typography>
                    {userType === 'Student' && (
                      <>
                        <CustomTextField
                          margin="normal"
                          required
                          fullWidth
                          id="collegeName"
                          label="College Name"
                          value={collegeName}
                          onChange={(e) => setCollegeName(e.target.value)}
                        />
                        <CustomTextField
                          margin="normal"
                          required
                          fullWidth
                          id="course"
                          label="Course"
                          value={course}
                          onChange={(e) => setCourse(e.target.value)}
                        />
                        <CustomTextField
                          margin="normal"
                          required
                          fullWidth
                          id="collegeLocation"
                          label="College Location"
                          value={collegeLocation}
                          onChange={(e) => setCollegeLocation(e.target.value)}
                        />
                        <CustomTextField
                          margin="normal"
                          required
                          fullWidth
                          id="git"
                          label="GitHub URL"
                          value={git}
                          onChange={(e) => setGit(e.target.value)}
                        />
                        <Box>
                          <Typography variant="body1" color="white">Upload College ID Photo:</Typography>
                          <input type="file" onChange={(e) => handleFileChange(e, setCollegeIdPhoto, setCollegeIdPhotoUrl)} />
                          {renderImagePreview(collegeIdPhotoUrl)}
                        </Box>
                      </>
                    )}
                    {userType === 'Mentor' && (
                      <>
                        <CustomTextField
                          margin="normal"
                          required
                          fullWidth
                          id="areaOfExpertise"
                          label="Area of Expertise"
                          value={areaOfExpertise}
                          onChange={(e) => setAreaOfExpertise(e.target.value)}
                        />
                        <CustomTextField
                          margin="normal"
                          required
                          fullWidth
                          id="experience"
                          label="Years of Experience"
                          value={experience}
                          onChange={(e) => setExperience(e.target.value)}
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={availableToMentor}
                              onChange={(e) => setAvailableToMentor(e.target.checked)}
                              name="availableToMentor"
                              color="primary"
                            />
                          }
                          label="Available to Mentor"
                        />
                        {availableToMentor && (
                          <CustomTextField
                            margin="normal"
                            required
                            fullWidth
                            id="mentorshipCount"
                            label="Number of Mentorships"
                            value={mentorshipCount}
                            onChange={(e) => setMentorshipCount(e.target.value)}
                          />
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
                              name="availableToInvest"
                              color="primary"
                            />
                          }
                          label="Available to Invest"
                        />
                        {availableToInvest && (
                          <>
                            <CustomTextField
                              margin="normal"
                              required
                              fullWidth
                              id="investmentCount"
                              label="Number of Investments"
                              value={investmentCount}
                              onChange={(e) => setInvestmentCount(e.target.value)}
                            />
                            <CustomTextField
                              margin="normal"
                              required
                              fullWidth
                              id="investmentAmount"
                              label="Total Investment Amount"
                              value={investmentAmount}
                              onChange={(e) => setInvestmentAmount(e.target.value)}
                            />
                            <Box>
                              <Typography variant="body1" color="white">Upload Proof of Investment:</Typography>
                              <input type="file" onChange={(e) => handleFileChange(e, setProofImage, setProofImageUrl)} />
                              {renderImagePreview(proofImageUrl)}
                            </Box>
                          </>
                        )}
                      </>
                    )}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Button
                        type="button"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleBack}
                      >
                        Back
                      </Button>
                      <Button
                        type="button"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleNext}
                      >
                        Next
                      </Button>
                    </Box>
                  </Box>
                )}
                {activeStep === 4 && (
                  <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4 ,  padding:'30px'}}>
                    <Typography variant="h6" gutterBottom color="white">Review your details:</Typography>
                    <Table >
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ color: 'white' }}>Field</TableCell>
                          <TableCell sx={{ color: 'white' }}>Value</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell sx={{ color: 'white' }}>Email</TableCell>
                          <TableCell sx={{ color: 'white' }}>{email}</TableCell>
                        </TableRow>
                        {userQuestions.map((question, index) => (
                          <TableRow key={index}>
                            <TableCell sx={{ color: 'white' }}>{question.label}</TableCell>
                            <TableCell sx={{ color: 'white' }}>{question.value}</TableCell>
                          </TableRow>
                        ))}
                        {userType === 'Student' && (
                          <>
                            <TableRow>
                              <TableCell sx={{ color: 'white' }}>College Name</TableCell>
                              <TableCell sx={{ color: 'white' }}>{collegeName}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell sx={{ color: 'white' }}>Course</TableCell>
                              <TableCell sx={{ color: 'white' }}>{course}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell sx={{ color: 'white' }}>College Location</TableCell>
                              <TableCell sx={{ color: 'white' }}>{collegeLocation}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell sx={{ color: 'white' }}>GitHub URL</TableCell>
                              <TableCell sx={{ color: 'white' }}>{git}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell sx={{ color: 'white' }}>College ID Photo</TableCell>
                              <TableCell sx={{ color: 'white' }}>
                                {renderImagePreview(collegeIdPhotoUrl)}
                              </TableCell>
                            </TableRow>
                          </>
                        )}
                        {userType === 'Mentor' && (
                          <>
                            <TableRow>
                              <TableCell sx={{ color: 'white' }}>Area of Expertise</TableCell>
                              <TableCell sx={{ color: 'white' }}>{areaOfExpertise}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell sx={{ color: 'white' }}>Years of Experience</TableCell>
                              <TableCell sx={{ color: 'white' }}>{experience}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell sx={{ color: 'white' }}>Available to Mentor</TableCell>
                              <TableCell sx={{ color: 'white' }}>{availableToMentor ? 'Yes' : 'No'}</TableCell>
                            </TableRow>
                            {availableToMentor && (
                              <TableRow>
                                <TableCell sx={{ color: 'white' }}>Number of Mentorships</TableCell>
                                <TableCell sx={{ color: 'white' }}>{mentorshipCount}</TableCell>
                              </TableRow>
                            )}
                          </>
                        )}
                        {userType === 'Investor' && (
                          <>
                            <TableRow>
                              <TableCell sx={{ color: 'white' }}>Available to Invest</TableCell>
                              <TableCell sx={{ color: 'white' }}>{availableToInvest ? 'Yes' : 'No'}</TableCell>
                            </TableRow>
                            {availableToInvest && (
                              <>
                                <TableRow>
                                  <TableCell sx={{ color: 'white' }}>Number of Investments</TableCell>
                                  <TableCell sx={{ color: 'white' }}>{investmentCount}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell sx={{ color: 'white' }}>Total Investment Amount</TableCell>
                                  <TableCell sx={{ color: 'white' }}>{investmentAmount}</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell sx={{ color: 'white' }}>Proof of Investment</TableCell>
                                  <TableCell sx={{ color: 'white' }}>
                                    {renderImagePreview(proofImageUrl)}
                                  </TableCell>
                                </TableRow>
                              </>
                            )}
                          </>
                        )}
                      </TableBody>
                    </Table>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Button
                        type="button"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleBack}
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Submit
                      </Button>
                    </Box>
                  </Box>
                )}
              </AnimatedBox>
            )}
          </Transition>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default SignupQuestions;
