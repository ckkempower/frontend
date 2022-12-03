// Library components
import { Outlet } from "react-router-dom";

// Custom components
import Footer from "../components/Footer";
import Header from "../components/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
