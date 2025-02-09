"use server";

import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";

// To create a new candidate list
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

// To delete any candidate we want
export async function deleteCandidate(formData: any) {
  const candidateId = formData.get("candidateId");
  await prisma.candidates.delete({ where: { id: Number(candidateId) } });
  redirect("/"); // A way to refresh web page
}
