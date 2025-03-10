"use server";

import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";

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

  await prisma.courses.create({ data: courseInfo });

  // After successful creation
  redirect("/available-courses");
}

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
