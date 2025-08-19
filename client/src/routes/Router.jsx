import { createBrowserRouter } from "react-router";
import AddSneaker from "../page/AddSneaker";
import Home from "../page/Home";
import Update from "../page/Update";
import Login from "../page/Login";
import Register from "../page/Register";
import Notallowed from "../page/NotAllowed";
import Adminpage from "../page/AdminPage";
import Userpage from "../page/UserPage";
import Profile from "../page/Profile";
import ModOrAdmin from "../page/ModAndAdminpage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/add",
    element: (
      <Adminpage>
        <AddSneaker />
      </Adminpage>
    ),
  },
  {
    path: "/update/:id",
    element: (
      <ModOrAdmin>
        <Update />
      </ModOrAdmin>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/notallowed",
    element: <Notallowed />,
  },
  {
    path: "/profile",
    element: (
      <Userpage>
        <Profile />
      </Userpage>
    ),
  },
]);
export default router;
