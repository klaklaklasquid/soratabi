import * as Yup from "yup";

// The shape of the values in the form
export interface LoginValues {
  email: string;
  password: string;
}

// The shape of the form validation schema
export const LoginSchema = Yup.object<LoginValues>().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
