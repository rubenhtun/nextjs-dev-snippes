"use client";

import { useEffect, useState } from "react";
import { Edit2, Trash2 } from "lucide-react";

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  category: string;
  quantity: number;
  status: string;
}

export default function Home() {
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
        return "text-green-600";
      case "Low Stock":
        return "text-yellow-600";
      case "Out of Stock":
        return "text-red-600";
      default:
        return "";
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Book Inventory</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Title</th>
              <th className="border px-4 py-2 text-left">Author</th>
              <th className="border px-4 py-2 text-left">ISBN</th>
              <th className="border px-4 py-2 text-left">Category</th>
              <th className="border px-4 py-2 text-left">Quantity</th>
              <th className="border px-4 py-2 text-left">Status</th>
              <th className="border px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{book.title}</td>
                <td className="border px-4 py-2">{book.author}</td>
                <td className="border px-4 py-2">{book.isbn}</td>
                <td className="border px-4 py-2">{book.category}</td>
                <td className="border px-4 py-2">{book.quantity}</td>
                <td
                  className={`border px-4 py-2 ${getStatusColor(book.status)}`}
                >
                  {book.status}
                </td>
                <td className="border px-4 py-2">
                  <div className="flex gap-2">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Trash2 className="h-4 w-4" />
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
