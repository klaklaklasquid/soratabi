import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import BlurSpot from "../UI/BlurSpot";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginSubmit = (values: { email: string; password: string }) => {
    console.log("Login:", values);
    // Add your login logic here
  };

  return (
    <div className="relative flex min-h-screen w-full items-start justify-center overflow-x-hidden px-5 pt-24 pb-10 sm:items-center sm:px-6 sm:py-20 lg:px-12">
      {/* Background blur spots */}
      <BlurSpot
        color="bg-tertiary-blue/30"
        className="top-[20%] left-[20%] h-[400px] w-[400px]"
      />
      <BlurSpot
        color="bg-secondary-blue/30"
        className="top-[60%] right-[10%] h-[350px] w-[350px]"
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

          {/* Login Form */}
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={handleLoginSubmit}
          >
            {({ errors, touched }) => (
              <Form className="space-y-4 sm:space-y-5">
                {/* Email Input */}
                <div className="relative w-full">
                  <label className="mb-2 block text-xs font-medium text-gray-300 sm:text-sm">
                    Email
                  </label>
                  <div className="relative w-full">
                    <Mail className="text-tertiary-blue/70 pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 sm:left-4 sm:h-5 sm:w-5" />
                    <Field
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      className={`w-full min-w-0 rounded-full border ${
                        errors.email && touched.email
                          ? "border-tertiary-red"
                          : "border-tertiary-blue/30"
                      } bg-primary-blue/50 focus:border-tertiary-blue focus:ring-tertiary-blue/20 py-2.5 pr-3 pl-10 text-sm text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 outline-none focus:ring-2 sm:py-3 sm:pr-4 sm:pl-12 sm:text-base`}
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-tertiary-red mt-1 text-xs"
                  />
                </div>

                {/* Password Input */}
                <div className="relative w-full">
                  <label className="mb-2 block text-xs font-medium text-gray-300 sm:text-sm">
                    Password
                  </label>
                  <div className="relative w-full">
                    <Lock className="text-tertiary-blue/70 pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 sm:left-4 sm:h-5 sm:w-5" />
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="••••••••"
                      className={`w-full min-w-0 rounded-full border ${
                        errors.password && touched.password
                          ? "border-tertiary-red"
                          : "border-tertiary-blue/30"
                      } bg-primary-blue/50 focus:border-tertiary-blue focus:ring-tertiary-blue/20 py-2.5 pr-10 pl-10 text-sm text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 outline-none focus:ring-2 sm:py-3 sm:pr-12 sm:pl-12 sm:text-base`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="hover:text-tertiary-blue absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 transition-colors sm:right-4"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                      ) : (
                        <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                      )}
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-tertiary-red mt-1 text-xs"
                  />
                </div>

                {/* Forgot Password */}
                <div className="text-right">
                  <button
                    type="button"
                    className="text-tertiary-blue hover:text-tertiary-blue/80 text-xs transition-colors sm:text-sm"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="bg-secondary-blue shadow-secondary-blue/50 hover:shadow-secondary-blue/70 w-full min-w-0 rounded-full py-2.5 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl sm:py-3 sm:text-base"
                >
                  Sign In
                </button>
              </Form>
            )}
          </Formik>

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
    </div>
  );
}

export default LoginPage;
