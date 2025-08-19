import api from "./api";
import TokenService from "./token.service";

const API_URL = import.meta.env.VITE_AUTH_API;

const register = async (username, name, email, password) => {
  return await api.post(`${API_URL}/signup`, {
    username,
    password,
    name,
    email,
  });
};

const login = async (username, password) => {
  const response = await api.post(`${API_URL}/signin`, { username, password });
  //ถ้าไม่มีข้อมูล ก็จะไม่save ลง local storage
  if (!response.data.token) {
    return response;
  }
  TokenService.setUser(response.data);
  return response;
};

const logout = () => {
  TokenService.removeUser();
};

const AuthService = {
  register,
  login,
  logout,
};
export default AuthService;
