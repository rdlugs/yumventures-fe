import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { validateToken } from "../../services/businessApi";

const Register = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [isValidToken, setIsValidToken] = useState(null);
  const [error, setError] = useState("");

  // Validate the token when the component mounts
  useEffect(() => {
    handleValidateToken(token); //
  }, [token]);

  const handleValidateToken = async (token) => {
    const response = await validateToken(token);
    if (response.success) {
      setIsValidToken(true);
    }
  };

  // Formik and Yup integration
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(4, "Username must be at least 4 characters long")
        .required("Username is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:3000/client/create-account",
          {
            username: values.username,
            password: values.password,
          },
          { withCredentials: true }
        );

        alert("Account created successfully!");
        navigate("/client/login"); // Redirect to login page after successful account creation
      } catch (err) {
        console.error("Error creating account:", err);
        setError("Failed to create account. Please try again.");
      }
    },
  });

  return (
    <div className="create-account-page">
      <h1>Create Account</h1>

      {/* Display message based on token validity */}
      {isValidToken === null && <p>Loading...</p>}
      {isValidToken === false && <p>{error}</p>}
      {isValidToken === true && (
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.username && formik.errors.username ? (
              <p className="error">{formik.errors.username}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="error">{formik.errors.password}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <p className="error">{formik.errors.confirmPassword}</p>
            ) : null}
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit">Create Account</button>
        </form>
      )}
    </div>
  );
};

export default Register;
