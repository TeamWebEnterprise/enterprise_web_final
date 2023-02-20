import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Home } from "../Pages/Home/Home";
const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.user ? (
    <Home></Home>
  ) : (
    <Navigate to='/login' state={{ from: location }} replace></Navigate>
  );
};
export default RequireAuth;