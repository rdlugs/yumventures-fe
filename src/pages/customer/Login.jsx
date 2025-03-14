import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

// Validation schema using Yup
const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const CustomerLoginPage = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.post("http://localhost:3000/customer/login", {
          username: values.username,
          password: values.password,
        });
        navigate("/moment");
      } catch (err) {
        setError(err.response ? err.response.data.error : "Server error");
      }
    },
  });

  return (
    <div className="bg-gray-50 flex justify-center items-center h-screen">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center items-center px-6 md:px-12 lg:px-20">
        <div className="w-full max-w-sm md:max-w-md">
          <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-gray-600 mb-6">
            Login to gain access to our amazing services.
          </p>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 font-semibold mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username "
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
              {formik.touched.username && formik.errors.username && (
                <div className="text-red-500 text-sm mt-2">
                  {formik.errors.username}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm mt-2">
                  {formik.errors.password}
                </div>
              )}
            </div>
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center text-gray-700 text-sm">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a
                href="/forgot-password"
                className="text-blue-500 text-sm hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Log In →
            </button>
          </form>
          <p className="mt-4 text-gray-600 text-center">
            Don’t have an account yet?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Register here
            </a>
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src="https://placehold.co/800x/667fff/ffffff.png?text=Your+Image&font=Montserrat"
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default CustomerLoginPage;
