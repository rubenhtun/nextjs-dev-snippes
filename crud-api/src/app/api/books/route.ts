import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // const books = await prisma.book.findMany();
  const booksList = [
    {
      id: 1,
      title: "Atomic Habits",
      author: "James Clear",
      isbn: "978-3-16-148410-0",
      category: "Personal Development",
      quantity: 100,
      status: "In Stock",
    },
  ];
  return NextResponse.json({ booksList }, { status: 200 });
}
