// Server Component
"use server";

import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";

export async function handleRegister(formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const userName = formData.get("username") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const dateOfBirth = formData.get("dateOfBirth") as string;

  // Store user in the database
  await prisma.user.create({
    data: {
      firstName,
      lastName,
      userName,
      email,
      phone,
      dateOfBirth,
    },
  });

  // Redirect after successful registration
  redirect("/users");
}
