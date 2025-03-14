import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { KeyRound, User, Eye, EyeClosed } from "lucide-react";
import apiClient from "../../instance/AxiosClient";
import useAuthStore from "../../store/client/useAuthStore"; // Import the Zustand store
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import useAuthCheck from "../../hooks/authCheck";

const ClientLogin = () => {
  const navigate = useNavigate();
  // Use the updated useAuthCheck hook to check authentication status
  const { isAuthenticated, loading: authLoading } = useAuthCheck();
  const [showPassword, setShowPassword] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // Get the login action from Zustand store
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    if (!authLoading) {
      console.log("isAuthenticated:", isAuthenticated);
      if (isAuthenticated) {
        navigate("/client/dashboard");
      } else {
        navigate("/client/login");
      }
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Formik initialization with validation schema from Yup
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      remember: false,
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-z]/, "Password must contain at least one uppercase letter")
        .matches(/[0-9]/, "Password must contain at least one number"),
    }),

    onSubmit: async (values) => {
      setFormLoading(true); // Start loading
      try {
        const response = await apiClient.post("/client/login", {
          username: values.username,
          password: values.password,
        });
        if (response.status === 200) {
          login(response.data.token, response.data.user); // Correctly store token and user
          toast.success("Login successful! Redirecting to your dashboard...");
          setTimeout(() => {
            navigate("/client/dashboard");
          }, 2000);
        }
      } catch (err) {
        if (err.response) {
          switch (err.response.status) {
            case 401:
              toast.error("Invalid username or password. Please try again.", {
                className: "bg-red-500 text-white p-4 rounded-lg shadow-lg", // Tailwind for error toast
              });
              break;
            case 500:
              toast.error("Server error. Please try again later.", {
                className: "bg-red-500 text-white p-4 rounded-lg shadow-lg",
              });
              break;
            case 403:
              toast.error(
                "You do not have permission to access this resource.",
                {
                  className:
                    "bg-yellow-500 text-white p-4 rounded-lg shadow-lg", // Tailwind for warning toast
                }
              );
              break;
            default:
              toast.error("An unexpected error occurred. Please try again.", {
                className: "bg-red-500 text-white p-4 rounded-lg shadow-lg",
              });
          }
        } else {
          toast.error("Network error. Please check your connection.", {
            className: "bg-red-500 text-white p-4 rounded-lg shadow-lg",
          });
        }
      } finally {
        setFormLoading(false); // Stop loading
      }
    },
  });

  return (
    <div className="bg-gray-50 flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src="https://placehold.co/800x/667fff/ffffff.png?text=Your+Image&font=Montserrat"
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="max-w-sm space-y-3">
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium mb-2 dark:text-white"
                aria-label="Username"
              >
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  aria-invalid={
                    formik.touched.username && formik.errors.username
                      ? "true"
                      : "false"
                  }
                  aria-describedby="username-error-helper"
                  aria-label="Enter username"
                  className={`py-3 px-4 ps-11 block w-full ${
                    formik.touched.username && formik.errors.username
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  } shadow-sm rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600`}
                  placeholder="Enter username"
                />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                  <User className="shrink-0 size-4 text-gray-400 dark:text-neutral-600" />
                </div>
              </div>
              {/* Error Message */}
              {formik.touched.username && formik.errors.username && (
                <p
                  className="text-sm text-red-600 mt-2"
                  id="username-error-helper"
                >
                  {formik.errors.username}
                </p>
              )}
            </div>
          </div>

          <div className="max-w-sm space-y-3">
            {/* Password Field */}
            <div className="max-w-sm space-y-3">
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2 dark:text-white"
                aria-label="Password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  aria-invalid={
                    formik.touched.password && formik.errors.password
                      ? "true"
                      : "false"
                  }
                  aria-describedby="password-error-helper"
                  aria-label="Enter password"
                  className={`py-3 px-4 ps-11 pe-11 block w-full ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  } shadow-sm rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600`}
                  placeholder="***********"
                />
                {/* Left Icon */}
                <div className="absolute inset-y-0 start-0 flex items-center ps-4">
                  <KeyRound className="shrink-0 size-4 text-gray-400 dark:text-neutral-600" />
                </div>
                {/* Eye Toggle Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                  className="absolute inset-y-0 end-0 flex items-center pe-4 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeClosed className="shrink-0 size-3 text-gray-400 dark:text-neutral-600" />
                  ) : (
                    <Eye className="shrink-0 size-3 text-gray-400 dark:text-neutral-600" />
                  )}
                </button>
              </div>
              {/* Error Message */}
              {formik.touched.password && formik.errors.password && (
                <p
                  className="text-sm text-red-600 mt-2"
                  id="password-error-helper"
                >
                  {formik.errors.password}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center mt-4">
            <div className="flex">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                onChange={formik.handleChange}
                checked={formik.values.remember}
                aria-label="Remember me"
              />
            </div>
            <div className="ms-2">
              <label htmlFor="remember-me" className="text-sm dark:text-white">
                Remember me?
              </label>
            </div>
          </div>

          <div className="mb-2 mt-1">
            <a
              href="/client/forget-password"
              className="text-sm text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
              aria-label="Forgot Password"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            disabled={formLoading || !formik.isValid}
            className={`max-w-sm w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent ${
              formLoading
                ? "bg-gray-400 text-gray-200"
                : "bg-blue-600 text-white hover:bg-blue-700"
            } disabled:opacity-50 disabled:pointer-events-none`}
            aria-label="Submit login"
          >
            {formLoading ? (
              <>
                <span
                  className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full"
                  role="status"
                  aria-label="loading"
                ></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="max-w-sm mt-6 text-blue-500 text-center hidden">
          <a href="#" className="hover:underline">
            Sign up Here
          </a>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
      />
    </div>
  );
};

export default ClientLogin;
