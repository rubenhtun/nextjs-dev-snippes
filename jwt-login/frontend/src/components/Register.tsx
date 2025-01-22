import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const navigate = useNavigate();

  // Initialize form data
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle every input change
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const { username, email, password, confirmPassword } = formData;

    // Make sure for all inputs to be filled
    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      setTimeout(() => setError(""), 3000);
      return;
    }

    // Passwords must match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setTimeout(() => setError(""), 3000);
      return;
    }

    // Password must be at least 8 characters
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/auth/register", {
        method: "POST", // HTTP method
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }), // No need for confirmPassword
      });

      const data = await response.json();

      if (response.ok) {
        setError(""); // Clear any previous errors

        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        setSuccess(data.message); // Successful registration message

        setTimeout(() => {
          setSuccess("");
          navigate("/auth/login");
        }, 3000);
      } else {
        setError(data.message); // Failed registration message

        setTimeout(() => {
          setError("");
        }, 3000);
      }
    } catch (err) {
      console.log(err);
      setError("An error occurred. Please try again later.");
      setTimeout(() => setError(""), 3000);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Create Account
          </h2>
        </div>
        <div className="px-6 py-4">
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <label
                className="text-sm font-medium text-gray-700"
                htmlFor="username"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleValueChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="Enter your username"
              />
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleValueChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-medium text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleValueChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>

            <div className="space-y-2">
              <label
                className="text-sm font-medium text-gray-700"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleValueChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="Confirm your password"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {success && (
              <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <p className="text-green-700">{success}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2 px-4 bg-black hover:bg-gray-800 text-white font-semibold rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            >
              Register
            </button>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/auth/login"
                  className="text-amber-600 hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
