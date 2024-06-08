import React from "react";
import {
  TextField,
  Grid,
  Typography,
  Box,
  CssBaseline,
  Container,
  Paper,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";
import testImage from "./otp.png"; // Adjust the import path as necessary

const defaultTheme = createTheme({
  typography: {
    fontFamily: "Montserrat, Arial, sans-serif", // Set Montserrat as the default font family
  },
});
function otpresend() {
  console.log("resent");
}
const OTP = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${testImage})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: "#040F15",
            backgroundSize: "60%",

            backgroundPosition: "center",
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
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#040F15",
            padding: 3,
          }}
        >
          <Container component="main" maxWidth="xs">
            <Box sx={{ mb: 2, textAlign: "center" }}>
              <Typography
                component="h2"
                variant="h2"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                One more step to finish...
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography
                component="h1"
                variant="h5"
                sx={{ color: "white", textAlign: "center" }}
              >
                Identify yourself
              </Typography>
            </Box>
            <Box
              component="form"
              className="digit-group"
              data-group-name="digits"
              data-autosubmit="false"
              autoComplete="off"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Grid container spacing={1} justifyContent="center">
                <Grid item>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    id="digit-1"
                    name="digit-1"
                    inputProps={{
                      maxLength: 1,
                      style: { textAlign: "center", color: "white" },
                    }}
                    sx={{
                      backgroundColor: "#040F15",
                      width: ["30px", "40px", "50px"],
                      height: ["30px", "40px", "50px"],
                      margin: "0 2px",
                    }}
                    InputProps={{
                      style: {
                        backgroundColor: "#18182a",
                        borderRadius: "4px",
                      },
                    }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    id="digit-2"
                    name="digit-2"
                    inputProps={{
                      maxLength: 1,
                      style: { textAlign: "center", color: "white" },
                    }}
                    sx={{
                      backgroundColor: "#18182a",
                      width: ["30px", "40px", "50px"],
                      height: ["30px", "40px", "50px"],
                      margin: "0 2px",
                    }}
                    InputProps={{
                      style: {
                        backgroundColor: "#18182a",
                        borderRadius: "4px",
                      },
                    }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    id="digit-3"
                    name="digit-3"
                    inputProps={{
                      maxLength: 1,
                      style: { textAlign: "center", color: "white" },
                    }}
                    sx={{
                      backgroundColor: "#18182a",
                      width: ["30px", "40px", "50px"],
                      height: ["30px", "40px", "50px"],
                      margin: "0 2px",
                    }}
                    InputProps={{
                      style: {
                        backgroundColor: "#18182a",
                        borderRadius: "4px",
                      },
                    }}
                  />
                </Grid>
                <Grid item>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "white",
                      lineHeight: "50px",
                      padding: "0 5px",
                    }}
                  >
                    &ndash;
                  </Typography>
                </Grid>
                <Grid item>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    id="digit-4"
                    name="digit-4"
                    inputProps={{
                      maxLength: 1,
                      style: { textAlign: "center", color: "white" },
                    }}
                    sx={{
                      backgroundColor: "#18182a",
                      width: ["30px", "40px", "50px"],
                      height: ["30px", "40px", "50px"],
                      margin: "0 2px",
                    }}
                    InputProps={{
                      style: {
                        backgroundColor: "#18182a",
                        borderRadius: "4px",
                      },
                    }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    id="digit-5"
                    name="digit-5"
                    inputProps={{
                      maxLength: 1,
                      style: { textAlign: "center", color: "white" },
                    }}
                    sx={{
                      backgroundColor: "#18182a",
                      width: ["30px", "40px", "50px"],
                      height: ["30px", "40px", "50px"],
                      margin: "0 2px",
                    }}
                    InputProps={{
                      style: {
                        backgroundColor: "#18182a",
                        borderRadius: "4px",
                      },
                    }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    id="digit-6"
                    name="digit-6"
                    inputProps={{
                      maxLength: 1,
                      style: { textAlign: "center", color: "white" },
                    }}
                    sx={{
                      backgroundColor: "#18182a",
                      width: ["30px", "40px", "50px"],
                      height: ["30px", "40px", "50px"],
                      margin: "0 2px",
                    }}
                    InputProps={{
                      style: {
                        backgroundColor: "#18182a",
                        borderRadius: "4px",
                      },
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                // onClick={}
                sx={{
                  mt: 8,
                  backgroundColor: "#4caf50",
                  color: "white",
                  fontSize: "20px",
                  display: "flex",
                  fontFamily: "montesserat",
                  alignItems: "center",
                }}
                startIcon={<CheckIcon />}
              >
                Verify
              </Button>
              <Box sx={{ mt: 3 }}>
                <Typography
                  onClick={otpresend}
                  component="h3"
                  variant="h6"
                  sx={{
                    color: "white",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  Resend OTP
                </Typography>
              </Box>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default OTP;
