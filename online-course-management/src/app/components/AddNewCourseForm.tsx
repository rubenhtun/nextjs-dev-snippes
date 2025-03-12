import {
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { addNewCourse } from "../available-courses/action";
import { prisma } from "@/libs/prisma";

export default async function AddNewCourseForm() {
  const courseCategories = await prisma.courseCategories.findMany();

  return (
    <Box
      component={"form"}
      action={addNewCourse}
      sx={{
        width: "100%",
        maxWidth: 600,
        mx: "auto",
        p: 2,
        bgcolor: "#fff",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h5"
        sx={{ color: "#6a1b9a", mb: 2, textAlign: "center" }}
      >
        Add New Course
      </Typography>

      {/* Course Title */}
      <TextField
        label="Course Title"
        name="courseTitle"
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
      />

      {/* Course Description */}
      <TextField
        label="Course Description"
        name="couseDescription"
        variant="outlined"
        multiline
        rows={3}
        fullWidth
        sx={{ mb: 2 }}
      />

      {/* Price */}
      <TextField
        label="Price"
        name="price"
        variant="outlined"
        type="number"
        fullWidth
        sx={{ mb: 2 }}
      />

      {/* Course Categories List */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
        {courseCategories.map((courseCategory) => (
          <FormControlLabel
            key={courseCategory.id}
            control={
              <Checkbox name="courseCategory" value={courseCategory.id} />
            }
            label={courseCategory.name}
            sx={{ mb: 0 }}
          />
        ))}
      </Box>

      {/* Is Published */}
      <FormControlLabel
        control={<Checkbox defaultChecked name="isPublished" />}
        label="Is Published"
        sx={{ mb: 2 }}
      />

      {/* Submit Button */}
      <Button
        variant="contained"
        fullWidth
        sx={{
          bgcolor: "#6a1b9a",
          "&:hover": { bgcolor: "#8e24aa" },
          py: 1,
        }}
        type="submit"
      >
        Add Course
      </Button>
    </Box>
  );
}
