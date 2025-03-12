"use server";

import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";

// Adding new course
export async function addNewCourse(formData: FormData) {
  const courseTitle = formData.get("courseTitle") as string;
  const courseDescription = formData.get("couseDescription") as string;
  const price = formData.get("price");
  const isPublished = formData.get("isPublished") ? true : false;

  const courseInfo = {
    name: courseTitle,
    description: courseDescription,
    price: Number(price),
    isPublished: isPublished,
  };

  const course = await prisma.courses.create({ data: courseInfo });

  const courseCategoryIds = formData
    .getAll("courseCategory")
    .map((item) => Number(item));

  const data = courseCategoryIds.map((courseCategoryId) => ({
    courseId: course.id,
    courseCategoryId,
  }));

  await prisma.courseCategoriesCourses.createMany({ data });

  // After successful creation
  redirect("/available-courses");
}

// Update course
export async function updateCourse(formData: FormData) {
  const courseId = formData.get("courseId") as string;
  const courseTitle = formData.get("courseTitle") as string;
  const courseDescription = formData.get("courseDescription") as string;
  const price = formData.get("price");
  const isPublished = formData.get("isPublished") === "on";

  const courseInfo = {
    name: courseTitle,
    description: courseDescription,
    price: Number(price),
    isPublished: isPublished,
  };

  await prisma.courses.update({
    where: { id: Number(courseId) },
    data: courseInfo,
  });

  // Redirect after successful update
  redirect("/available-courses");
}

// Delete course
export async function deleteCourse(formData: FormData) {
  const courseId = formData.get("courseId") as string;
  await prisma.courseCategoriesCourses.deleteMany({
    where: { courseId: Number(courseId) },
  });
  await prisma.courses.delete({ where: { id: Number(courseId) } });

  // After deletion, refresh page again
  redirect("/available-courses");
}
