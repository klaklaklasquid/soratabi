import useAuth from "./useAuth";
import Loading from "@/UI/Loading";
import { Navigate } from "react-router-dom";

function AuthProtectedRoute({ children, role }: AuthProtectedRouteProps) {
  const { isAuth, isLoading, user } = useAuth();

  if (isLoading) return <Loading />;

  if (!isAuth) {
    return <Navigate to={"/login"} />;
  }

  if (role && user.role !== role) {
    return <Navigate to={"/"} />;
  }

  return children;
}

interface AuthProtectedRouteProps {
  children: React.ReactNode;
  role?: "admin";
}

export default AuthProtectedRoute;
