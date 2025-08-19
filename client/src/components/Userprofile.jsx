import React from "react";
import { useAuthContext } from "../context/AuthContext";

const Userprofile = () => {
  const { logout } = useAuthContext();
  const handleLogOut = () => {
    logout();
  };
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://i.pravatar.cc/150?u=default-avatar"
            />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          <li>
            <a href="/profile" className="justify-between">
              Profile
              <span className="badge">New</span>
            </a>
          </li>
          <li>
            <a>Settings</a>
          </li>
          <li>
            <a onClick={handleLogOut}>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Userprofile;
