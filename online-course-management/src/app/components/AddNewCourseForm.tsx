import {
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { addNewCourse } from "../available-courses/action";

export default function AddNewCourseForm() {
  return (
    <Box
      component={"form"}
      action={addNewCourse}
      sx={{
        width: "100%",
        maxWidth: 600,
        mx: "auto",
        p: 3,
        bgcolor: "#fff",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h5"
        sx={{ color: "#6a1b9a", mb: 3, textAlign: "center" }}
      >
        Add New Course
      </Typography>

      {/* Course Title */}
      <TextField
        label="Course Title"
        name="courseTitle"
        variant="outlined"
        fullWidth
        sx={{ mb: 3 }}
      />

      {/* Course Description */}
      <TextField
        label="Course Description"
        name="couseDescription"
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        sx={{ mb: 3 }}
      />

      {/* Price */}
      <TextField
        label="Price"
        name="price"
        variant="outlined"
        type="number"
        fullWidth
        sx={{ mb: 3 }}
      />

      {/* Is Published */}
      <FormControlLabel
        control={<Checkbox defaultChecked name="isPublished" />}
        label="Is Published"
        sx={{ mb: 3 }}
      />

      {/* Submit Button */}
      <Button
        variant="contained"
        fullWidth
        sx={{
          bgcolor: "#6a1b9a",
          "&:hover": { bgcolor: "#8e24aa" },
          py: 1.5,
        }}
        type="submit"
      >
        Add Course
      </Button>
    </Box>
  );
}
