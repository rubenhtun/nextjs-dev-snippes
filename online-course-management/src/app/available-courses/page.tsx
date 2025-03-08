import { prisma } from "@/libs/prisma";
import Layout from "../components/Layout";
import { Box, Button, Chip, Grid, Paper, Typography } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import Link from "next/link";

export default async function AvailableCourses() {
  const courses = await prisma.courses.findMany();
  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ color: "#6a1b9a" }}>
          Available Courses
        </Typography>
        <Link href="/available-courses/add-new-course" passHref>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#6a1b9a",
              "&:hover": { bgcolor: "#8e24aa" },
            }}
          >
            Add Course
          </Button>
        </Link>
      </Box>

      {/* Available Course Lists */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          marginTop: "20px",
          padding: 3,
        }}
      >
        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
              <Paper
                sx={{
                  padding: 2,
                  borderRadius: 2,
                  boxShadow: 3,
                  backgroundColor: "#f9f9f9",
                  "&:hover": {
                    boxShadow: 6,
                    backgroundColor: "#e3f2fd",
                    transition: "all 0.3s",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "150px",
                    borderRadius: 2,
                    backgroundColor: "#6a1b9a",
                    color: "#fff",
                    marginBottom: 2,
                  }}
                >
                  <SchoolIcon sx={{ fontSize: 80 }} />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "#3f51b5",
                    textAlign: "center",
                  }}
                >
                  {course.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    marginY: 1,
                    color: "text.secondary",
                    textAlign: "center",
                  }}
                >
                  {course.description}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ marginY: 1, color: "#6a1b9a", textAlign: "center" }}
                >
                  Price: ${course.price}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 2,
                  }}
                >
                  <Chip
                    label={course.isPublished ? "Published" : "Not Published"}
                    variant="outlined"
                    sx={{
                      fontWeight: "medium",
                      borderColor: course.isPublished ? "#4caf50" : "#f44336",
                      color: course.isPublished ? "#4caf50" : "#f44336",
                    }}
                  />
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
}
