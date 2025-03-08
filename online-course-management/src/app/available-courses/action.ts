"use server";

import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";

export async function addNewCourse(formData: FormData) {
  const courseTitle = formData.get("courseTitle") as string;
  const courseDescription = formData.get("courseDescription") as string;
  const price = parseInt(formData.get("price") as string, 10);
  const isPublished = formData.get("isPublished") === "true";

  const courseInfo = {
    name: courseTitle,
    description: courseDescription,
    price: price || 0,
    isPublished: isPublished,
  };

  await prisma.courses.create({ data: courseInfo });

  // After successful creation
  redirect("/available-courses");
}
