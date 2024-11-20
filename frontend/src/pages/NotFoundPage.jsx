import React from "react";
import { LuAlertCircle, LuHome } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-12">
      <div className="text-center max-w-xl">
        {/* Icon and Status Code */}
        <div className="flex items-center justify-center mb-8">
          <LuAlertCircle className="w-16 h-16 text-purple-500 animate-pulse" />
        </div>
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>

        {/* Error Messages */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-300"
          >
            <LuHome className="w-4 h-4 mr-2" />
            Back to Home
          </button>
        </div>
      </div>

      {/* Optional Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
    </div>
  );
};

export default NotFoundPage;
