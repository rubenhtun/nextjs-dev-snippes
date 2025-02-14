"use client";

import { useEffect, useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import { Book } from "@prisma/client";

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    try {
      const response = await fetch("api/books");
      const data = await response.json();
      setBooks(data.booksList);
    } catch (err) {
      console.log(err);
    }
  };

  // Status Color Function
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "text-teal-600 font-semibold"; // Updated to match AddBook colors
      case "Low Stock":
        return "text-amber-600 font-semibold";
      case "Out of Stock":
        return "text-rose-600 font-semibold";
      default:
        return "text-gray-600";
    }
  };

  const hanldeDeleteBook = async (bookId: number) => {
    try {
      // This program will not use query params
      await fetch("/api/books", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookId),
      });
      getBooks();
    } catch (err) {
      console.log(err);
    }
  };

  if (!books) return null;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-teal-700 mb-6">Book Inventory</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border-collapse">
          <thead className="bg-teal-100 text-teal-800">
            <tr>
              <th className="border px-4 py-3 text-left">Title</th>
              <th className="border px-4 py-3 text-left">Author</th>
              <th className="border px-4 py-3 text-left">ISBN</th>
              <th className="border px-4 py-3 text-left">Category</th>
              <th className="border px-4 py-3 text-left">Quantity</th>
              <th className="border px-4 py-3 text-left">Status</th>
              <th className="border px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {books.map((book) => (
              <tr key={book.id} className="hover:bg-teal-50 transition">
                <td className="border px-4 py-3">{book.title}</td>
                <td className="border px-4 py-3">{book.author}</td>
                <td className="border px-4 py-3">{book.isbn}</td>
                <td className="border px-4 py-3">{book.category}</td>
                <td className="border px-4 py-3">{book.quantity}</td>
                <td
                  className={`border px-4 py-3 ${getStatusColor(book.status)}`}
                >
                  {book.status}
                </td>
                <td className="border px-4 py-3">
                  <div className="flex gap-2">
                    <button className="p-2 bg-teal-100 hover:bg-teal-200 rounded-lg transition">
                      <Edit2 className="h-5 w-5 text-teal-700" />
                    </button>
                    <button
                      className="p-2 bg-rose-100 hover:bg-rose-200 rounded-lg transition"
                      onClick={() => {
                        hanldeDeleteBook(book.id);
                      }}
                    >
                      <Trash2 className="h-5 w-5 text-rose-700" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
