import { useState } from "react";
import { AuthContext } from "./AuthContext";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuth] = useState<boolean>(true);
  const [isLoading] = useState<boolean>(false);
  const [user] = useState<UserInterface>({
    id: 1,
    role: "admin",
    firstname: "John",
    lastname: "Doe",
    userPhoto:
      "https://soratabischoolblob.blob.core.windows.net/soratabiblob/testImage.png",
  });

  return (
    <AuthContext.Provider value={{ user, isAuth, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
