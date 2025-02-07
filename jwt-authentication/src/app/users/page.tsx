"use client";

import {
  Home,
  User,
  Settings,
  Bell,
  Search,
  Calendar,
  MessageSquare,
  FilePlus,
  Bookmark,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Users() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/private");
        if (!response.ok) {
          router.push("/");
          return;
        }
        const data = await response.json();

        // Check if the message is valid.
        if (data.message === "valid") {
          // User is authenticated; stop loading.
          setLoading(false);
        } else {
          // If the message isn’t valid, redirect to login.
          router.push("/");
        }
      } catch (err) {
        console.log(err);
        // On error, redirect to login.
        router.push("/");
      }
    })();
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            {/* Logo and Search */}
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-blue-600">Dashboard</h1>
              <div className="ml-6 relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-blue-600 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100">
                <img
                  src="/api/placeholder/32/32"
                  alt="User avatar"
                  className="h-8 w-8 rounded-full"
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside className="fixed left-0 top-16 h-full w-64 bg-white shadow-sm">
        <div className="p-4">
          <nav className="space-y-1">
            <a
              href="#"
              className="flex items-center px-4 py-3 text-blue-600 bg-blue-50 rounded-lg"
            >
              <Home className="h-5 w-5 mr-3" />
              Home
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              <User className="h-5 w-5 mr-3" />
              Profile
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              <MessageSquare className="h-5 w-5 mr-3" />
              Messages
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              <Calendar className="h-5 w-5 mr-3" />
              Calendar
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 pt-16">
        <div className="max-w-7xl mx-auto p-6">
          {/* Welcome Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Welcome back, User!
            </h2>
            <p className="text-gray-600 mt-2">
              Here's what's happening with your projects today.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <button className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <FilePlus className="h-6 w-6 text-blue-600 mb-2" />
              <h3 className="font-semibold">New Project</h3>
              <p className="text-sm text-gray-600">Create a new project</p>
            </button>
            <button className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <MessageSquare className="h-6 w-6 text-green-600 mb-2" />
              <h3 className="font-semibold">Messages</h3>
              <p className="text-sm text-gray-600">View your messages</p>
            </button>
            <button className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <Bookmark className="h-6 w-6 text-purple-600 mb-2" />
              <h3 className="font-semibold">Saved Items</h3>
              <p className="text-sm text-gray-600">View saved items</p>
            </button>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex items-center p-4 hover:bg-gray-50 rounded-lg"
                >
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium">Activity {item}</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
