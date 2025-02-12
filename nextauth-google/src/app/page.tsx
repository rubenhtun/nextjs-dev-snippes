"use client";

import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="bg-white text-gray-900 p-8 rounded-xl shadow-lg max-w-sm w-full text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome Back</h1>
        <p className="text-gray-600 mb-6">Sign in to continue</p>
        <button
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-md transition-all duration-300"
          onClick={() => signIn("google", { callbackUrl: "/blogs" })}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
