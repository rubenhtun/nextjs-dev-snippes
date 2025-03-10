import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Layout from "@/app/components/Layout";
import { prisma } from "@/libs/prisma";
import { updateCourse } from "../action";

interface Props {
  params: {
    id: string;
  };
}

export default async function AddNewCourse({ params }: Props) {
  const { id } = params;
  const courseInfo = await prisma.courses.findUnique({
    where: { id: Number(id) },
  });

  if (!courseInfo) {
    return (
      <Layout>
        <Typography variant="h6" sx={{ textAlign: "center", mt: 5 }}>
          Course not found.
        </Typography>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box
        component="form"
        action={updateCourse}
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
        <input type="hidden" name="courseId" value={courseInfo.id} />

        <Typography
          variant="h5"
          sx={{ color: "#6a1b9a", mb: 3, textAlign: "center" }}
        >
          Update Course Info
        </Typography>

        {/* Course Title */}
        <TextField
          label="Course Title"
          name="courseTitle"
          defaultValue={courseInfo.name}
          variant="outlined"
          fullWidth
          sx={{ mb: 3 }}
        />

        {/* Course Description */}
        <TextField
          label="Course Description"
          name="courseDescription"
          defaultValue={courseInfo.description}
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
          defaultValue={courseInfo.price}
          variant="outlined"
          type="number"
          fullWidth
          sx={{ mb: 3 }}
        />

        {/* Is Published */}
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={courseInfo.isPublished ?? false}
              name="isPublished"
            />
          }
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
          Update Course
        </Button>
      </Box>
    </Layout>
  );
}
