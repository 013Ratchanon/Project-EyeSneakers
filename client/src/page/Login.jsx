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
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((login) => ({ ...login, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-200 via-white to-gray-300">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* ชื่อร้าน */}
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
          👟 EyeSneakers
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Welcome back, please login
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={login.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={login.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="w-1/2 bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition-all mr-2"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-1/2 bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition-all ml-2"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Register link */}
        <div className="text-center mt-6">
          <p className="text-gray-600 mb-2">Don't have an account?</p>
          <a
            href="/register"
            className="text-gray-800 font-semibold hover:underline"
          >
            Register here
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
