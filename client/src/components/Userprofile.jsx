import React from "react";
import { useAuthContext } from "../context/AuthContext";

const UserProfile = () => {
  const { logout, user } = useAuthContext();

  const handleLogOut = () => {
    logout();
  };

  return (
    <div className="dropdown dropdown-end">
      {/* Avatar Button */}
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle p-0 bg-gray-800 hover:bg-gray-700 border-none"
      >
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-600">
          <img
            src={user?.avatar || "https://i.pravatar.cc/150?u=default-avatar"}
            alt="User Avatar"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Dropdown Menu */}
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-gray-900 text-white rounded-lg shadow-lg mt-3 w-56 p-2 z-20 transition-all duration-200"
      >
        <li>
          <a
            href="/profile"
            className="flex justify-between items-center px-3 py-2 rounded-md hover:bg-gray-700"
          >
            Profile
            <span className="badge badge-primary">New</span>
          </a>
        </li>
        <li>
          <a
            href="/settings"
            className="px-3 py-2 rounded-md hover:bg-gray-700"
          >
            Settings
          </a>
        </li>
        <li>
          <button
            onClick={handleLogOut}
            className="w-full text-left px-3 py-2 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserProfile;
