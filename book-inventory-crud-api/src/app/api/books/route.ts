import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

// Get request method
export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const bookId = params.get("id");

  try {
    if (bookId) {
      // Fetch single book
      const book = await prisma.book.findFirst({
        where: { id: Number(bookId) },
      });

      if (!book) {
        return NextResponse.json(
          { message: "Book not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(book, { status: 200 });
    }

    // Fetch all books
    const booksList = await prisma.book.findMany();
    return NextResponse.json({ booksList }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Post request method
export async function POST(req: NextRequest) {
  try {
    const bookData = await req.json();
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

// Put request method
export async function PUT(req: NextRequest) {
  try {
    const book = await req.json();

    // Ensure the book has an ID
    if (!book.id) {
      return NextResponse.json(
        { message: "Book ID is required" },
        { status: 400 }
      );
    }

    // Update the book
    const updatedBook = await prisma.book.update({
      where: { id: Number(book.id) },
      data: { ...book },
    });

    return NextResponse.json(updatedBook, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to update book" },
      { status: 500 }
    );
  }
}

// Delete request method
export async function DELETE(req: NextRequest) {
  // This program will not use query params
  const bookId = await req.json();
  await prisma.book.delete({ where: { id: Number(bookId) } });
  return NextResponse.json(null, { status: 200 });
}
