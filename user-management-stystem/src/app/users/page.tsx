import { prisma } from "@/libs/prisma";
import { User, Mail, Phone, Calendar, Pencil, Trash2 } from "lucide-react";

export default async function Users() {
  const users = await prisma.user.findMany();

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Users List
      </h1>

      <div className="overflow-x-auto pb-6">
        <div className="flex gap-6 min-w-max">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-lg shadow-lg p-6 w-80 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Action Buttons */}
              <div className="flex justify-end gap-2 mb-4">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200">
                  <Pencil className="h-5 w-5" />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-col space-y-4">
                {/* Name Section */}
                <div className="border-b pb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-gray-500 mt-1">@{user.userName}</p>
                </div>

                {/* Contact Information */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Mail className="h-5 w-5 text-pink-500" />
                    <span className="text-sm truncate">{user.email}</span>
                  </div>

                  <div className="flex items-center space-x-3 text-gray-600">
                    <Phone className="h-5 w-5 text-pink-500" />
                    <span className="text-sm">{user.phone}</span>
                  </div>

                  <div className="flex items-center space-x-3 text-gray-600">
                    <Calendar className="h-5 w-5 text-pink-500" />
                    <span className="text-sm">
                      {new Date(user.dateOfBirth).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* View Profile Button */}
                <button className="mt-4 w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
