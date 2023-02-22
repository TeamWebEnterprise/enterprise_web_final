import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return(
    auth?.refreshToken//.role?.find(role =>allowedRoles?.includes(role));
    ?<Outlet/>
    :<Navigate to='/login' state={{ from: location }} replace/>
  );
};
export default RequireAuth;
