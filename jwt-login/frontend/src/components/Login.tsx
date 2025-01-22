import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface LoginData {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();

  // Initialize form data
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle every input change
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("All fields are required");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST", // HTTP method
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setError(""); // Clear any previous errors

        setSuccess("Login successful. Redirecting...");

        localStorage.setItem("token", data.token); // JWT token

        setTimeout(() => {
          setSuccess(data.message); // Successful login message
          // Redirect to another page
          navigate("/client-page");
        }, 3000);
      } else {
        setError(data.message);

        setTimeout(() => setError(""), 3000);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Login
          </h2>
        </div>
        <div className="px-6 py-4">
          <form onSubmit={handleLogin} className="space-y-4">
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
              <div className="flex justify-between items-center">
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="password"
                >
                  Password
                </label>
                <Link to="/" className="text-sm text-gray-600 hover:text-black">
                  Forgot password?
                </Link>
              </div>
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
              Login
            </button>

            <div className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/auth/register"
                className="text-amber-600 hover:underline"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
