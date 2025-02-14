"use client";

import React, { useState } from "react";
import {
  CheckCircle,
  XCircle,
  Book,
  BookOpen,
  QrCode,
  Users,
  Package,
  Activity,
} from "lucide-react";
import { useRouter } from "next/navigation";

export interface Book {
  title: string;
  author: string;
  isbn: string;
  category: string;
  quantity: number;
  status: string;
}

export default function AddBook() {
  const router = useRouter();
  const defaultData = {
    title: "",
    author: "",
    isbn: "",
    category: "",
    quantity: 0,
    status: "",
  };
  const [bookData, setBookData] = useState<Book>(defaultData);
  const [message, setMessge] = useState("");

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
      setMessge(data.message);
      setTimeout(() => {
        router.push("/books");
      }, 1000);

      // Reset default data after successful submission
      setBookData(defaultData);
    } catch (err) {
      console.error(err);
      setMessge("Failed to add book. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-teal-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Success/Failure Message */}
        {message && (
          <div
            className={`absolute top-5 right-5 p-4 rounded-full shadow-lg text-white ${
              message.includes("Failed") ? "bg-red-500" : "bg-teal-500"
            } animate-popup flex items-center`}
          >
            {/* Success Icon */}
            {!message.includes("Failed") && (
              <CheckCircle className="w-5 h-5 text-white mr-2" />
            )}

            {/* Error Icon */}
            {message.includes("Failed") && (
              <XCircle className="w-5 h-5 text-white mr-2" />
            )}

            {/* Message Text */}
            {message}
          </div>
        )}

        <div className="grid md:grid-cols-[1fr,2fr] gap-8 bg-white rounded-2xl shadow-xl overflow-hidden">
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
                <span className="text-xl font-semibold">Library System</span>
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
                      value={bookData.quantity === 0 ? "" : bookData.quantity}
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
  );
}
