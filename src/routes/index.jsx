// library components
import { Routes, Route } from "react-router-dom";

// custom components
import Layout from "../Layout";
import Add from "../pages/Add";
import Earn from "../pages/Earn";
import Plebeian from "../pages/Plebeian";
import Ranks from "../pages/Ranks";
import Spent from "../pages/Spent";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route path="earn" element={<Earn />} />
        <Route path="ranks" element={<Ranks />} />
        <Route path="spent" element={<Spent />} />
        <Route path="add" element={<Add />} />
        <Route index element={<Plebeian />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
