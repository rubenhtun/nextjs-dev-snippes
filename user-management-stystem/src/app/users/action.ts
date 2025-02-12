"use server";

import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";

// Lead to edit user page
export async function toEditUserPage(formData: any) {
  const userId = formData.get("userId");

  // Redirect to the edit user page
  redirect(`/edit-user/${userId}`);
}

// Delete user in the database
export async function deleteUser(formData: any) {
  const userId = formData.get("userId");
  await prisma.user.delete({ where: { id: Number(userId) } });

  // Kind of refreshing the users page
  redirect("/users");
}
