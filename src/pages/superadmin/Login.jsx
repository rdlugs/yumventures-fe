import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import useAuthStore from "../../store/superadmin/authStore";
import { Eye, EyeClosed, KeyRound, UserRound } from "lucide-react";

// Validation schema using Yup
const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginPage = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // for toggling password visibility
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken); // Get the setToken function from the store

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Send POST request to backend
        const response = await axios.post(
          "http://localhost:3000/customer/login",
          {
            username: values.username,
            password: values.password,
          }
        );

        // On success, store the JWT token in Zustand and localStorage
        setToken(response.data.token);

        // Redirect to superadmin dashboard
        navigate("/superadmin/dashboard");
      } catch (err) {
        // Handle error if login fails
        setError(err.response ? err.response.data.error : "Server error");
      }
    },
  });

  return (
    <div className="flex flex-row justify-center items-center w-full h-screen">
      <div className="mt-7 w-96 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Sign in
            </h1>
          </div>

          <div className="mt-5">
            <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">
              Or
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="grid gap-y-4">
                {/* Username Field */}
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm mb-2 dark:text-white"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="username"
                      name="username"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                      className="py-3 px-4  ps-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    />
                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                      <UserRound className="shrink-0 size-4 text-gray-400 dark:text-neutral-600" />
                    </div>
                  </div>
                  {formik.touched.username && formik.errors.username && (
                    <div className="text-sm text-red-500 mt-2">
                      {formik.errors.username}
                    </div>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm mb-2 dark:text-white"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      className="py-3 px-4 ps-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    />
                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                      <KeyRound className="shrink-0 size-4 text-gray-400 dark:text-neutral-600" />
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 end-0 pe-3 text-gray-500"
                    >
                      {showPassword ? (
                        <Eye className="h-5 w-5" />
                      ) : (
                        <EyeClosed className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-sm text-red-500 mt-2">
                      {formik.errors.password}
                    </div>
                  )}
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center">
                  <div className="flex">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ms-3">
                    <label
                      htmlFor="remember-me"
                      className="text-sm dark:text-white"
                    >
                      Remember me
                    </label>
                  </div>
                </div>

                {/* Display error if login fails */}
                {error && (
                  <div className="error text-red-500 text-sm mt-2">{error}</div>
                )}

                <button
                  type="submit"
                  disabled={formik.isSubmitting || !formik.isValid}
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {formik.isSubmitting ? "Logging in..." : "Sign in"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
