import useAuth from "./useAuth";
import Loading from "@/UI/Loading";
import { Navigate } from "react-router-dom";

function AuthProtectedRoute({ children, role }: AuthProtectedRouteProps) {
  const { isAuth, isLoading, user } = useAuth();

  if (isLoading) <Loading />;

  if (user.role !== role) {
    return <Navigate to={"/"} />;
  }

  return isAuth ? children : <Navigate to={"/login"} />;
}

interface AuthProtectedRouteProps {
  children: React.ReactNode;
  role?: "admin";
}

export default AuthProtectedRoute;
