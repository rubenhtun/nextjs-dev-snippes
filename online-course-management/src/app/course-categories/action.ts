"use server";

import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";

// Adding new course
export async function addNewCourseCategory(formData: FormData) {
  const courseCategory = formData.get("courseCategory") as string;
  await prisma.courseCategories.create({ data: { name: courseCategory } });

  // After successful creation
  redirect("/course-categories");
}

// Update course
export async function updateCourseCategory(formData: FormData) {
  const courseCategoryId = formData.get("courseCategoryId") as string;
  const courseCategory = formData.get("courseCategory") as string;

  await prisma.courseCategories.update({
    where: { id: Number(courseCategoryId) },
    data: { name: courseCategory },
  });

  // Redirect after successful update
  redirect("/course-categories");
}

// Delete course
export async function deleteCourseCategory(formData: FormData) {
  const courseCategoryId = formData.get("courseCategoryId") as string;

  await prisma.courseCategories.delete({
    where: { id: Number(courseCategoryId) },
  });

  // After deletion, refresh page again
  redirect("/course-categories");
}
