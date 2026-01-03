import useAuth from "./useAuth";
import Loading from "@/UI/Loading";
import { Navigate } from "react-router-dom";

function AuthProtectedRoute({ children, role }: AuthProtectedRouteProps) {
  const auth = useAuth();

  if (auth.isLoading) return <Loading />;

  if (!auth.isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  console.log(auth.user?.profile?.role);

  // Check role if specified (role would be in user claims)
  if (role && auth.user?.profile?.role !== role) {
    return <Navigate to={"/"} />;
  }

  return children;
}

interface AuthProtectedRouteProps {
  children: React.ReactNode;
  role?: "Admin";
}

export default AuthProtectedRoute;
