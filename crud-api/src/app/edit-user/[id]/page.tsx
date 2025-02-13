import { prisma } from "@/libs/prisma";
import { User, Mail, Phone, Calendar, AtSign } from "lucide-react";
import editUser from "./action";

interface Props {
  params: {
    id: string;
  };
}

export default async function EditUser({ params }: Props) {
  const { id } = params;
  // Find the unique user by id
  const user = await prisma.user.findUnique({ where: { id: Number(id) } });

  // Check if the user exits in the database
  if (!user) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-lg text-gray-600">User not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        {/* Header Section */}
        <div className="flex items-center space-x-4 mb-8 border-b pb-6">
          <div className="h-16 w-16 rounded-full bg-pink-100 flex items-center justify-center">
            <User className="h-8 w-8 text-pink-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-gray-500">@{user.userName}</p>
          </div>
        </div>

        {/* Form Section */}
        <form action={editUser} className="space-y-6">
          <input type="hidden" name="userId" value={user.id} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div className="space-y-2">
              <label
                htmlFor="firstName"
                className="text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <div className="relative">
                <input
                  name="firstName"
                  type="text"
                  defaultValue={user.firstName}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  required
                />
                <User className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <label
                htmlFor="lastName"
                className="text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <div className="relative">
                <input
                  name="lastName"
                  type="text"
                  defaultValue={user.lastName}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  required
                />
                <User className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Username */}
            <div className="space-y-2">
              <label
                htmlFor="userName"
                className="text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="relative">
                <input
                  name="username"
                  type="text"
                  defaultValue={user.userName}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  required
                />
                <AtSign className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="relative">
                <input
                  name="email"
                  type="email"
                  defaultValue={user.email}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  required
                />
                <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <div className="relative">
                <input
                  name="phone"
                  type="tel"
                  defaultValue={user.phone}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  required
                />
                <Phone className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <label
                htmlFor="dateOfBirth"
                className="text-sm font-medium text-gray-700"
              >
                Date of Birth
              </label>
              <div className="relative">
                <input
                  name="dateOfBirth"
                  type="date"
                  defaultValue={
                    new Date(user.dateOfBirth).toISOString().split("T")[0]
                  }
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  required
                />
                <Calendar className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6">
            <button
              type="submit"
              className="px-6 py-2.5 bg-pink-600 text-white rounded-lg hover:bg-pink-700 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all duration-200"
            >
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
