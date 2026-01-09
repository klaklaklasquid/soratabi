import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Image as ImageIcon,
  Eye,
  EyeOff,
} from "lucide-react";
import BlurSpot from "../UI/BlurSpot";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { CreateUser } from "@/Api/apiUser";
import { registerSchema } from "@/schemas/userSchemas";
import { getErrorMessage } from "@/Utils/errorHandler";
import { toast } from "sonner";

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const navigate = useNavigate();

  const createUserMutation = useMutation({
    mutationFn: CreateUser,
    onSuccess: () => {
      toast.success("Registration successful! Please login.");
      navigate("/login");
    },
  });

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: File) => void,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFieldValue("photo", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegisterSubmit = async (values: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    photo: File | undefined;
  }) => {
    if (!values.photo) return;

    const userCreateRequest: UserCreateRequest = {
      username: values.username,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
      firstname: values.firstName,
      lastname: values.lastName,
      photo: values.photo,
    };

    createUserMutation.mutate(userCreateRequest);
  };

  return (
    <section className="grid min-h-[calc(100svh-4rem)] w-screen place-items-center px-5 py-6">
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

      {/* Register Card */}
      <div className="animate-slide-up relative z-10 w-full max-w-md">
        <div className="border-tertiary-blue/30 bg-primary-blue/40 shadow-tertiary-blue/10 rounded-2xl border p-6 shadow-2xl backdrop-blur-xl sm:rounded-3xl sm:p-8">
          {/* Header */}
          <div className="mb-6 text-center sm:mb-8">
            <h1 className="mb-2 text-2xl font-bold text-white sm:text-3xl">
              Create Account
            </h1>
            <p className="text-xs text-gray-300 sm:text-sm">
              Join Soratabi and start your journey
            </p>
          </div>

          {/* Register Form */}
          <Formik
            initialValues={{
              username: "",
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
              photo: undefined as File | undefined,
            }}
            validationSchema={registerSchema}
            onSubmit={handleRegisterSubmit}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form className="space-y-4 sm:space-y-5">
                {/* Profile Image Upload */}
                <div className="flex flex-col items-center">
                  <label className="mb-2 block text-xs font-medium text-gray-300 sm:mb-3 sm:text-sm">
                    Profile Picture
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="profileImage"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, setFieldValue)}
                      className="hidden"
                    />
                    <label
                      htmlFor="profileImage"
                      className="group border-tertiary-blue/50 bg-primary-blue/50 hover:border-tertiary-blue hover:bg-primary-blue/70 relative flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed transition-all duration-300 sm:h-24 sm:w-24"
                    >
                      {previewUrl ? (
                        <img
                          src={previewUrl}
                          alt="Profile preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="text-tertiary-blue/70 group-hover:text-tertiary-blue h-8 w-8 transition-colors sm:h-10 sm:w-10" />
                      )}
                    </label>
                  </div>
                  <ErrorMessage
                    name="photo"
                    component="div"
                    className="text-tertiary-red mt-1 text-center text-xs"
                  />
                </div>

                {/* Username Input */}
                <div className="relative w-full">
                  <label className="mb-2 block text-xs font-medium text-gray-300 sm:text-sm">
                    Username
                  </label>
                  <div className="relative w-full">
                    <User className="text-tertiary-blue/70 pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 sm:left-4 sm:h-5 sm:w-5" />
                    <Field
                      type="text"
                      name="username"
                      placeholder="johnDoe"
                      className={`w-full min-w-0 rounded-full border ${
                        errors.username && touched.username
                          ? "border-tertiary-red"
                          : "border-tertiary-blue/30"
                      } bg-primary-blue/50 focus:border-tertiary-blue focus:ring-tertiary-blue/20 py-2.5 pr-3 pl-10 text-sm text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 outline-none focus:ring-2 sm:py-3 sm:pr-4 sm:pl-12 sm:text-base`}
                    />
                  </div>
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-tertiary-red mt-1 text-xs"
                  />
                </div>

                {/* Name Row */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {/* First Name */}
                  <div className="relative w-full">
                    <label className="mb-2 block text-xs font-medium text-gray-300 sm:text-sm">
                      First Name
                    </label>
                    <div className="relative w-full">
                      <User className="text-tertiary-blue/70 pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 sm:left-4 sm:h-5 sm:w-5" />
                      <Field
                        type="text"
                        name="firstName"
                        placeholder="John"
                        className={`w-full min-w-0 rounded-full border ${
                          errors.firstName && touched.firstName
                            ? "border-tertiary-red"
                            : "border-tertiary-blue/30"
                        } bg-primary-blue/50 focus:border-tertiary-blue focus:ring-tertiary-blue/20 py-2.5 pr-3 pl-10 text-sm text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 outline-none focus:ring-2 sm:py-3 sm:pr-4 sm:pl-12 sm:text-base`}
                      />
                    </div>
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-tertiary-red mt-1 text-xs"
                    />
                  </div>

                  {/* Last Name */}
                  <div className="relative w-full">
                    <label className="mb-2 block text-xs font-medium text-gray-300 sm:text-sm">
                      Last Name
                    </label>
                    <div className="relative w-full">
                      <User className="text-tertiary-blue/70 pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 sm:left-4 sm:h-5 sm:w-5" />
                      <Field
                        type="text"
                        name="lastName"
                        placeholder="Doe"
                        className={`w-full min-w-0 rounded-full border ${
                          errors.lastName && touched.lastName
                            ? "border-tertiary-red"
                            : "border-tertiary-blue/30"
                        } bg-primary-blue/50 focus:border-tertiary-blue focus:ring-tertiary-blue/20 py-2.5 pr-3 pl-10 text-sm text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 outline-none focus:ring-2 sm:py-3 sm:pr-4 sm:pl-12 sm:text-base`}
                      />
                    </div>
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="text-tertiary-red mt-1 text-xs"
                    />
                  </div>
                </div>

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

                {/* Confirm Password Input */}
                <div className="relative w-full">
                  <label className="mb-2 block text-xs font-medium text-gray-300 sm:text-sm">
                    Confirm Password
                  </label>
                  <div className="relative w-full">
                    <Lock className="text-tertiary-blue/70 pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 sm:left-4 sm:h-5 sm:w-5" />
                    <Field
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="••••••••"
                      className={`w-full min-w-0 rounded-full border ${
                        errors.confirmPassword && touched.confirmPassword
                          ? "border-tertiary-red"
                          : "border-tertiary-blue/30"
                      } bg-primary-blue/50 focus:border-tertiary-blue focus:ring-tertiary-blue/20 py-2.5 pr-10 pl-10 text-sm text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 outline-none focus:ring-2 sm:py-3 sm:pr-12 sm:pl-12 sm:text-base`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="hover:text-tertiary-blue absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 transition-colors sm:right-4"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                      ) : (
                        <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                      )}
                    </button>
                  </div>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-tertiary-red mt-1 text-xs"
                  />
                </div>

                {/* Error Message */}
                {createUserMutation.isError && (
                  <div className="bg-tertiary-red/20 border-tertiary-red/50 text-tertiary-red rounded-lg border p-3 text-sm">
                    {getErrorMessage(
                      createUserMutation.error,
                      "Registration failed. Please try again.",
                    )}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={createUserMutation.isPending}
                  className="bg-secondary-blue shadow-secondary-blue/50 hover:shadow-secondary-blue/70 w-full min-w-0 rounded-full py-2.5 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 sm:py-3 sm:text-base"
                >
                  {createUserMutation.isPending
                    ? "Creating Account..."
                    : "Create Account"}
                </button>
              </Form>
            )}
          </Formik>

          {/* Link to Login */}
          <div className="mt-5 text-center sm:mt-6">
            <p className="text-xs text-gray-400 sm:text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-tertiary-blue hover:text-tertiary-blue/80 font-medium transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
