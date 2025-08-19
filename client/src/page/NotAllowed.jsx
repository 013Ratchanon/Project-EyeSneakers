import React from "react";

const NotAllowed = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-10 max-w-md w-full shadow-2xl text-center">
        {/* Icon */}
        <div className="text-6xl mb-4 text-red-500">🛑</div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-white mb-2">Access Denied</h1>

        {/* Description */}
        <p className="text-gray-300 mb-6">
          You do not have permission to view this page.
          <br />
          Please contact your administrator if you think this is a mistake.
        </p>

        {/* Action Button */}
        <a href="/" className="btn btn-outline btn-accent w-full">
          ⬅ Back to Home
        </a>
      </div>
    </div>
  );
};

export default NotAllowed;
