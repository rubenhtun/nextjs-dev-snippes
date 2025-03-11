import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Layout from "@/app/components/Layout";
import { prisma } from "@/libs/prisma";

import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

export default async function SeeCourseInfo({ params }: Props) {
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
          Course Info
        </Typography>

        <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
          {courseInfo.name}
        </Typography>

        <Typography variant="body1" sx={{ mb: 2, textAlign: "center" }}>
          {courseInfo.description}
        </Typography>

        <Typography variant="body1" sx={{ mb: 2, textAlign: "center" }}>
          Price: {courseInfo.price} Kyats
        </Typography>

        <Typography variant="body1" sx={{ mb: 2, textAlign: "center" }}>
          {courseInfo.isPublished ? "Published" : "Not Published"}
        </Typography>

        {/* Close Button */}
        <Link href={"/available-courses"}>
          <Button
            sx={{
              border: "1px solid #6a1b9a",
              "&:hover": { border: "1px solid #8e24aa" },
              py: 1,
            }}
          >
            Close
          </Button>
        </Link>
      </Box>
    </Layout>
  );
}
