import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import Nav from './nav';

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial, sans-serif",
  },
});

const backendUrl = process.env.REACT_APP_BACKEND;

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href=""
        sx={{
          textDecoration: "none",
          "&:hover": {
            textDecoration: "none",
          },
        }}
      >
        SOLOPRO
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [originalOtp, setOriginalOtp] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [cpasswordError, setCPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [disableSubmitButton, setDisableSubmitButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (otpTimer > 0) {
      timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
    } else {
      setDisableSubmitButton(false);
    }
    return () => clearTimeout(timer);
  }, [otpTimer]);

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "Please enter a valid email address.";
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  const validatePassword = (password) => {
    return password.length >= 6 ? "" : "Password must be at least 6 characters long.";
  };

  const handleCPasswordChange = (event) => {
    const value = event.target.value;
    setCPassword(value);
    setCPasswordError(value !== password ? "Passwords do not match" : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/forgot_password`, { email });
      if (response.data.message === "User not found") {
        alert("Email not found. Contact Administrator");
      } else {
        setShowOtp(true);
        alert("an otp has been sent your mail valid for 120 seconds")
        setOriginalOtp(response.data.otp);
        setOtpTimer(60);
        setDisableSubmitButton(true);
        
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    console.log(otp, originalOtp);
    if (otp === originalOtp) {
      setShowPassword(true);
    } else {
      alert("Invalid OTP. Try Again");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/update_password`, { email, password });
      if (response.data === "no") {
        alert("Technical Failure. Please try again");
      } else {
        alert("Password Changed Successfully");
        navigate("/login");
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
    }
  };

  const handleBack = () => {
    navigate("/login");
  };

  return (
    <ThemeProvider theme={theme}>
      <Nav></Nav>
      <Grid container component="main" sx={{ height: "100vh", backgroundColor: "#040F15" }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{ backgroundColor: "#040F15", color: "white" }}>
          <Box sx={{ my: 8, mx: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Reset Password
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }} style={{ color: "white", width: "100%" }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                InputLabelProps={{ style: { color: "white" } }}
                InputProps={{ style: { color: "white", borderColor: "white" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "white" },
                    "&.Mui-focused fieldset": { borderColor: "white" },
                  },
                }}
                value={email}
                onChange={handleEmailChange}
              />
              {emailError && <span className="error-message">{emailError}</span>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={disableSubmitButton}
              >
                Submit {otpTimer > 0 && `(${otpTimer}s)`}
              </Button>
            </Box>
            {showOtp && (
              <Box component="form" onSubmit={handleOtpSubmit} noValidate sx={{ mt: 3 }} style={{ color: "white", width: "100%" }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="otp"
                  label="One-Time Password"
                  name="otp"
                  autoComplete="otp"
                  autoFocus
                  InputLabelProps={{ style: { color: "white" } }}
                  InputProps={{ style: { color: "white", borderColor: "white" } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "white" },
                      "&.Mui-focused fieldset": { borderColor: "white" },
                    },
                  }}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Verify OTP
                </Button>
              </Box>
            )}
            {showPassword && (
              <Box component="form" onSubmit={handlePasswordSubmit} noValidate sx={{ mt: 3 }} style={{ color: "white", width: "100%" }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="New Password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  InputLabelProps={{ style: { color: "white" } }}
                  InputProps={{ style: { color: "white", borderColor: "white" } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "white" },
                      "&.Mui-focused fieldset": { borderColor: "white" },
                    },
                  }}
                  value={password}
                  onChange={handlePasswordChange}
                />
                {passwordError && <span className="error-message">{passwordError}</span>}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="cpassword"
                  label="Confirm Password"
                  name="cpassword"
                  type="password"
                  autoComplete="new-password"
                  InputLabelProps={{ style: { color: "white" } }}
                  InputProps={{ style: { color: "white", borderColor: "white" } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "white" },
                      "&.Mui-focused fieldset": { borderColor: "white" },
                    },
                  }}
                  value={cpassword}
                  onChange={handleCPasswordChange}
                />
                {cpasswordError && <span className="error-message">{cpasswordError}</span>}
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Submit
                </Button>
              </Box>
            )}
            <Button fullWidth variant="contained" onClick={handleBack} sx={{ mt: 3, mb: 2 }}>
              Back
            </Button>
            <Copyright sx={{ mt: 5, color: "white", textDecoration: 'none' }} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
