import { PropsWithChildren } from "react";
import useAuth from "./useAuth";
import Loading from "@/UI/Loading";
import { Navigate } from "react-router-dom";

function AuthProtectedRoute({ children }: PropsWithChildren) {
  const { isAuth, isLoading } = useAuth();

  if (isLoading) <Loading />;

  return isAuth ? children : <Navigate to={"/login"} />;
}

export default AuthProtectedRoute;
