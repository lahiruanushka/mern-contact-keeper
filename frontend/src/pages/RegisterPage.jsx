import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LuUser,
  LuMail,
  LuLock,
  LuAlertTriangle,
  LuEye,
  LuEyeOff,
} from "react-icons/lu";
import { AuthContext } from "../context/AuthContext";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data);
        navigate("/dashboard");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded mb-4 flex items-center">
            <LuAlertTriangle className="w-5 h-5 mr-2" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative group">
            <LuUser className="absolute left-3 top-3 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div className="relative group">
            <LuMail className="absolute left-3 top-3 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div className="relative group">
            <LuLock className="absolute left-3 top-3 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full pl-10 pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? (
                <LuEyeOff className="w-5 h-5" />
              ) : (
                <LuEye className="w-5 h-5" />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors font-medium flex items-center justify-center space-x-2"
          >
            <span>Create Account</span>
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">Already have an account?</p>
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:text-blue-700 font-medium mt-1 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-2 py-1"
          >
            Login here
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
