import useAuth from "../Auth/useAuth";
import { useNavigate } from "react-router-dom";
import { useUserProfile } from "../Hooks/useUserProfile";
import Loading from "../UI/Loading";
import ErrorMessage from "../UI/ErrorMessage";
import EditProfileImagePopup from "@/UI/EditProfileImagePopup";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PatchUser } from "@/Api/apiUser";

function Account() {
  const auth = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showEditPopup, setShowEditPopup] = useState(false);
  const {
    data: userProfile,
    isLoading: isLoadingProfile,
    error: profileError,
  } = useUserProfile();

  const updateImageMutation = useMutation({
    mutationFn: PatchUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      setShowEditPopup(false);
    },
  });

  const handleLogout = () => {
    auth.signoutRedirect();
  };

  const handleSaveImage = (image: File) => {
    updateImageMutation.mutate({ image });
  };

  if (auth.isLoading || isLoadingProfile) {
    return <Loading />;
  }

  if (!auth.isAuthenticated) {
    navigate("/login");
    return null;
  }

  // If there's an error loading profile, show error but still allow logout
  if (profileError) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4 sm:p-8">
        <div className="bg-primary-blue/40 border-tertiary-blue/30 mx-auto w-full max-w-md rounded-2xl border p-8 backdrop-blur-xl sm:p-12">
          <h1 className="mb-10 text-center text-2xl font-bold text-white sm:text-3xl">
            My Account
          </h1>
          <ErrorMessage message="Failed to load user profile. Please try again." />
          <div className="pt-8">
            <button
              onClick={handleLogout}
              className="bg-tertiary-red hover:bg-tertiary-red/80 w-full rounded-full px-6 py-4 text-lg text-white transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:p-8">
      <div className="bg-primary-blue/40 border-tertiary-blue/30 mx-auto w-full max-w-md rounded-2xl border p-8 backdrop-blur-xl sm:p-12">
        <h1 className="mb-10 text-center text-2xl font-bold text-white sm:text-3xl">
          My Account
        </h1>

        <div className="space-y-8 text-white">
          {/* Profile Picture - Prominent on mobile */}
          <div className="flex flex-col items-center space-y-6">
            {userProfile?.userphoto ? (
              <div className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-full shadow-lg sm:h-48 sm:w-48">
                <img
                  src={userProfile.userphoto}
                  alt="Profile"
                  className="min-h-full min-w-full object-cover"
                  style={{ objectPosition: "50% 50%" }}
                />
              </div>
            ) : (
              <div className="border-tertiary-blue/30 bg-primary-blue/50 flex h-40 w-40 items-center justify-center rounded-full border-4 shadow-lg sm:h-48 sm:w-48">
                <span className="text-5xl text-gray-400 sm:text-6xl">
                  {userProfile?.firstName?.[0] ||
                    auth.user?.profile?.name?.[0] ||
                    "?"}
                </span>
              </div>
            )}

            {/* Name */}
            <div className="text-center">
              <p className="text-2xl font-semibold sm:text-3xl">
                {userProfile?.firstName && userProfile?.lastName
                  ? `${userProfile.firstName} ${userProfile.lastName}`
                  : auth.user?.profile?.name || "User"}
              </p>
              {userProfile?.role && (
                <p className="text-tertiary-blue mt-2 text-base capitalize sm:text-lg">
                  {userProfile.role}
                </p>
              )}
            </div>
          </div>

          {/* Logout Button */}
          <div className="space-y-3 pt-6">
            <button
              onClick={() => setShowEditPopup(true)}
              className="border-secondary-blue/40 bg-secondary-blue/30 hover:border-secondary-blue/60 hover:bg-secondary-blue/50 w-full rounded-full border px-6 py-4 text-lg font-semibold text-white transition-all hover:scale-105"
            >
              Change Profile Image
            </button>
            <button
              onClick={handleLogout}
              className="bg-tertiary-red hover:bg-tertiary-red/80 w-full rounded-full px-6 py-4 text-lg text-white transition-all hover:scale-105"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <EditProfileImagePopup
        isOpen={showEditPopup}
        onClose={() => setShowEditPopup(false)}
        onSave={handleSaveImage}
        currentImage={userProfile?.userphoto}
        isUploading={updateImageMutation.isPending}
      />
    </div>
  );
}

export default Account;
