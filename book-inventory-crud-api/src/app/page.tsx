"use client";

import { useEffect, useState } from "react";
import {
  Book,
  Edit2,
  Trash2,
  PlusCircle,
  Search,
  CheckCircle,
  XCircle,
  BookOpen,
  QrCode,
  Users,
  Package,
  Activity,
} from "lucide-react";
import { useRouter } from "next/navigation";

export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  category: string;
  quantity: number;
  status: string;
}

export default function BookInventory() {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getBooks();
  }, []);

  // Get books from server
  const getBooks = async () => {
    try {
      const response = await fetch("api/books");
      const data = await response.json();
      setBooks(data.booksList);
    } catch (err) {
      console.log(err);
    }
  };

  // Delete books in server
  const handleDeleteBook = async (bookId: number) => {
    try {
      await fetch("/api/books", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookId),
      });
      getBooks();
    } catch (err) {
      console.log(err);
    }
  };

  // Differentiate different status colors
  const getStatusColor = (status: string) => {
    return (
      {
        "In Stock": "text-teal-600 font-semibold",
        "Low Stock": "text-amber-600 font-semibold",
        "Out of Stock": "text-rose-600 font-semibold",
      }[status] || "text-gray-600"
    );
  };

  // To search specific book
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  // **************** Adding Book **************** //
  const defaultData = {
    title: "",
    author: "",
    isbn: "",
    category: "",
    quantity: 0,
    status: "",
  };
  const [bookData, setBookData] = useState(defaultData);
  const [message, setMessage] = useState("");

  // Handle Value Change Function
  const handleValueChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBookData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  // Handle Submit Function
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        throw new Error("Internal server error");
      }

      const data = await response.json();
      // Reset default data after successful submission
      setBookData(defaultData);
      // Close the modal after submission
      setIsModalOpen(false);
      // Show success message
      setMessage(data.message);
      setTimeout(() => {
        setMessage("");
      }, 2000);
      // Kind of accessing all books again
      getBooks();
    } catch (err) {
      console.error(err);
      setMessage("Failed to add book. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-teal-700">Book Inventory</h1>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search books..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-300"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-700 transition"
            onClick={() => setIsModalOpen(true)} // Open modal when click
          >
            <PlusCircle className="h-5 w-5" /> Add Book
          </button>
        </div>
      </div>
      <div className="overflow-hidden bg-white shadow-md rounded-lg">
        <table className="min-w-full border-collapse text-gray-700">
          <thead className="bg-teal-100 text-teal-800">
            <tr>
              {[
                "Title",
                "Author",
                "ISBN",
                "Category",
                "Quantity",
                "Status",
                "Actions",
              ].map((heading) => (
                <th key={heading} className="border px-6 py-3 text-left">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y">
            {filteredBooks.map((book) => (
              <tr key={book.id} className="hover:bg-teal-50 transition">
                <td className="border px-6 py-4">{book.title}</td>
                <td className="border px-6 py-4">{book.author}</td>
                <td className="border px-6 py-4">{book.isbn}</td>
                <td className="border px-6 py-4">{book.category}</td>
                <td className="border px-6 py-4">{book.quantity}</td>
                <td
                  className={`border px-6 py-4 ${getStatusColor(book.status)}`}
                >
                  {book.status}
                </td>
                <td className="border px-6 py-4">
                  <div className="flex gap-3">
                    <button className="p-2 bg-teal-100 hover:bg-teal-200 rounded-lg transition">
                      <Edit2 className="h-5 w-5 text-teal-700" />
                    </button>
                    <button
                      className="p-2 bg-rose-100 hover:bg-rose-200 rounded-lg transition"
                      onClick={() => handleDeleteBook(book.id)}
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

      {/* Modal for adding book */}
      {isModalOpen && (
        <div
          className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50"
          // Close modal when clicking outside
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden"
            // Prevent modal from closing when clicking inside
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Content */}
            <div className="grid md:grid-cols-[1fr,2fr] gap-8">
              {/* Left Panel */}
              <div className="bg-teal-500 p-8 text-white flex flex-col justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-4">Add to Library</h1>
                  <p className="text-teal-200 mb-6">
                    Expand your collection with new books, manage inventory, and
                    keep your library organized.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-sm">
                      <BookOpen className="w-5 h-5" />
                      <span>Track your entire collection</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <QrCode className="w-5 h-5" />
                      <span>Automatic ISBN verification</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <Users className="w-5 h-5" />
                      <span>Reader recommendations</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-teal-400">
                  <div className="flex items-center space-x-2">
                    <Book className="w-6 h-6 text-teal-200" />
                    <span className="text-xl font-semibold">
                      Library System
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Panel - Form */}
              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Book Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                        placeholder="Enter book title"
                        value={bookData.title}
                        onChange={handleValueChange}
                      />
                    </div>

                    {/* Author */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Author
                      </label>
                      <input
                        type="text"
                        name="author"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                        placeholder="Author name"
                        value={bookData.author}
                        onChange={handleValueChange}
                      />
                    </div>

                    {/* ISBN */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ISBN
                      </label>
                      <input
                        type="text"
                        name="isbn"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                        placeholder="Enter ISBN"
                        value={bookData.isbn}
                        onChange={handleValueChange}
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <select
                        name="category"
                        required
                        value={bookData.category}
                        onChange={handleValueChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                      >
                        <option value="">Select category</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Non-Fiction">Non-Fiction</option>
                        <option value="Science">Science</option>
                        <option value="History">History</option>
                        <option value="Self-Help">Self-Help</option>
                      </select>
                    </div>

                    {/* Status with Icon */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <div className="relative">
                        <select
                          name="status"
                          required
                          value={bookData.status}
                          onChange={handleValueChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors appearance-none"
                        >
                          <option value="">Select status</option>
                          <option value="In Stock">In Stock</option>
                          <option value="Low Stock">Low Stock</option>
                          <option value="Out of Stock">Out of Stock</option>
                        </select>
                        <Activity className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      </div>
                    </div>

                    {/* Quantity with Icon */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          name="quantity"
                          min="0"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                          placeholder="Enter quantity"
                          value={
                            bookData.quantity === 0 ? "" : bookData.quantity
                          }
                          onChange={handleValueChange}
                        />
                        <Package className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-teal-500 text-white py-3 px-6 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400 transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <Book className="w-5 h-5" />
                      <span>Add to Library</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success/Failure Message */}
      {message && (
        <div
          className={`fixed top-5 -translate-x-1/2 left-1/2  p-3 rounded-full shadow-lg text-white ${
            message.includes("Failed") ? "bg-red-500" : "bg-teal-500"
          } animate-popup flex items-center`}
        >
          {!message.includes("Failed") && (
            <CheckCircle className="w-5 h-5 text-white mr-2" />
          )}
          {message.includes("Failed") && (
            <XCircle className="w-5 h-5 text-white mr-2" />
          )}
          {message}
        </div>
      )}
    </div>
  );
}
