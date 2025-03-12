"use server";

import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";

// Adding new course
export async function addNewCourse(formData: FormData) {
  const courseTitle = formData.get("courseTitle") as string;
  const courseDescription = formData.get("couseDescription") as string;
  const courseCategoryIds = formData
    .getAll("courseCategory")
    .map((item) => Number(item));
  const price = formData.get("price");
  const isPublished = formData.get("isPublished") ? true : false;

  const courseInfo = {
    name: courseTitle,
    description: courseDescription,
    price: Number(price),
    isPublished: isPublished,
  };

  const course = await prisma.courses.create({ data: courseInfo });

  const categoryInfo = courseCategoryIds.map((courseCategoryId) => ({
    courseId: course.id,
    courseCategoryId,
  }));

  await prisma.courseCategoriesCourses.createMany({ data: categoryInfo });

  // After successful creation
  redirect("/available-courses");
}

// Update course
export async function updateCourse(formData: FormData) {
  const courseId = formData.get("courseId") as string;
  const courseTitle = formData.get("courseTitle") as string;
  const courseDescription = formData.get("courseDescription") as string;
  const courseCategoryIds = formData
    .getAll("courseCategory")
    .map((item) => Number(item));
  const price = formData.get("price");
  const isPublished = formData.get("isPublished") === "on";

  const courseInfo = {
    name: courseTitle,
    description: courseDescription,
    price: Number(price),
    isPublished: isPublished,
  };

  const updatedCourse = await prisma.courses.update({
    where: { id: Number(courseId) },
    data: courseInfo,
  });

  await prisma.courseCategoriesCourses.deleteMany({
    where: { courseId: updatedCourse.id },
  });

  const categoryInfo = courseCategoryIds.map((courseCategoryId) => ({
    courseId: updatedCourse.id,
    courseCategoryId: Number(courseCategoryId),
  }));

  await prisma.courseCategoriesCourses.createMany({ data: categoryInfo });

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
