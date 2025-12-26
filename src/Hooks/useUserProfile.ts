import { useQuery } from "@tanstack/react-query";
import useAuth from "@/Auth/useAuth";
import { GetUser } from "@/Api/apiUser";

interface UserProfile {
  role?: string;
  firstName?: string;
  lastName?: string;
  userphoto?: string;
}

export const useUserProfile = () => {
  const auth = useAuth();
  const userId = auth.user?.profile?.sub;

  return useQuery<UserProfile>({
    queryKey: ["userProfile", userId],
    queryFn: GetUser,
    enabled: !!auth.isAuthenticated && !!userId,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export type { UserProfile };
