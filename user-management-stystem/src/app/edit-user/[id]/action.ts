"use server";

import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";

export default async function editUser(formData: any) {
  const userId = formData.get("userId") as String;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const userName = formData.get("username") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const dateOfBirth = formData.get("dateOfBirth") as string;

  await prisma.user.update({
    where: { id: Number(userId) },
    data: {
      firstName,
      lastName,
      userName,
      email,
      phone,
      dateOfBirth,
    },
  });

  redirect("/users");
}
