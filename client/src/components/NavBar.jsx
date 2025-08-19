import React from "react";
import { useAuthContext } from "../context/AuthContext";
import Userprofile from "./Userprofile";
const NavBar = () => {
  const { user } = useAuthContext();
  const hasAdminAccess =
    user?.roles?.includes("ROLES_ADMIN") ||
    user?.roles?.includes("ROLES_MODERATOR");
  const menuItem = [
     {
      name: "Add restaurant",
      url: "/add",
    },
    {
      name: "search",
      url: "/",
    },
    {
      name: "About Us",
      url: "/",
    },
  ];
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {menuItem.map((item, i) => {
              return (
                <li key={i}>
                  <a href={item.url}>{item.name}</a>
                </li>
              );
            })}
          </ul>
        </div>
        <a href="/" className="btn btn-ghost text-xl ">
          Grab_Restaurant
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {menuItem.map((item, i) => {
            return (
              <li key={i}>
                <a href={item.url}>{item.name}</a>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="navbar-end space-x-2">
        {user ? (
          <div>
            <Userprofile />
          </div>
        ) : (
          <div>
            <a href="/Register" className="btn btn-outline btn-primary">
              Register
            </a>
            <a href="/Login" className="btn btn-outline btn-success">
              Login
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
