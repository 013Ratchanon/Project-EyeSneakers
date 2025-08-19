import React from "react";
import { useAuthContext } from "../context/AuthContext";
import Userprofile from "./Userprofile";
const NavBar = () => {
  const { user } = useAuthContext();
  const hasAdminAccess =
    user?.roles?.includes("ROLES_ADMIN") ||
    user?.roles?.includes("ROLES_MODERATOR");
  const menuItem = [
    { name: "Add restaurant", url: "/add" },
    { name: "Search", url: "/" },
    { name: "About Us", url: "/" },
  ];
  return (
    <div className="navbar bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white shadow-md">
      {" "}
      <div className="navbar-start">
        {" "}
        <div className="dropdown">
          {" "}
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            {" "}
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
            </svg>{" "}
          </div>{" "}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-gray-800 rounded-box z-10 mt-3 w-52 p-2 shadow-lg text-white"
          >
            {" "}
            {menuItem.map((item, i) => (
              <li key={i}>
                {" "}
                <a href={item.url}>{item.name}</a>{" "}
              </li>
            ))}{" "}
          </ul>{" "}
        </div>{" "}
        <a href="/" className="btn btn-ghost normal-case text-xl text-white">
          {" "}
          <h2 className="text-3xl font-extrabold text-center text-white mb-2">
            {" "}
            👟 EyeSneakers{" "}
          </h2>{" "}
        </a>{" "}
      </div>{" "}
      <div className="navbar-center hidden lg:flex">
        {" "}
        <ul className="menu menu-horizontal px-1">
          {" "}
          {menuItem.map((item, i) => (
            <li key={i}>
              {" "}
              <a href={item.url} className="hover:text-green-400">
                {" "}
                {item.name}{" "}
              </a>{" "}
            </li>
          ))}{" "}
        </ul>{" "}
      </div>{" "}
      <div className="navbar-end space-x-2">
        {" "}
        {user ? (
          <Userprofile />
        ) : (
          <div className="flex space-x-2">
            {" "}
            <a
              href="/Register"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-md hover:scale-105 transition-transform duration-200"
            >
              {" "}
              Register{" "}
            </a>{" "}
            <a
              href="/Login"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-gray-700 to-gray-900 text-white font-semibold shadow-md hover:scale-105 transition-transform duration-200"
            >
              {" "}
              Login{" "}
            </a>{" "}
          </div>
        )}{" "}
      </div>{" "}
    </div>
  );
};
export default NavBar;
