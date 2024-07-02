import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Stepper, Step, StepLabel, FormControl, InputLabel, MenuItem, Select, FormControlLabel, Switch, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const backend = process.env.REACT_APP_BACKEND;

const steps = ['Basic Information', 'User Questions', 'User Type', 'Additional Details', 'Review & Submit'];

const CustomTextField = styled(TextField)({
  '& .MuiInputBase-root': {
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
  '& input:-webkit-autofill': {
    '-webkit-box-shadow': '0 0 0 1000px #000 inset',
    '-webkit-text-fill-color': 'white',
    'caret-color': 'white',
  },
});
const CustomStepLabel = styled(StepLabel)({
  '& .MuiStepLabel-label': {
    color: 'white',
  },
  '& .MuiStepLabel-label.Mui-active': {
    color: 'white',
  },
  '& .MuiStepLabel-label.Mui-completed': {
    color: 'white',
  },
});
const CustomSelect = styled(Select)({
  color: 'white',
  bordercolor:'white',
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
  '& .MuiSelect-select': {
    backgroundColor: 'transparent',
  },
  '& input:-webkit-autofill': {
    '-webkit-box-shadow': '0 0 0 1000px #000 inset',
    '-webkit-text-fill-color': 'white',
    'caret-color': 'white',
  },
});


const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const SignupQuestions = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState('');
  const [userQuestions, setUserQuestions] = useState([
    { key: 'question1', label: 'What is your first name?', value: '', error: '' },
    { key: 'question2', label: 'What is your last name?', value: '', error: '' },
  ]);
  const [userType, setUserType] = useState('');
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
  const [orgnName, setOrgnName] = useState('');
  const [orgnHead, setOrgnHead] = useState('');
  const [orgnLocation, setOrgnLocation] = useState('');
  const [orgnType, setOrgnType] = useState('');
  const [orgnProofPhoto, setOrgnProofPhoto] = useState(null);
  const [orgnProofPhotoUrl, setOrgnProofPhotoUrl] = useState('');
  let history = useNavigate(); 
  const handleInputChange = (key, value) => {
    setUserQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.key === key ? { ...question, value, error: value ? '' : 'This field is required' } : question
      )
    );
  };

  const checkEmail = async (email) => {
    setEmail(email);
    try {
      const response = await axios.post(`${backend}/api/check-email`, { email });
      if (response.data.exists) {
        alert('Email already exists. Redirecting to login page...');
        history('/login'); // Redirect to login page
      }
    } catch (error) {
      console.error('Error checking email:', error);
      // alert('Error checking email.');
    }
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleFileChange = (e, setFile, setFileUrl) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
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
        setFile(file);
        setFileUrl(dataUrl);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const validateCurrentStep = () => {
    let isValid = true;
    if (activeStep === 0) {
      if (!email) {
        isValid = false;
        alert('Email is required');
      }
    } else if (activeStep === 1) {
      const updatedQuestions = userQuestions.map((question) => {
        if (!question.value) {
          isValid = false;
          return { ...question, error: 'This field is required' };
        }
        return { ...question, error: '' };
      });
      setUserQuestions(updatedQuestions);
    } else if (activeStep === 2) {
      if (!userType) {
        isValid = false;
        alert('User Type is required');
      }
    } else if (activeStep === 3) {
      if (userType === 'Student') {
        if (!collegeName || !course || !collegeLocation || !git || !collegeIdPhoto) {
          isValid = false;
          alert('All fields for Student are required');
        }
      } else if (userType === 'Mentor' || userType === 'Entrepreneur') {
        if (!areaOfExpertise || !experience || !mentorshipCount || !profileImage) {
          isValid = false;
          alert('All fields for Mentor/Entrepreneur are required');
        }
      } else if (userType === 'Investor') {
        if (!investmentCount || !investmentAmount || !proofImage) {
          isValid = false;
          alert('All fields for Investor are required');
        }
      } else if (userType === 'Organization') {
        if (!orgnName || !orgnHead || !orgnLocation || !orgnType || !orgnProofPhoto || !profileImage) {
          isValid = false;
          alert('All fields for Organization are required');
        }
      }
    }
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      } else if (userType === 'Mentor' || userType === 'Entrepreneur') {
        formData.append('areaOfExpertise', areaOfExpertise);
        formData.append('experience', experience);
        formData.append('availableToMentor', availableToMentor);
        formData.append('mentorshipCount', mentorshipCount);
        if (profileImage) {
          formData.append('profileImage', profileImage);
        }
      } else if (userType === 'Investor') {
        formData.append('availableToInvest', availableToInvest);
        formData.append('investmentCount', investmentCount);
        formData.append('investmentAmount', investmentAmount);
        if (proofImage) {
          formData.append('proofImage', proofImage);
        }
      } else if (userType === 'Organization') {
        formData.append('orgnName', orgnName);
        formData.append('orgnHead', orgnHead);
        formData.append('orgnLocation', orgnLocation);
        formData.append('orgnType', orgnType);
        if (orgnProofPhoto) {
          formData.append('orgnProofPhoto', orgnProofPhoto);
        }
        if (profileImage) {
          formData.append('profileImage', profileImage);
        }
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

  return (
    <ThemeProvider theme={theme}>
        <Box sx={{ overflowX: 'hidden' }}>
      <Box sx={{ width: '100%', maxWidth: '100%', mx: 'auto', mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Signup Form
        </Typography>
        <Stepper activeStep={activeStep}>
    {steps.map((label, index) => (
      <Step key={label}>
        <CustomStepLabel StepIconProps={{ style: {fontSize:'20px',overflowX:'none'} }}>{label}</CustomStepLabel>
      </Step>
    ))}
  </Stepper>
        <Box sx={{ mt: 3 }}>
          {activeStep === steps.length ? (
            <Box>
              <Typography>All steps completed - you&apos;re finished</Typography>
            </Box>
          ) : (
            <>
              <Box component="form" onSubmit={handleSubmit}>
                {activeStep === 0 && (
                  <CustomTextField
                    fullWidth
                    label="Email"
                    value={email}
                    onChange={(e) => checkEmail(e.target.value)}
                    required
                  />
                )}
                {activeStep === 1 && (
                  userQuestions.map((question) => (
                    <Box key={question.key} sx={{ mb: 2 }}>
                      <CustomTextField
                        fullWidth
                        label={question.label}
                        value={question.value}
                        onChange={(e) => handleInputChange(question.key, e.target.value)}
                        required
                        error={!!question.error}
                        helperText={question.error}
                      />
                    </Box>
                  ))
                )}
                {activeStep === 2 && (
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>User Type</InputLabel>
                    <CustomSelect value={userType} onChange={handleUserTypeChange} required>
                      <MenuItem value="Student">Student</MenuItem>
                      <MenuItem value="Mentor">Mentor</MenuItem>
                      <MenuItem value="Investor">Investor</MenuItem>
                      <MenuItem value="Organization">Organization</MenuItem>
                      <MenuItem value="Entrepreneur">Entrepreneur</MenuItem>
                    </CustomSelect>
                  </FormControl>
                )}
                {activeStep === 3 && (
                  <>
                    {userType === 'Student' && (
                      <>
                        <CustomTextField
                          fullWidth
                          label="College Name"
                          value={collegeName}
                          onChange={(e) => setCollegeName(e.target.value)}
                          required
                          sx={{ mb: 2 }}
                        />
                        <CustomTextField
                          fullWidth
                          label="Course"
                          value={course}
                          onChange={(e) => setCourse(e.target.value)}
                          required
                          sx={{ mb: 2 }}
                        />
                        <CustomTextField
                          fullWidth
                          label="College Location"
                          value={collegeLocation}
                          onChange={(e) => setCollegeLocation(e.target.value)}
                          required
                          sx={{ mb: 2 }}
                        />
                        <CustomTextField
                          fullWidth
                          label="GitHub Profile"
                          value={git}
                          onChange={(e) => setGit(e.target.value)}
                          required
                          sx={{ mb: 2 }}
                        />
                        <Box sx={{ mb: 2 }}>
                          <Button
                            variant="contained"
                            component="label"
                          >
                            Upload College ID Photo
                            <input
                              type="file"
                              hidden
                              onChange={(e) => handleFileChange(e, setCollegeIdPhoto, setCollegeIdPhotoUrl)}
                              required
                            />
                          </Button>
                          {collegeIdPhotoUrl && <img src={collegeIdPhotoUrl} alt="College ID" width="100" />}
                        </Box>
                      </>
                    )}
                    {(userType === 'Mentor' || userType === 'Entrepreneur') && (
                      <>
                        <CustomTextField
                          fullWidth
                          label="Area of Expertise"
                          value={areaOfExpertise}
                          onChange={(e) => setAreaOfExpertise(e.target.value)}
                          required
                          sx={{ mb: 2 }}
                        />
                        <CustomTextField
                          fullWidth
                          label="Experience"
                          value={experience}
                          onChange={(e) => setExperience(e.target.value)}
                          required
                          sx={{ mb: 2 }}
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
                        <CustomTextField
                          fullWidth
                          label="Mentorship Count"
                          value={mentorshipCount}
                          onChange={(e) => setMentorshipCount(e.target.value)}
                          required
                          sx={{ mb: 2 }}
                        />
                        <Box sx={{ mb: 2 }}>
                          <Button
                            variant="contained"
                            component="label"
                          >
                            Upload Profile Image
                            <input
                              type="file"
                              hidden
                              onChange={(e) => handleFileChange(e, setProfileImage, setProfileImageUrl)}
                              required
                            />
                          </Button>
                          {profileImageUrl && <img src={profileImageUrl} alt="Profile" width="100" />}
                        </Box>
                      </>
                    )}
                    {userType === 'Investor' && (
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
                        <CustomTextField
                          fullWidth
                          label="Investment Count"
                          value={investmentCount}
                          onChange={(e) => setInvestmentCount(e.target.value)}
                          required
                          sx={{ mb: 2 }}
                        />
                        <CustomTextField
                          fullWidth
                          label="Investment Amount"
                          value={investmentAmount}
                          onChange={(e) => setInvestmentAmount(e.target.value)}
                          required
                          sx={{ mb: 2 }}
                        />
                        <Box sx={{ mb: 2 }}>
                          <Button
                            variant="contained"
                            component="label"
                          >
                            Upload Proof Image
                            <input
                              type="file"
                              hidden
                              onChange={(e) => handleFileChange(e, setProofImage, setProofImageUrl)}
                              required
                            />
                          </Button>
                          {proofImageUrl && <img src={proofImageUrl} alt="Proof" width="100" />}
                        </Box>
                      </>
                    )}
                    {userType === 'Organization' && (
                      <>
                        <CustomTextField
                          fullWidth
                          label="Organization Name"
                          value={orgnName}
                          onChange={(e) => setOrgnName(e.target.value)}
                          required
                          sx={{ mb: 2 }}
                        />
                        <CustomTextField
                          fullWidth
                          label="Organization Head"
                          value={orgnHead}
                          onChange={(e) => setOrgnHead(e.target.value)}
                          required
                          sx={{ mb: 2 }}
                        />
                        <CustomTextField
                          fullWidth
                          label="Organization Location"
                          value={orgnLocation}
                          onChange={(e) => setOrgnLocation(e.target.value)}
                          required
                          sx={{ mb: 2 }}
                        />
                        <CustomTextField
                          fullWidth
                          label="Organization Type"
                          value={orgnType}
                          onChange={(e) => setOrgnType(e.target.value)}
                          required
                          sx={{ mb: 2 }}
                        />
                        <Box sx={{ mb: 2 }}>
                          <Button
                            variant="contained"
                            component="label"
                          >
                            Upload Proof Photo
                            <input
                              type="file"
                              hidden
                              onChange={(e) => handleFileChange(e, setOrgnProofPhoto, setOrgnProofPhotoUrl)}
                              required
                            />
                          </Button>
                          {orgnProofPhotoUrl && <img src={orgnProofPhotoUrl} alt="Proof" width="100" />}
                        </Box>
                        <Box sx={{ mb: 2 }}>
                          <Button
                            variant="contained"
                            component="label"
                          >
                            Upload Profile Image
                            <input
                              type="file"
                              hidden
                              onChange={(e) => handleFileChange(e, setProfileImage, setProfileImageUrl)}
                              required
                            />
                          </Button>
                          {profileImageUrl && <img src={profileImageUrl} alt="Profile" width="100" />}
                        </Box>
                      </>
                    )}
                  </>
                )}
                {activeStep === 4 && (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Review Your Information
                    </Typography>
                    <Table >
                      <TableHead style={{color:'white'}}>
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
                        {userQuestions.map((question) => (
                          <TableRow key={question.key}>
                            <TableCell>{question.label}</TableCell>
                            <TableCell>{question.value}</TableCell>
                          </TableRow>
                        ))}
                        {userType === 'Student' && (
                          <>
                            <TableRow>
                              <TableCell>College Name</TableCell>
                              <TableCell>{collegeName}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Course</TableCell>
                              <TableCell>{course}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>College Location</TableCell>
                              <TableCell>{collegeLocation}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>GitHub Profile</TableCell>
                              <TableCell>{git}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>College ID Photo</TableCell>
                              <TableCell>
                                {collegeIdPhotoUrl && <img src={collegeIdPhotoUrl} alt="College ID" width="50" />}
                              </TableCell>
                            </TableRow>
                          </>
                        )}
                        {(userType === 'Mentor' || userType === 'Entrepreneur') && (
                          <>
                            <TableRow>
                              <TableCell>Area of Expertise</TableCell>
                              <TableCell>{areaOfExpertise}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Experience</TableCell>
                              <TableCell>{experience}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Available to Mentor</TableCell>
                              <TableCell>{availableToMentor ? 'Yes' : 'No'}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Mentorship Count</TableCell>
                              <TableCell>{mentorshipCount}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Profile Image</TableCell>
                              <TableCell>
                                {profileImageUrl && <img src={profileImageUrl} alt="Profile" width="50" />}
                              </TableCell>
                            </TableRow>
                          </>
                        )}
                        {userType === 'Investor' && (
                          <>
                            <TableRow>
                              <TableCell>Available to Invest</TableCell>
                              <TableCell>{availableToInvest ? 'Yes' : 'No'}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Investment Count</TableCell>
                              <TableCell>{investmentCount}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Investment Amount</TableCell>
                              <TableCell>{investmentAmount}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Proof Image</TableCell>
                              <TableCell>
                                {proofImageUrl && <img src={proofImageUrl} alt="Proof" width="50" />}
                              </TableCell>
                            </TableRow>
                          </>
                        )}
                        {userType === 'Organization' && (
                          <>
                            <TableRow>
                              <TableCell>Organization Name</TableCell>
                              <TableCell>{orgnName}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Organization Head</TableCell>
                              <TableCell>{orgnHead}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Organization Location</TableCell>
                              <TableCell>{orgnLocation}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Organization Type</TableCell>
                              <TableCell>{orgnType}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Proof Photo</TableCell>
                              <TableCell>
                                {orgnProofPhotoUrl && <img src={orgnProofPhotoUrl} alt="Proof" width="50" />}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Profile Image</TableCell>
                              <TableCell>
                                {profileImageUrl && <img src={profileImageUrl} alt="Profile" width="50" />}
                              </TableCell>
                            </TableRow>
                          </>
                        )}
                      </TableBody>
                    </Table>
                  </Box>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mr: 1 }}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    type={activeStep === steps.length - 1 ? 'submit' : 'button'}
                  >
                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                  </Button>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Box></Box>
    </ThemeProvider>
  );
};

export default SignupQuestions;
