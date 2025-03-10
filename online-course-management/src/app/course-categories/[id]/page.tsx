import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import Layout from "@/app/components/Layout";
import { prisma } from "@/libs/prisma";
import { updateCourseCategory } from "../action";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

export default async function UpdateCourseCategory({ params }: Props) {
  const { id } = params;
  const courseCategory = await prisma.courseCategories.findUnique({
    where: { id: Number(id) },
  });

  if (!courseCategory) {
    return (
      <Layout>
        <Typography variant="h6" sx={{ textAlign: "center", mt: 5 }}>
          Course Category not found.
        </Typography>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box
        component="form"
        action={updateCourseCategory}
        sx={{
          maxWidth: 600,
          mx: "auto",
          p: 3,
          bgcolor: "#fff",
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <input
          type="hidden"
          name="courseCategoryId"
          value={courseCategory.id}
        />

        <Typography
          variant="h5"
          sx={{ color: "#6a1b9a", mb: 3, textAlign: "center" }}
        >
          Update Course Info
        </Typography>

        <TextField
          label="Course Category"
          name="courseCategory"
          defaultValue={courseCategory.name}
          variant="outlined"
          fullWidth
          sx={{ mb: 3 }}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Link href="/course-categories">
            <Button
              sx={{
                border: "1px solid #6a1b9a",
                "&:hover": { borderColor: "#8e24aa" },
              }}
            >
              Cancel
            </Button>
          </Link>

          <Button
            variant="contained"
            sx={{ bgcolor: "#6a1b9a", "&:hover": { bgcolor: "#8e24aa" } }}
            type="submit"
          >
            Update Course Category
          </Button>
        </Box>
      </Box>
    </Layout>
  );
}
