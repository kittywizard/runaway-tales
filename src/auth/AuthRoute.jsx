import { useAuth } from "./AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";

const AuthRoute = () => {
  const { user } = useAuth();
  const location = useLocation();

  return user ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate to={"/login"} replace state={{ path: location.pathname }} />
  );
};

export default AuthRoute;