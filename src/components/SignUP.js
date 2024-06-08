import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import './global.css'; // Import the CSS file here
import testImage from "./signin.png";
import Login from "./Login";
import { Route } from "@mui/icons-material";
import GoogleIcon from "./googleicon";
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
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'none',
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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme({
  typography: {
    fontFamily: 'Montserrat, Arial, sans-serif', // Set Montserrat as the default font family
  },
});

export default function SignUP() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${testImage})`, // Using template literals to embed the image URL
            backgroundRepeat: "no-repeat",
            backgroundColor: "#040F15", // Set the background color to #040F15
            backgroundSize: "contain", // Ensures the image is fully visible
            backgroundPosition: "center",
            backgroundSize: "60%",
            // backgroundBlendMode: 'overlay' // Blends the gradient and image
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
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 10 }}
              style={{ color: "white"  ,width: "55%"}}
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
                  style: { color: "white", borderColor: "white" },
                }}
                sx={{
                  borderRadius: "10px", // Set the border radius to 10px
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
                  style: { color: "white", borderColor: "white" },
                }}
                sx={{
                  borderRadius: "10px", // Set the border radius to 10px
                }}
              />

              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs={12} style={{ textAlign: "center" }}>
                  <Typography variant="body2" style={{ fontSize: "1.2rem" }}>
                    Already have an account? &nbsp; &nbsp;
                    
                    <Link to="{/Login}" style={{cursor:'pointer'}}>
                      Login <i className="fas fa-hacker-news"></i>
                    </Link>
                  </Typography>
                </Grid>
                <Grid item xs={12} style={{ textAlign: "center" }}>
                  <Typography variant="body2" style={{ fontSize: "1.2rem" }}>
                    Other Ways to Sign Up
                    <br></br>
                    <Button
                      type="submit"
                      fullWidth
                      variant="outlined"
                      sx={{ mt: 3, mb: 2 }}
                      startIcon={<GoogleIcon />}
                    >
                      Login Back with Google
                    </Button>
                  </Typography>
                </Grid>
              </Grid>

              <Copyright sx={{ mt: 5, color: "white" ,textDecoration: 'none',
        '&:hover': {
          textDecoration: 'none',
        },}} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
