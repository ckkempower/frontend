// Library components
import { Outlet } from "react-router-dom";

// Custom components
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
