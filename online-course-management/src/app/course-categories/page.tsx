import { prisma } from "@/libs/prisma";
import Layout from "../components/Layout";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import Link from "next/link";
import { Delete } from "@mui/icons-material";
import { deleteCourseCategory } from "./action";

export default async function AvailableCourses() {
  const courseCategories = await prisma.courseCategories.findMany();

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
          Course Categories
        </Typography>
        <Link href="/course-categories/add-new-course-category" passHref>
          <Button
            variant="contained"
            sx={{ bgcolor: "#6a1b9a", "&:hover": { bgcolor: "#8e24aa" } }}
          >
            Add Course Category
          </Button>
        </Link>
      </Box>

      {/* Course Category Lists */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {courseCategories.map((courseCategory) => (
          <Grid item xs={12} sm={6} lg={4} key={courseCategory.id}>
            <Paper
              sx={{
                p: 2,
                borderRadius: 2,
                boxShadow: 3,
                bgcolor: "#f9f9f9",
                "&:hover": {
                  boxShadow: 6,
                  bgcolor: "#e3f2fd",
                  transition: "all 0.3s",
                },
                position: "relative",
              }}
            >
              {/* Delete Icon */}
              <Box component="form" action={deleteCourseCategory}>
                <input
                  type="hidden"
                  name="courseCategoryId"
                  value={courseCategory.id}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 8,
                    color: "#f1f1f1",
                  }}
                  type="submit"
                >
                  <Delete />
                </IconButton>
              </Box>

              <Link
                href={`course-categories/${courseCategory.id}`}
                style={{ textDecoration: "none" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "150px",
                    borderRadius: 2,
                    bgcolor: "#6a1b9a",
                    color: "#fff",
                    mb: 2,
                  }}
                >
                  <CategoryIcon sx={{ fontSize: 80 }} />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "#3f51b5",
                    textAlign: "center",
                  }}
                >
                  {courseCategory.name}
                </Typography>
              </Link>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}
