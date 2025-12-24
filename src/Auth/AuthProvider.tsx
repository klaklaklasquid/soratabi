import { AuthProvider as OidcAuthProvider } from "react-oidc-context";
import { oidcConfig } from "./authConfig";

function AuthProvider({ children }: { children: React.ReactNode }) {
  return <OidcAuthProvider {...oidcConfig}>{children}</OidcAuthProvider>;
}

export default AuthProvider;
