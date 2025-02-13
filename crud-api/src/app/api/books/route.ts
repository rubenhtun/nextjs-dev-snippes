import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

// Get request method
export async function GET(req: NextRequest) {
  const booksList = await prisma.book.findMany();
  return NextResponse.json({ booksList }, { status: 200 });
}

// Post request method
export async function POST(req: NextRequest) {
  try {
    const bookData = await req.json();
    console.log(bookData);
    await prisma.book.create({ data: bookData });
    return NextResponse.json(
      { message: "Book added successfully!" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "Failed to add book. Please try again.",
      },
      { status: 500 }
    );
  }
}
