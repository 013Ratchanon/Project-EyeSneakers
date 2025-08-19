import { Navigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";

const Adminpage = ({ children }) => {
  const { user } = useAuthContext();
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (user?.authorities.includes("ROLES_ADMIN")) {
    return children;
  }
  return <Navigate to="/notallowed" />;
};
export default Adminpage;
