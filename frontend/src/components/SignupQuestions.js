import React, { useState } from 'react';
import { TextField, Box, Typography, Select, MenuItem, Button, Switch, FormControlLabel } from '@mui/material';
import { styled } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
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
      default: '#040F15',
    },
    text: {
      primary: '#fff',
    },
  },
});
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
  
          // Optionally, you can preview the resized image:
          // setImageUrl(dataUrl);
        };
        img.src = e.target.result;
      };
  
      reader.readAsDataURL(file);
    }
  };
  
  const validateForm = () => {
    let isValid = true;
    setUserQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        let error = '';
        if (question.required && !question.value) {
          error = `${question.label} is required`;
          isValid = false;
        } else if (question.minLength && question.value.length < question.minLength) {
          error = `${question.label} should be at least ${question.minLength} characters`;
          isValid = false;
        } else if (question.maxLength && question.value.length > question.maxLength) {
          error = `${question.label} should be at mo      st ${question.maxLength} characters`;
          isValid = false;
        }
        return { ...question, error };
      })
    );
    return isValid;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log('Form submitted', userQuestions);
      const formData = new FormData();
      userQuestions.forEach((question) => {
        formData.append(question.key, question.value);
      });
      formData.append('userType', userType); // Add userType to form data
      // Append additional data based on user type
      if (userType === 'Student') {
        formData.append('collegeName', collegeName);
        formData.append('course', course);
        formData.append('collegeLocation', collegeLocation);
        formData.append('git', git);
        formData.append('profileImage', profileImageUrl);
        formData.append('collegeIdPhoto', collegeIdPhotoUrl);
      } else if (userType === 'Mentor') {
        formData.append('areaOfExpertise', areaOfExpertise);
        formData.append('experience', experience);
        formData.append('profileImage', profileImageUrl);
        formData.append('proofImage', proofImageUrl);
        formData.append('availableToMentor', availableToMentor);
        formData.append('mentorshipCount', mentorshipCount);
      } else if (userType === 'Investor') {
        formData.append('areaOfExpertise', areaOfExpertise);
        formData.append('experience', experience);
        formData.append('profileImage', profileImageUrl);
        formData.append('proofImage', proofImageUrl);
        formData.append('availableToInvest', availableToInvest);
        formData.append('investmentCount', investmentCount);
        formData.append('investmentAmount', investmentAmount);
      }
      for (const [key, value] of formData.entries()) {
        console.log(key, value)
      }
      console.log(profileImageUrl);
      try {
        const response = await axios.post(`${backend}/api/signup`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Response:', response.data);
        alert('Submitted successfully');

      } catch (error) {
        console.error('There was an error!', error.message);
        alert('An error occurred while submitting the form');
      }
      console.log(formData)
    }
  };
  const renderUserQuestions = () => (
    <>
      <Typography variant="h6" sx={{ fontWeight: 'bold', display: 'flex', textAlign: 'center', alignContent: 'center' }}>
        Before you Finish, Let's get to know about you a bit
      </Typography>
      {userQuestions.map((question) => (
        <CustomTextField
          key={question.key}
          label={question.label}
          variant="outlined"
          value={question.value}
          onChange={(e) => handleInputChange(question.key, e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white' } }}
          placeholder={question.label} // Set placeholder to test
          error={!!question.error}
          helperText={question.error}
        />
      ))}
      <CustomSelect
        value={userType}
        onChange={handleUserTypeChange}
        displayEmpty
        fullWidth
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <CustomMenuItem value="" disabled>
          Select User Type
        </CustomMenuItem>
        <CustomMenuItem value="Student">Student</CustomMenuItem>
        <CustomMenuItem value="Mentor">Mentor</CustomMenuItem>
        <CustomMenuItem value="Investor">Investor</CustomMenuItem>
      </CustomSelect>
      {userType && renderAdditionalQuestions(userType)}
    </>
  );
  const renderAdditionalQuestions = (type) => {
    switch (type) {
      case 'Student':
        return renderStudentQuestions();
      case 'Mentor':
      case 'Investor':
        return renderMentorOrInvestorQuestions(type);
      default:
        return null;
    }
  };
  const renderStudentQuestions = () => (
    <>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        Student Model:
      </Typography>
      <CustomTextField
        label="CollegeName"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={collegeName}
        onChange={(e) => setCollegeName(e.target.value)}
      />
      <CustomTextField
        label="Course"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      />
      <CustomTextField
        label="CollegeLocation"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={collegeLocation}
        onChange={(e) => setCollegeLocation(e.target.value)}
      />
      <CustomTextField
        label="GitHub"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={git}
        onChange={(e) => setGit(e.target.value)}
      />
      <input type="file" accept="image/*" id="college-id-image" style={{ display: 'none' }} onChange={(e) => handleFileChange(e, setcollegeIdPhoto, setcollegeIdPhotoUrl)} />
      <label htmlFor="college-id-image">
        <Button component="span" variant="outlined" sx={{ color: '#fff', borderColor: '#369eff', mb: 2 }}>
          Upload College ID Photo
        </Button>
      </label>
      {collegeIdPhotoUrl && <img src={collegeIdPhotoUrl} alt="College ID Preview" style={{ width: '100%', marginBottom: '16px' }} />}
      <input type="file" accept="image/*" id="profile-image" style={{ display: 'none' }} onChange={(e) => handleFileChange(e, setProfileImage, setProfileImageUrl)} />
      <label htmlFor="profile-image">
        <Button component="span" variant="outlined" sx={{ color: '#fff', borderColor: '#369eff', mb: 2 }}>
          Upload Profile Image
        </Button>
      </label>
      {profileImageUrl && <img src={profileImageUrl} alt="Profile Preview" style={{ width: '100%', marginBottom: '16px' }} />}
    </>
  );
  const renderMentorOrInvestorQuestions = (type) => (
    <>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {type} Model:
      </Typography>
      <CustomTextField
        label="Area of Expertise"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={areaOfExpertise}
        onChange={(e) => setAreaOfExpertise(e.target.value)}
      />
      <CustomTextField
        label="Experience"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
      />
      <input type="file" accept="image/*" id={`${type.toLowerCase()}-proof-image`} style={{ display: 'none' }} onChange={(e) => handleFileChange(e, setProofImage, setProofImageUrl)} />
      <label htmlFor={`${type.toLowerCase()}-proof-image`}>
        <Button component="span" variant="outlined" sx={{ color: '#fff', borderColor: '#369eff', mb: 2 }}>
          Upload ID Proof
        </Button>
      </label>
      {proofImageUrl && <img src={proofImageUrl} alt="ID Proof Preview" style={{ width: '100%', marginBottom: '16px' }} />}
      <FormControlLabel
        control={
          <Switch
            checked={type === 'Mentor' ? availableToMentor : availableToInvest}
            onChange={(e) => type === 'Mentor' ? setAvailableToMentor(e.target.checked) : setAvailableToInvest(e.target.checked)}
            color="primary"
          />
        }
        label={`Available to ${type === 'Mentor' ? 'Mentor' : 'Invest'}`}
        sx={{ color: 'white', mb: 2 }}
      />
      <CustomTextField
        label="Mentorship Count"
        variant="outlined"
        type="number"
        fullWidth
        sx={{ mb: 2 }}
        value={mentorshipCount}
        onChange={(e) => setMentorshipCount(e.target.value)}
      />
      {type === 'Investor' && (
        <>
          <CustomTextField
            label="Investment Count"
            variant="outlined"
            type="number"
            fullWidth
            sx={{ mb: 2 }}
            value={investmentCount}
            onChange={(e) => setInvestmentCount(e.target.value)}
          />
          {investmentCount > 0 && (
            <CustomTextField
              label="Investment Amount"
              variant="outlined"
              type="number"
              fullWidth
              sx={{ mb: 2 }}
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(e.target.value)}
            />
          )}
        </>
      )}
      <input type="file" accept="image/*" id={`${type.toLowerCase()}-profile-image`} style={{ display: 'none' }} onChange={(e) => handleFileChange(e, setProfileImage, setProfileImageUrl)} />
      <label htmlFor={`${type.toLowerCase()}-profile-image`}>
        <Button component="span" variant="outlined" sx={{ color: '#fff', borderColor: '#369eff', mb: 2 }}>
          Upload Profile Image
        </Button>
      </label>
      {profileImageUrl && <img src={profileImageUrl} alt="Profile Preview" style={{ width: '100%', marginBottom: '16px' }} />}
    </>
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: '16px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            border: '1px solid #369eff66',
            width: '90%',
            padding: 3,
            backgroundColor: '#040F15',
          }}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
            ONE LAST STEP!
          </Typography>
          {renderUserQuestions()}
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2, bgcolor: '#369eff', color: '#fff' }}
            type="submit"
          >
            Proceed
          </Button>
        </Box>
      </div>
    </ThemeProvider>
  );
}