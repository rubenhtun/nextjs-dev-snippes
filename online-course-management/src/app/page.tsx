"use client";

import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  Grid,
  Chip,
  ThemeProvider,
  createTheme,
  Stack,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

// Create a custom theme with purple/teal color scheme
const theme = createTheme({
  palette: {
    primary: {
      main: "#6a1b9a", // Deep purple
    },
    secondary: {
      main: "#009688", // Teal
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
          padding: "12px 24px",
          fontWeight: 600,
          fontSize: "1rem",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

export default function Home() {
  const router = useRouter();

  const handleGo = () => {
    router.push("/online-course-management");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #6a1b9a 0%, #4a0072 50%, #38006b 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          pt: 4,
          pb: 4,
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={4}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} md={8}>
              <Box sx={{ textAlign: "center", mb: 6 }}>
                <Typography
                  variant="h1"
                  component="h1"
                  sx={{
                    fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
                    mb: 3,
                    fontWeight: 800,
                    lineHeight: 1.2,
                  }}
                >
                  Manage Your Courses{" "}
                  <Box
                    component="span"
                    sx={{
                      background:
                        "linear-gradient(90deg, #00bfa5 0%, #64ffda 100%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                      display: "inline",
                    }}
                  >
                    Online
                  </Box>{" "}
                  📚
                </Typography>

                <Typography
                  variant="h5"
                  sx={{
                    mb: 4,
                    fontWeight: 300,
                    maxWidth: "800px",
                    mx: "auto",
                    lineHeight: 1.6,
                  }}
                >
                  Efficiently manage and organize your online courses with our
                  easy-to-use platform. Track student progress, update content,
                  and create a seamless learning experience for everyone.
                </Typography>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  justifyContent="center"
                  sx={{ mb: 4 }}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      p: 2,
                      background: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(10px)",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <SchoolIcon sx={{ mr: 1, color: "#64ffda" }} />
                    <Typography>500+ Courses</Typography>
                  </Paper>

                  <Paper
                    elevation={3}
                    sx={{
                      p: 2,
                      background: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(10px)",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <PeopleIcon sx={{ mr: 1, color: "#64ffda" }} />
                    <Typography>50K+ Students</Typography>
                  </Paper>
                </Stack>

                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={handleGo}
                  startIcon={<RocketLaunchIcon />}
                  sx={{
                    py: 2,
                    px: 4,
                    fontSize: "1.2rem",
                    boxShadow: "0 8px 16px rgba(0, 150, 136, 0.3)",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 12px 20px rgba(0, 150, 136, 0.4)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Go To Course Management
                </Button>

                <Typography variant="body2" sx={{ mt: 3, opacity: 0.7 }}>
                  No credit card required • Free trial • Cancel anytime
                </Typography>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
              sx={{ display: { xs: "none", md: "block" } }}
            >
              <Paper
                elevation={6}
                sx={{
                  position: "relative",
                  height: "400px",
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "80%",
                    height: "80%",
                    background: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "12px",
                    display: "flex",
                    flexDirection: "column",
                    p: 2,
                  }}
                >
                  <Box
                    sx={{
                      height: "60%",
                      background: "rgba(255, 255, 255, 0.1)",
                      borderRadius: "8px",
                      mb: 2,
                    }}
                  />
                  <Box
                    sx={{
                      height: "10%",
                      width: "70%",
                      background: "rgba(255, 255, 255, 0.1)",
                      borderRadius: "4px",
                      mb: 1,
                    }}
                  />
                  <Box
                    sx={{
                      height: "10%",
                      width: "40%",
                      background: "rgba(255, 255, 255, 0.1)",
                      borderRadius: "4px",
                    }}
                  />

                  <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                    <Chip
                      size="small"
                      label="Programming"
                      sx={{ background: "rgba(0, 191, 165, 0.3)" }}
                    />
                    <Chip
                      size="small"
                      label="Design"
                      sx={{ background: "rgba(0, 191, 165, 0.3)" }}
                    />
                  </Stack>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>

        <Box
          sx={{
            position: "absolute",
            top: "10%",
            left: "5%",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(100,255,218,0.2) 0%, rgba(100,255,218,0) 70%)",
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "15%",
            right: "10%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(100,255,218,0.2) 0%, rgba(100,255,218,0) 70%)",
            zIndex: 0,
          }}
        />
      </Box>
    </ThemeProvider>
  );
}
