import { useEffect } from "react";
import { LogIn } from "lucide-react";
import BlurSpot from "../UI/BlurSpot";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Auth/useAuth";

function LoginPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/");
    }
  }, [auth.isAuthenticated, navigate]);

  const handleLoginSubmit = () => {
    // Redirect to Identity Server for login
    auth.signinRedirect();
  };

  // Handle OAuth callback
  useEffect(() => {
    // If returning from OAuth, this will be handled automatically by react-oidc-context
    if (auth.error) {
      console.error("Authentication error:", auth.error);
    }
  }, [auth.error]);

  if (auth.isLoading) {
    return (
      <section className="grid min-h-[calc(100svh-4rem)] w-screen place-items-center">
        <div className="text-xl text-white">Loading...</div>
      </section>
    );
  }

  return (
    <section className="grid min-h-[calc(100svh-4rem)] w-screen place-items-center px-5">
      {/* Background blur spots */}

      <BlurSpot
        color="bg-tertiary-blue/20"
        className="top-1/4 left-0 h-48 w-48 sm:h-72 sm:w-72"
        blur="blur-[80px] sm:blur-[100px]"
      />
      <BlurSpot
        color="bg-secondary-blue/20"
        className="right-0 bottom-1/4 h-64 w-64 sm:right-1/4 sm:h-96 sm:w-96"
        blur="blur-[100px] sm:blur-[120px]"
      />

      {/* Login Card */}
      <div className="animate-slide-up relative z-10 w-full max-w-md">
        <div className="border-tertiary-blue/30 bg-primary-blue/40 shadow-tertiary-blue/10 rounded-2xl border p-6 shadow-2xl backdrop-blur-xl sm:rounded-3xl sm:p-8">
          {/* Header */}
          <div className="mb-6 text-center sm:mb-8">
            <h1 className="mb-2 text-2xl font-bold text-white sm:text-3xl">
              Welcome Back
            </h1>
            <p className="text-xs text-gray-300 sm:text-sm">
              Sign in to continue your adventure
            </p>
          </div>

          {/* Error Message */}
          {auth.error && (
            <div className="bg-tertiary-red/20 border-tertiary-red/50 text-tertiary-red mb-4 rounded-lg border p-3 text-sm">
              Authentication error. Please try again.
            </div>
          )}

          {/* Login Button */}
          <div className="space-y-4">
            <button
              onClick={handleLoginSubmit}
              className="bg-secondary-blue shadow-secondary-blue/50 hover:shadow-secondary-blue/70 flex w-full items-center justify-center gap-2 rounded-full py-3 text-base font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl sm:py-4 sm:text-lg"
            >
              <LogIn className="h-5 w-5" />
              Sign In with Identity Server
            </button>
          </div>

          {/* Link to Register */}
          <div className="mt-5 text-center sm:mt-6">
            <p className="text-xs text-gray-400 sm:text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-tertiary-blue hover:text-tertiary-blue/80 font-medium transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
