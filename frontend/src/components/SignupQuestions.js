import React, { useState } from 'react';
import { TextField, Box, Typography, Select, MenuItem, Button, Switch, FormControlLabel } from '@mui/material';
import { styled } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [institution, setInstitution] = useState('');
  const [workplace, setWorkplace] = useState('');
  const [errors, setErrors] = useState({});

  const [profileImage, setProfileImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [collegeIdImage, setCollegeIdImage] = useState(null);
  const [collegeIdImageUrl, setCollegeIdImageUrl] = useState(null);
  const [proofImage, setProofImage] = useState(null);
  const [proofImageUrl, setProofImageUrl] = useState(null);
  const [availableToMentorOrInvest, setAvailableToMentorOrInvest] = useState(false);
  const [mentorshipCount, setMentorshipCount] = useState(0);
  const [investmentCount, setInvestmentCount] = useState(0);
  const [investmentAmount, setInvestmentAmount] = useState('');

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleFileChange = (event, setImage, setImageUrl) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!username) {
      newErrors.username = 'Username is required';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    if (!phone) {
      newErrors.phone = 'Phone is required';
      isValid = false;
    } else if (phone.length !== 10) {
      newErrors.phone = 'Phone should be exactly 10 characters';
      isValid = false;
    }

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    }

    if (!linkedin) {
      newErrors.linkedin = 'LinkedIn is required';
      isValid = false;
    }

    if (!institution) {
      newErrors.institution = 'Institution is required';
      isValid = false;
    }

    if (!workplace) {
      newErrors.workplace = 'Native/Place of Work is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      // Form is valid, proceed with form submission logic
      console.log('Form submitted', { name, username, password, phone, email, linkedin, institution, workplace });
    }
  };

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
          <Typography variant="h6" sx={{ fontWeight: 'bold', display: 'flex', textAlign: 'center', alignContent: 'center' }}>
            Before you Finish, Let's get to know about you a bit
          </Typography>
          <CustomTextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
            placeholder="Name"
            error={!!errors.name}
            helperText={errors.name}
          />
          <CustomTextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
            placeholder="Username"
            error={!!errors.username}
            helperText={errors.username}
          />
          <CustomTextField
            label="Password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
            placeholder="Password"
            error={!!errors.password}
            helperText={errors.password}
            type="password"
          />
          <CustomTextField
            label="Confirm Password"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
            placeholder="Confirm Password"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            type="password"
          />
          <CustomTextField
            label="Phone"
            variant="outlined"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
            placeholder="Phone"
            error={!!errors.phone}
            helperText={errors.phone}
            type="tel"
          />
          <CustomTextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
            placeholder="Email"
            error={!!errors.email}
            helperText={errors.email}
            type="email"
          />
          <CustomTextField
            label="LinkedIn"
            variant="outlined"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
            placeholder="LinkedIn"
            error={!!errors.linkedin}
            helperText={errors.linkedin}
          />
          <CustomTextField
            label="Institution"
            variant="outlined"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
            placeholder="Institution"
            error={!!errors.institution}
            helperText={errors.institution}
          />
          <CustomTextField
            label="Native/Place of Work"
            variant="outlined"
            value={workplace}
            onChange={(e) => setWorkplace(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' } }}
            placeholder="Native/Place of Work"
            error={!!errors.workplace}
            helperText={errors.workplace}
          />
          <CustomSelect
            value={userType}
            onChange={handleUserTypeChange}
            variant="outlined"
            displayEmpty
            fullWidth
            sx={{ mb: 2 }}
          >
            <CustomMenuItem value="" disabled>
              Role
            </CustomMenuItem>
            <CustomMenuItem value="Student">Student</CustomMenuItem>
            <CustomMenuItem value="Mentor">Mentor</CustomMenuItem>
            <CustomMenuItem value="Investor">Investor</CustomMenuItem>
          </CustomSelect>

          {userType && (
            <>
              {userType === 'Student' && (
                <>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Student Model:
                  </Typography>
                  <CustomTextField
                    label="College Name"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{ style: { color: 'white' } }}
                    placeholder="College Name"
                  />
                  <CustomTextField
                    label="Course"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{ style: { color: 'white' } }}
                    placeholder="Course"
                  />
                  <CustomTextField
                    label="College Location"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{ style: { color: 'white' } }}
                    placeholder="College Location"
                  />
                  <CustomTextField
                    label="GitHub"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{ style: { color: 'white' } }}
                    placeholder="GitHub"
                  />
                  <input type="file" accept="image/*" id="college-id-image" style={{ display: 'none' }} onChange={(e) => handleFileChange(e, setCollegeIdImage, setCollegeIdImageUrl)} />
                  <label htmlFor="college-id-image">
                    <Button component="span" variant="outlined" sx={{ color: '#fff', borderColor: '#369eff', mb: 2 }}>
                      Upload College ID Photo
                    </Button>
                  </label>
                  {collegeIdImageUrl && <img src={collegeIdImageUrl} alt="College ID Preview" style={{ width: '100%', marginBottom: '16px' }} />}
                  <input type="file" accept="image/*" id="profile-image" style={{ display: 'none' }} onChange={(e) => handleFileChange(e, setProfileImage, setProfileImageUrl)} />
                  <label htmlFor="profile-image">
                    <Button component="span" variant="outlined" sx={{ color: '#fff', borderColor: '#369eff', mb: 2 }}>
                      Upload Profile Image
                    </Button>
                  </label>
                  {profileImageUrl && <img src={profileImageUrl} alt="Profile Preview" style={{ width: '100%', marginBottom: '16px' }} />}
                </>
              )}
              {(userType === 'Mentor' || userType === 'Investor') && (
                <>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {userType} Model:
                  </Typography>
                  <CustomTextField
                    label="Area of Expertise"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{ style: { color: 'white' } }}
                    placeholder="Area of Expertise"
                  />
                  <CustomTextField
                    label="Experience"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{ style: { color: 'white' } }}
                    placeholder="Experience"
                  />
                  <input type="file" accept="image/*" id={`${userType.toLowerCase()}-proof-image`} style={{ display: 'none' }} onChange={(e) => handleFileChange(e, setProofImage, setProofImageUrl)} />
                  <label htmlFor={`${userType.toLowerCase()}-proof-image`}>
                    <Button component="span" variant="outlined" sx={{ color: '#fff', borderColor: '#369eff', mb: 2 }}>
                      Upload ID Proof
                    </Button>
                  </label>
                  {proofImageUrl && <img src={proofImageUrl} alt="ID Proof Preview" style={{ width: '100%', marginBottom: '16px' }} />}
                  <FormControlLabel
                    control={
                      <Switch
                        checked={availableToMentorOrInvest}
                        onChange={(e) => setAvailableToMentorOrInvest(e.target.checked)}
                        color="primary"
                      />
                    }
                    label={`Available to ${userType === 'Mentor' ? 'Mentor' : 'Invest'}`}
                    sx={{ color: 'white', mb: 2 }}
                  />
                  {userType === 'Mentor' && (
                    <CustomTextField
                      label="Mentorship Count"
                      variant="outlined"
                      type="number"
                      fullWidth
                      sx={{ mb: 2 }}
                      value={mentorshipCount}
                      onChange={(e) => setMentorshipCount(e.target.value)}
                      InputLabelProps={{ style: { color: 'white' } }}
                      InputProps={{ style: { color: 'white' } }}
                      placeholder="Mentorship Count"
                    />
                  )}
                  {userType === 'Investor' && (
                    <>
                      <CustomTextField
                        label="Investment Count"
                        variant="outlined"
                        type="number"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={investmentCount}
                        onChange={(e) => setInvestmentCount(e.target.value)}
                        InputLabelProps={{ style: { color: 'white' } }}
                        InputProps={{ style: { color: 'white' } }}
                        placeholder="Investment Count"
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
                          InputLabelProps={{ style: { color: 'white' } }}
                          InputProps={{ style: { color: 'white' } }}
                          placeholder="Investment Amount"
                        />
                      )}
                    </>
                  )}
                  <input type="file" accept="image/*" id={`${userType.toLowerCase()}-profile-image`} style={{ display: 'none' }} onChange={(e) => handleFileChange(e, setProfileImage, setProfileImageUrl)} />
                  <label htmlFor={`${userType.toLowerCase()}-profile-image`}>
                    <Button component="span" variant="outlined" sx={{ color: '#fff', borderColor: '#369eff', mb: 2 }}>
                      Upload Profile Image
                    </Button>
                  </label>
                  {profileImageUrl && <img src={profileImageUrl} alt="Profile Preview" style={{ width: '100%', marginBottom: '16px' }} />}
                </>
              )}
            </>
          )}
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
