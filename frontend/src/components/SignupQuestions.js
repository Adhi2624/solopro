import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Stepper, Step, StepLabel, FormControl, InputLabel, MenuItem, Select, FormControlLabel, Switch, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';
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
  const [formData, setFormData] = useState({
    email: '',
    userQuestions: [
      { key: 'question1', label: 'What is your first name?', value: '', error: '' },
      { key: 'question2', label: 'What is your last name?', value: '', error: '' },
      { key: 'password', label: 'Set Password', value: '', error: '' },
      { key: 'confirmPassword', label: 'Confirm Password', value: '', error: '' },
    ],
    userType: '',
    collegeName: '',
    course: '',
    collegeLocation: '',
    git: '',
    collegeIdPhoto: null,
    collegeIdPhotoUrl: '',
    areaOfExpertise: '',
    experience: '',
    availableToMentor: false,
    mentorshipCount: '',
    availableToInvest: false,
    investmentCount: '',
    investmentAmount: '',
    proofImage: null,
    proofImageUrl: '',
    profileImage: null,
    profileImageUrl: '',
    orgnName: '',
    orgnHead: '',
    orgnLocation: '',
    orgnType: '',
    orgnProofPhoto: null,
    orgnProofPhotoUrl: '',
  });
  let history = useNavigate(); 
  const handleInputChange = (key, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      userQuestions: prevFormData.userQuestions.map((question) =>
        question.key === key ? { ...question, value, error: value ? '' : 'This field is required' } : question
      )
    }));
  };
  const validatePasswords = () => {
    const password = formData.userQuestions.find(q => q.key === 'password').value;
    const confirmPassword = formData.userQuestions.find(q => q.key === 'confirmPassword').value;
    if (password !== confirmPassword) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        userQuestions: prevFormData.userQuestions.map((question) =>
          (question.key === 'password' || question.key === 'confirmPassword') ? 
            { ...question, error: 'Passwords do not match' } : question
        )
      }));
      return false;
    }
    return true;
  };
  const checkEmail = async (email) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      email
    }));
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
    setFormData((prevFormData) => ({
      ...prevFormData,
      userType: event.target.value
    }));
  };

  const handleFileChange = (e, field) => {
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
        setFormData((prevFormData) => ({
          ...prevFormData,
          [field]: file,
          [`${field}Url`]: dataUrl
        }));
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
      if (!formData.email) {
        isValid = false;
        alert('Email is required');
      }
    } else if (activeStep === 1) {
      const updatedQuestions = formData.userQuestions.map((question) => {
        if (!question.value) {
          isValid = false;
          return { ...question, error: 'This field is required' };
        }
        return { ...question, error: '' };
      });
      setFormData((prevFormData) => ({
        ...prevFormData,
        userQuestions: updatedQuestions
      }));
      isValid = validatePasswords();
    } else if (activeStep === 2) {
      if (!formData.userType) {
        isValid = false;
        alert('User Type is required');
      }
    } else if (activeStep === 3) {
      if (formData.userType === 'Student') {
        if (!formData.collegeName || !formData.course || !formData.collegeLocation || !formData.git || !formData.collegeIdPhoto) {
          isValid = false;
          alert('All fields for Student are required');
        }
      } else if (formData.userType === 'Mentor' || formData.userType === 'Entrepreneur') {
        if (!formData.areaOfExpertise || !formData.experience || !formData.mentorshipCount || !formData.profileImage) {
          isValid = false;
          alert('All fields for Mentor/Entrepreneur are required');
        }
      } else if (formData.userType === 'Investor') {
        if (!formData.investmentCount || !formData.investmentAmount || !formData.proofImage) {
          isValid = false;
          alert('All fields for Investor are required');
        }
      } else if (formData.userType === 'Organization') {
        if (!formData.orgnName || !formData.orgnHead || !formData.orgnLocation || !formData.orgnType || !formData.orgnProofPhoto || !formData.profileImage) {
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
      try {
        const password = formData.userQuestions.find(q => q.key === 'password').value;
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const finalFormData = {
          ...formData,
          userQuestions: formData.userQuestions.map(q => 
            q.key === 'password' || q.key === 'confirmPassword' ? { ...q, value: hashedPassword } : q
          )
        };

        const response = await axios.post(`${backend}/api/signup`, finalFormData);
        if (response.status === 200) {
          alert('Signup successful');
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
              <Typography sx={{color:'white'}}>All steps completed - you&apos;re finished</Typography>
            </Box>
          ) : (
            <>
              <Box component="form" onSubmit={handleSubmit}>
                {activeStep === 0 && (
                  <CustomTextField
                    fullWidth
                    label="Email"
                    value={formData.email}
                    onChange={(e) => checkEmail(e.target.value)}
                    required
                  />
                )}
                {activeStep === 1 && (
                  formData.userQuestions.map((question) => (
                    <Box>
                    {formData.userQuestions.map((question, index) => (
                      <CustomTextField
                        key={index}
                        label={question.label}
                        fullWidth
                        type={question.key.includes('password') || question.key.includes('confirmPassword') ? 'password' : 'text'}
                        value={question.value}
                        onChange={(e) => handleInputChange(question.key, e.target.value)}
                        error={!!question.error}
                        helperText={question.error}
                        sx={{ mt: 2 }}
                      />
                    ))}
                  </Box>
                  ))
                )}
                {activeStep === 2 && (
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>User Type</InputLabel>
                    <CustomSelect value={formData.userType} onChange={handleUserTypeChange} required>
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
                    {formData.userType === 'Student' && (
                      <>
                        <CustomTextField
                          fullWidth
                          label="College Name"
                          value={formData.collegeName}
                          onChange={(e) => setFormData((prevFormData) => ({
                            ...prevFormData,
                            collegeName: e.target.value
                          }))}
                          required
                          sx={{ mb: 2 }}
                        />
                        <CustomTextField
                          fullWidth
                          label="Course"
                          value={formData.course}
                          onChange={(e) => setFormData((prevFormData) => ({
                            ...prevFormData,
                            course: e.target.value
                          }))}
                          required
                          sx={{ mb: 2 }}
                        />
                        <CustomTextField
                          fullWidth
                          label="College Location"
                          value={formData.collegeLocation}
                          onChange={(e) => setFormData((prevFormData) => ({
                            ...prevFormData,
                            collegeLocation: e.target.value
                          }))}
                          required
                          sx={{ mb: 2 }}
                        />
                        <CustomTextField
                          fullWidth
                          label="GitHub Profile"
                          value={formData.git}
                          onChange={(e) => setFormData((prevFormData) => ({
                            ...prevFormData,
                            git: e.target.value
                          }))}
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
                              onChange={(e) => handleFileChange(e, 'collegeIdPhoto')}
                              required
                            />
                          </Button>
                          {formData.collegeIdPhotoUrl && <img src={formData.collegeIdPhotoUrl} alt="College ID" width="100" />}
                        </Box>
                      </>
                    )}
                    {(formData.userType === 'Mentor' || formData.userType === 'Entrepreneur') && (
                      <>
                        <CustomTextField
                          fullWidth
                          label="Area of Expertise"
                          value={formData.areaOfExpertise}
                          onChange={(e) => setFormData((prevFormData) => ({
                            ...prevFormData,
                            areaOfExpertise: e.target.value
                          }))}
                          required
                          sx={{ mb: 2 }}
                        />
                        <CustomTextField
                          fullWidth
                          label="Experience"
                          value={formData.experience}
                          onChange={(e) => setFormData((prevFormData) => ({
                            ...prevFormData,
                            experience: e.target.value
                          }))}
                          required
                          sx={{ mb: 2 }}
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={formData.availableToMentor}
                              onChange={(e) => setFormData((prevFormData) => ({
                                ...prevFormData,
                                availableToMentor: e.target.checked
                              }))}
                            />
                          }
                          label="Available to Mentor"
                        />
                        <CustomTextField
                          fullWidth
                          label="Mentorship Count"
                          value={formData.mentorshipCount}
                          onChange={(e) => setFormData((prevFormData) => ({
                            ...prevFormData,
                            mentorshipCount: e.target.value
                          }))}
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
                              onChange={(e) => handleFileChange(e, 'profileImage')}
                              required
                            />
                          </Button>
                          {formData.profileImageUrl && <img src={formData.profileImageUrl} alt="Profile" width="100" />}
                        </Box>
                      </>
                    )}
                    {formData.userType === 'Investor' && (
                      <>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={formData.availableToInvest}
                              onChange={(e) => setFormData((prevFormData) => ({
                                ...prevFormData,
                                availableToInvest: e.target.checked
                              }))}
                            />
                          }
                          label="Available to Invest"
                        />
                        <CustomTextField
                          fullWidth
                          label="Investment Count"
                          value={formData.investmentCount}
                          onChange={(e) => setFormData((prevFormData) => ({
                            ...prevFormData,
                            investmentCount: e.target.value
                          }))}
                          required
                          sx={{ mb: 2 }}
                        />
                        <CustomTextField
                          fullWidth
                          label="Investment Amount"
                          value={formData.investmentAmount}
                          onChange={(e) => setFormData((prevFormData) => ({
                            ...prevFormData,
                            investmentAmount: e.target.value
                          }))}
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
                              onChange={(e) => handleFileChange(e, 'proofImage')}
                              required
                            />
                          </Button>
                          {formData.proofImageUrl && <img src={formData.proofImageUrl} alt="Proof" width="100" />}
                        </Box>
                      </>
                    )}
                    {formData.userType === 'Organization' && (
                      <>
                        <CustomTextField
                          fullWidth
                          label="Organization Name"
                          value={formData.orgnName}
                          onChange={(e) => setFormData((prevFormData) => ({
                            ...prevFormData,
                            orgnName: e.target.value
                          }))}
                          required
                          sx={{ mb: 2 }}
                        />
                        <CustomTextField
                          fullWidth
                          label="Organization Head"
                          value={formData.orgnHead}
                          onChange={(e) => setFormData((prevFormData) => ({
                            ...prevFormData,
                            orgnHead: e.target.value
                          }))}
                          required
                          sx={{ mb: 2 }}
                        />
                        <CustomTextField
                          fullWidth
                          label="Organization Location"
                          value={formData.orgnLocation}
                          onChange={(e) => setFormData((prevFormData) => ({
                            ...prevFormData,
                            orgnLocation: e.target.value
                          }))}
                          required
                          sx={{ mb: 2 }}
                        />
                        <CustomTextField
                          fullWidth
                          label="Organization Type"
                          value={formData.orgnType}
                          onChange={(e) => setFormData((prevFormData) => ({
                            ...prevFormData,
                            orgnType: e.target.value
                          }))}
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
                              onChange={(e) => handleFileChange(e, 'orgnProofPhoto')}
                              required
                            />
                          </Button>
                          {formData.orgnProofPhotoUrl && <img src={formData.orgnProofPhotoUrl} alt="Proof" width="100" />}
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
                              onChange={(e) => handleFileChange(e, 'profileImage')}
                              required
                            />
                          </Button>
                          {formData.profileImageUrl && <img src={formData.profileImageUrl} alt="Profile" width="100" />}
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
                          <TableCell>{formData.email}</TableCell>
                        </TableRow>
                        {formData.userQuestions.map((question) => (
                          <TableRow key={question.key}>
                            <TableCell>{question.label}</TableCell>
                            <TableCell>{question.value}</TableCell>
                          </TableRow>
                        ))}
                        {formData.userType === 'Student' && (
                          <>
                            <TableRow>
                              <TableCell>College Name</TableCell>
                              <TableCell>{formData.collegeName}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Course</TableCell>
                              <TableCell>{formData.course}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>College Location</TableCell>
                              <TableCell>{formData.collegeLocation}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>GitHub Profile</TableCell>
                              <TableCell>{formData.git}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>College ID Photo</TableCell>
                              <TableCell>
                                {formData.collegeIdPhotoUrl && <img src={formData.collegeIdPhotoUrl} alt="College ID" width="50" />}
                              </TableCell>
                            </TableRow>
                          </>
                        )}
                        {(formData.userType === 'Mentor' || formData.userType === 'Entrepreneur') && (
                          <>
                            <TableRow>
                              <TableCell>Area of Expertise</TableCell>
                              <TableCell>{formData.areaOfExpertise}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Experience</TableCell>
                              <TableCell>{formData.experience}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Available to Mentor</TableCell>
                              <TableCell>{formData.availableToMentor ? 'Yes' : 'No'}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Mentorship Count</TableCell>
                              <TableCell>{formData.mentorshipCount}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Profile Image</TableCell>
                              <TableCell>
                                {formData.profileImageUrl && <img src={formData.profileImageUrl} alt="Profile" width="50" />}
                              </TableCell>
                            </TableRow>
                          </>
                        )}
                        {formData.userType === 'Investor' && (
                          <>
                            <TableRow>
                              <TableCell>Available to Invest</TableCell>
                              <TableCell>{formData.availableToInvest ? 'Yes' : 'No'}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Investment Count</TableCell>
                              <TableCell>{formData.investmentCount}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Investment Amount</TableCell>
                              <TableCell>{formData.investmentAmount}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Proof Image</TableCell>
                              <TableCell>
                                {formData.proofImageUrl && <img src={formData.proofImageUrl} alt="Proof" width="50" />}
                              </TableCell>
                            </TableRow>
                          </>
                        )}
                        {formData.userType === 'Organization' && (
                          <>
                            <TableRow>
                              <TableCell>Organization Name</TableCell>
                              <TableCell>{formData.orgnName}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Organization Head</TableCell>
                              <TableCell>{formData.orgnHead}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Organization Location</TableCell>
                              <TableCell>{formData.orgnLocation}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Organization Type</TableCell>
                              <TableCell>{formData.orgnType}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Proof Photo</TableCell>
                              <TableCell>
                                {formData.orgnProofPhotoUrl && <img src={formData.orgnProofPhotoUrl} alt="Proof" width="50" />}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Profile Image</TableCell>
                              <TableCell>
                                {formData.profileImageUrl && <img src={formData.profileImageUrl} alt="Profile" width="50" />}
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