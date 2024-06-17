import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import testImage from "./login.png";
import Navbarr from "./nav";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { setItemWithExpiry } from "./localStorageWithExpiry"; // Import the utility function
import { useNavigate } from "react-router-dom";

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

const defaultTheme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial, sans-serif",
  },
});

export default function Login() {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    const backend = process.env.REACT_APP_BACKEND;

    try {
      const response = await axios.post(`${backend}/api/login`, {
        email,
        password,
      });
      const userData = response.data;

      // Store user data in local storage with expiry (1 hour = 3600000 milliseconds)
      setItemWithExpiry("user", userData, 3600000);

      console.log(userData);

      if (userData.role==='Student'){
        navigate('/student/');
      }
      else if (userData.role==='Mentor' || userData.role==='Investor'){
        navigate('/mi/');
      }
        else if(userData.role==='Admin'){}
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <>
        <Navbarr />
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(${testImage})`,
              backgroundRepeat: "no-repeat",
              backgroundColor: "#040F15",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundSize: "60%",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
            style={{ backgroundColor: "#040F15", color: "white" }}
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 30,
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <Typography component="p" variant="body1">
                Please fill your information below
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 10 }}
                style={{ color: "white", width: "55%" }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  InputLabelProps={{
                    style: { color: "white" },
                  }}
                  InputProps={{
                    style: {
                      color: "white",
                  
                      borderColor: "white",
                    },
                  }}
                  sx={{
                    borderRadius: "10px",
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
                      WebkitBoxShadow: "0 0 0 1000px  inset",
                      WebkitTextFillColor: "white",
                    },
                    "& input:-webkit-autofill:focus": {
                      WebkitBoxShadow: "0 0 0 1000px  inset",
                      WebkitTextFillColor: "white",
                    },
                    "& input:-webkit-autofill:hover": {
                      WebkitBoxShadow: "0 0 0 1000px  inset",
                      WebkitTextFillColor: "white",
                    },
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  InputLabelProps={{
                    style: { color: "white" },
                  }}
                  InputProps={{
                    style: {
                      color: "white",
                      
                      borderColor: "white",
                    },
                  }}
                  sx={{
                    borderRadius: "10px",
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
                      WebkitBoxShadow: "0 0 0 1000px  inset",
                      WebkitTextFillColor: "white",
                    },
                    "& input:-webkit-autofill:focus": {
                      WebkitBoxShadow: "0 0 0 1000px  inset",
                      WebkitTextFillColor: "white",
                    },
                    "& input:-webkit-autofill:hover": {
                      WebkitBoxShadow: "0 0 0 1000px  inset",
                      WebkitTextFillColor: "white",
                    },
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Log in
                </Button>
                <Grid container>
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Typography variant="body2" style={{ fontSize: "1.2rem" }}>
                      Don't have an account? No worries, we have got you covered
                      <br />
                      <RouterLink
                        to="/signup"
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          fullWidth
                          variant="outlined"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Sign up
                        </Button>
                      </RouterLink>
                    </Typography>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5, color: "white" }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </>
    </ThemeProvider>
  );
}
