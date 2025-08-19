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
  const handleSubmit = async () => {
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
    <div className="flex items-center justify-center h-screen bg-blue-100">
      <div className="w-full max-w-md p-8 bg-black rounded shadow">
        <h4 className="text-3xl text-center mb-6">Register</h4>

        <fieldset className="mb-4">
          <legend className="mb-2 font-medium">Username</legend>
          <input
            type="text"
            name="username"
            value={register.username}
            onChange={handleChange}
            placeholder="Username"
            className="input input-secondary w-full mb-4 border p-2 rounded text-white"
          />

          <legend className="mb-2 font-medium">Password</legend>
          <input
            type="password"
            name="password"
            value={register.password}
            onChange={handleChange}
            placeholder="Password"
            className="input input-primary w-full border p-2 rounded text-white"
          />

          <legend className="mb-2 font-medium">Name</legend>
          <input
            type="text"
            name="name"
            value={register.name}
            onChange={handleChange}
            placeholder="Name"
            className="input input-secondary w-full mb-4 border p-2 rounded text-white"
          />

          <legend className="mb-2 font-medium">Email</legend>
          <input
            type="email"
            name="email"
            value={register.email}
            onChange={handleChange}
            placeholder="Email"
            className="input input-primary w-full border p-2 rounded text-white"
          />
        </fieldset>

        <div className="flex justify-between">
          <button
            onClick={handleSubmit}
            className="btn btn-outline btn-success"
            type="submit"
          >
            Register
          </button>
          <button
            className="btn btn-outline btn-error"
            type="button"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
