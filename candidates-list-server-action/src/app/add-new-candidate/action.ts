"use server";

import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";

export async function addNewCandidate(formData: any) {
  const candidateName = formData.get("candidateName");
  const candidateGender = formData.get("candidateGender");
  const candidateEmail = formData.get("candidateEmail");
  await prisma.candidates.create({
    data: {
      name: candidateName,
      gender: candidateGender,
      email: candidateEmail,
    },
  });
  redirect("/");
}
