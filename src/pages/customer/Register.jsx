import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const CustomerRegisterPage = () => {
  const navigate = useNavigate();

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters long")
      .required("Name is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  // Initial form values
  const initialValues = {
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await fetch("http://localhost:3000/customer/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        navigate("/login");
      } else {
        const data = await response.json();
        setErrors({ server: data.message || "Registration failed." });
      }
    } catch (err) {
      setErrors({ server: "An unexpected error occurred." }, err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Section - Image */}
      <div className="w-1/2 bg-gray-900">
        <img
          src="your-image-url-here.jpg"
          alt="Delicious Dish"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right Section - Form */}
      <div className="w-1/2 flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Create an account
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Register to access our latest products and services.
          </p>

          {/* Formik Form */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors }) => (
              <Form>
                {/* Name Field */}
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    placeholder="What shall we call you?"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-gray-300"
                  />
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="text-sm text-red-600 mt-1"
                  />
                </div>

                {/* Email Field */}
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Username
                  </label>
                  <Field
                    type="username"
                    name="username"
                    placeholder="Enter your username here"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-gray-300"
                  />
                  <ErrorMessage
                    name="username"
                    component="p"
                    className="text-sm text-red-600 mt-1"
                  />
                </div>

                {/* Password Field */}
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter your password here"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-gray-300"
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-sm text-red-600 mt-1"
                  />
                </div>

                {/* Confirm Password Field */}
                <div className="mb-4">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Confirm Password
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Re-enter your password"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-gray-300"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="p"
                    className="text-sm text-red-600 mt-1"
                  />
                </div>

                {/* Server Error */}
                {errors.server && (
                  <p className="text-sm text-red-600 mb-4">{errors.server}</p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition"
                >
                  {isSubmitting ? "Signing up..." : "Sign up →"}
                </button>
              </Form>
            )}
          </Formik>

          {/* Login Redirect */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Have an account already?{" "}
            <Link to="/Login" className="text-gray-800 underline">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerRegisterPage;
