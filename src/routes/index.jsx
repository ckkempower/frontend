// library components
import { useSelector } from "react-redux";

// custom components
import PublicRoutes from "./publicRoutes";
import PrivateRoute from "./privateRoutes";

const AppRoutes = () => {
  const isLogin = useSelector((state) => state.user.value.token);
  return <>{isLogin ? <PrivateRoute /> : <PublicRoutes />}</>;
};

export default AppRoutes;
