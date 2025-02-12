"use client";

import { signOut } from "next-auth/react";

const blogPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    excerpt: "Learn the basics of Next.js and build your first application",
    author: "John Doe",
    date: "2025-02-13",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Understanding Server Components",
    excerpt: "Deep dive into React Server Components and their benefits",
    author: "Jane Smith",
    date: "2025-02-12",
    readTime: "8 min read",
  },
  {
    id: 3,
    title: "Authentication in Modern Web Apps",
    excerpt: "Implement secure authentication using NextAuth.js",
    author: "Mike Johnson",
    date: "2025-02-11",
    readTime: "6 min read",
  },
];

export default function Blogs() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Blog Posts</h1>
        <button
          className="px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 rounded-md transition-colors duration-200 ease-in-out flex items-center gap-2"
          onClick={() => signOut()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
          Sign out
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            className="border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white"
          >
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <div className="text-sm text-gray-600 mb-3">
              By {post.author} • {post.readTime}
            </div>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {new Date(post.date).toLocaleDateString()}
              </span>
              <button className="text-blue-500 hover:text-blue-600 font-medium">
                Read More →
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
