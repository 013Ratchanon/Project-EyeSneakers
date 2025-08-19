import React from "react";
import { useAuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user, logout } = useAuthContext();

  // หาก user ยังไม่โหลด (เช่น loading)
  if (!user || !user.userInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // ใช้ข้อมูลจาก context
  const UserProfile = {
    name: user.userInfo.name || "Unknown User",
    email: user.userInfo.email || "unknown@example.com",
    avatar:
      user.userInfo.avatar || "https://i.pravatar.cc/150?u=default-avatar",
    role:
      Array.isArray(user.authorities) && user.authorities.length > 0
        ? user.authorities.join(", ")
        : "Guest",
  };

  const handleLogOut = () => {
    logout(); // เรียก logout จาก context
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 w-full max-w-md shadow-2xl text-white">
        {/* Avatar */}
        <div className="flex flex-col items-center space-y-4">
          <img
            src={UserProfile.avatar}
            alt="User Avatar"
            className="w-28 h-28 rounded-full border-4 border-accent shadow-lg object-cover"
          />
          <h2 className="text-2xl font-bold">{UserProfile.name}</h2>
          <p className="text-sm text-gray-300">{UserProfile.email}</p>
          <span className="badge badge-accent badge-outline">
            {UserProfile.role}
          </span>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-3">
          <button className="btn btn-accent w-full">Edit Profile</button>
          <button
            className="btn btn-outline btn-error w-full"
            onClick={handleLogOut}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
