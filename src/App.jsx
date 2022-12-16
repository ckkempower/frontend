// routes
import AppRoutes from "./routes";

// Library components
import { ToastContainer } from "react-toastify";

// styles
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <div className="main_page">
      <AppRoutes />
      <ToastContainer theme="light" position="bottom-right" />
    </div>
  );
}

export default App;
