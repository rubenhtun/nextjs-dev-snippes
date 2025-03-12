import React from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import Layout from "@/app/components/Layout";
import VerifiedIcon from "@mui/icons-material/Verified";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
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
    include: {
      categories: {
        include: {
          courseCategory: true,
        },
      },
    },
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
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 600,
          mx: "auto",
          borderRadius: 4,
          overflow: "hidden",
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: 8,
          },
        }}
      >
        {/* Header with gradient background */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #8e24aa 0%, #6a1b9a 100%)",
            p: 4,
            color: "white",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              mb: 1,
              textShadow: "0px 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            Course Information
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              mb: 2,
            }}
          >
            {courseInfo.name}
          </Typography>

          <Chip
            label={courseInfo.isPublished ? "Published" : "Not Published"}
            icon={
              courseInfo.isPublished ? <VerifiedIcon /> : <UnpublishedIcon />
            }
            color={courseInfo.isPublished ? "success" : "error"}
            sx={{
              fontWeight: "bold",
              px: 1,
              fontSize: "0.9rem",
            }}
          />
        </Box>

        {/* Content area */}
        <Box sx={{ p: 4, bgcolor: "#fff" }}>
          {/* Description with styled quote marks */}
          <Box
            sx={{
              position: "relative",
              mb: 4,
              p: 3,
              bgcolor: "#f8f5ff",
              borderRadius: 2,
              border: "1px solid #e1d5f5",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: -12,
                left: 10,
                fontSize: "2rem",
                color: "#8e24aa",
                fontFamily: "serif",
              }}
            >
              "
            </Box>
            <Typography
              variant="body1"
              sx={{
                color: "#424242",
                lineHeight: "1.8",
                fontSize: "1rem",
                fontStyle: "italic",
                textAlign: "center",
              }}
            >
              {courseInfo.description}
            </Typography>
            <Box
              sx={{
                position: "absolute",
                bottom: -20,
                right: 10,
                fontSize: "2rem",
                color: "#8e24aa",
                fontFamily: "serif",
              }}
            >
              "
            </Box>
          </Box>

          {/* Categories with styled list */}
          <Typography
            variant="h6"
            sx={{
              color: "#424242",
              mb: 2,
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <LocalOfferIcon color="primary" /> Categories
          </Typography>

          <Paper
            elevation={2}
            sx={{
              mb: 4,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <List sx={{ p: 0 }}>
              {courseInfo.categories.map((category, index) => (
                <React.Fragment key={category.id}>
                  <ListItem
                    sx={{
                      py: 2,
                      transition: "background-color 0.2s",
                      "&:hover": { bgcolor: "#f5f5f5" },
                    }}
                  >
                    <ListItemText
                      primary={category.courseCategory.name}
                      primaryTypographyProps={{
                        sx: {
                          fontWeight: "medium",
                          color: "#424242",
                        },
                      }}
                    />
                  </ListItem>
                  {index < courseInfo.categories.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>

          {/* Price with eye-catching styling */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 4,
            }}
          >
            <Chip
              label={`${courseInfo.price} Kyats`}
              color="primary"
              sx={{
                py: 3,
                px: 2,
                fontSize: "1.25rem",
                fontWeight: "bold",
                borderRadius: 4,
                boxShadow: 2,
                "& .MuiChip-label": {
                  px: 2,
                },
              }}
            />
          </Box>

          {/* Action button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Link href="/available-courses" passHref>
              <Button
                variant="contained"
                sx={{
                  background:
                    "linear-gradient(135deg, #8e24aa 0%, #6a1b9a 100%)",
                  color: "#fff",
                  py: 1.5,
                  px: 5,
                  borderRadius: 3,
                  fontWeight: "bold",
                  textTransform: "none",
                  fontSize: "1rem",
                  transition: "all 0.3s",
                  boxShadow: 3,
                  "&:hover": {
                    boxShadow: 6,
                    transform: "scale(1.05)",
                  },
                }}
              >
                Back to Courses
              </Button>
            </Link>
          </Box>
        </Box>
      </Paper>
    </Layout>
  );
}
