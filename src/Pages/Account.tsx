import useAuth from "../Auth/useAuth";
import { useNavigate } from "react-router-dom";

function Account() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signoutRedirect();
  };

  if (auth.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-xl text-white">Loading...</div>
      </div>
    );
  }

  if (!auth.isAuthenticated) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen p-8">
      <div className="bg-primary-blue/40 border-tertiary-blue/30 mx-auto max-w-4xl rounded-2xl border p-8 backdrop-blur-xl">
        <h1 className="mb-6 text-3xl font-bold text-white">Account</h1>

        <div className="space-y-4 text-white">
          <div>
            <label className="text-sm text-gray-400">Name</label>
            <p className="text-lg">{auth.user?.profile?.name || "N/A"}</p>
          </div>

          <div>
            <label className="text-sm text-gray-400">Email</label>
            <p className="text-lg">{auth.user?.profile?.email || "N/A"}</p>
          </div>

          <div>
            <label className="text-sm text-gray-400">User ID</label>
            <p className="font-mono text-sm">
              {auth.user?.profile?.sub || "N/A"}
            </p>
          </div>

          <div className="pt-6">
            <button
              onClick={handleLogout}
              className="bg-tertiary-red hover:bg-tertiary-red/80 rounded-full px-6 py-2 text-white transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
