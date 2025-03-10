import { Box, TextField, Button, Typography } from "@mui/material";
import { addNewCourseCategory } from "../course-categories/action";

export default function AddNewCourseForm() {
  return (
    <Box
      component="form"
      action={addNewCourseCategory}
      sx={{
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
        Add New Course Category
      </Typography>

      <TextField
        label="Course Category"
        name="courseCategory"
        fullWidth
        sx={{ mb: 3 }}
      />

      <Button
        variant="contained"
        fullWidth
        sx={{ bgcolor: "#6a1b9a", "&:hover": { bgcolor: "#8e24aa" } }}
        type="submit"
      >
        Add Course Category
      </Button>
    </Box>
  );
}
