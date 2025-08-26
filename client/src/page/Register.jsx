import React, { useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const Register = () => {
  const [register, setRegister] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = await AuthService.register(
        register.username,
        register.name,
        register.email,
        register.password
      );

      if (newUser.status === 200) {
        Swal.fire({
          title: "User Registration",
          text: newUser.data.message,
          icon: "success",
        }).then(() => {
          setRegister({
            username: "",
            password: "",
            name: "",
            email: "",
          });
          navigate("/");
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Registration Failed",
        text: error?.response?.data?.message || "Unable to register user",
        icon: "error",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-200 via-white to-gray-300">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* ชื่อร้าน */}
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
          👟 EyeSneakers
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Create your account to join us
        </p>

        {/* Register Form */}
        <form className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={register.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="w-full border rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={register.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full border rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={register.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full border rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={register.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full border rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          {/* ปุ่มกด */}
          <div className="flex justify-between mt-6">
            <button
              onClick={handleSubmit}
              type="submit"
              className="w-1/2 bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition-all mr-2"
            >
              Register
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-1/2 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-all ml-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
