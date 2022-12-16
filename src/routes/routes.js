import Add from "../pages/Add";
import Earn from "../pages/Earn";
import Login from "../pages/Login";
import Plebeian from "../pages/Plebeian";
import Ranks from "../pages/Ranks";
import Signup from "../pages/Signup";
import Spent from "../pages/Spent";

export const publicRoutes = [
  {
    path: "/",
    element: <Earn />,
  },
  {
    path: "*",
    element: <Earn />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "/signUp",
    element: <Signup />,
  },
];

export const privateRoutes = [
  {
    path: "/",
    element: <Earn />,
  },
  {
    path: "plebeian",
    element: <Plebeian />,
  },
  {
    path: "ranks",
    element: <Ranks />,
  },
  {
    path: "spent",
    element: <Spent />,
  },
  {
    path: "add",
    element: <Add />,
  },
];
