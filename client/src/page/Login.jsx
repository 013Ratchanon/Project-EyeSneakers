import { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
const Login = () => {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const { login: loginFn, user } = useAuthContext();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((login) => ({ ...login, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const currentUser = await AuthService.login(
        login.username,
        login.password
      );
      if (currentUser.status === 200) {
        Swal.fire({
          title: "User Login",
          text: "Login successfully!",
          icon: "success",
        }).then(() => {
          loginFn(currentUser.data);
          navigate("/");
        });
      }
    } catch (error) {
      Swal.fire({
        title: "User Login",
        text: error?.response?.data?.message || "Login failed!",
        icon: "error",
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-100">
      <div className="w-full max-w-md p-8 bg-black rounded shadow">
        <h4 className="text-3xl text-center mb-6">Login</h4>

        <fieldset className="mb-4">
          <legend className="mb-2 font-medium">Username</legend>
          <input
            type="text"
            name="username"
            value={login.username}
            onChange={handleChange}
            placeholder="Username"
            className="input input-secondary w-full mb-4"
          />
          <legend className="mb-2 font-medium">Password</legend>
          <input
            type="password"
            name="password"
            value={login.password}
            onChange={handleChange}
            placeholder="Password"
            className="input input-primary w-full"
          />
        </fieldset>

        <div className="flex justify-between">
          <button
            onClick={handleSubmit}
            className="btn btn-outline btn-success"
            type="submit"
          >
            Login
          </button>
          <button className="btn btn-outline btn-error" type="button">
            Cancel
          </button>
        </div>
        <div className="text-center mt-4">
          <h5 className="mb-2">Don't have an account?</h5>
          <a
            href="/register"
            className="link link-success underline text-green-400"
          >
            Register here
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
