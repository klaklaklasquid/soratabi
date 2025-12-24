import { useAuth as useOidcAuth } from "react-oidc-context";

const useAuth = () => {
  return useOidcAuth();
};

export default useAuth;
