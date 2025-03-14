import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const SelfOnboardingForm = () => {
  const [error, setError] = useState("");

  // Form validation schema using Yup
  const formik = useFormik({
    initialValues: {
      businessName: "",
      address: "",
      contact: "",
      registrationNumber: "",
      documents: null,
    },
    validationSchema: Yup.object({
      businessName: Yup.string().required("Business name is required"),
      address: Yup.string().required("Address is required"),
      contact: Yup.string().required("Contact is required"),
      registrationNumber: Yup.string().required(
        "Registration number is required"
      ),
      documents: Yup.mixed().required("Documents are required"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("businessName", values.businessName);
      formData.append("address", values.address);
      formData.append("contact", values.contact);
      formData.append("registrationNumber", values.registrationNumber);
      formData.append("documents", values.documents);

      try {
        const response = await axios.post(
          "http://localhost:3000/superadmin/self-onboard",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        alert(response.data.message);
      } catch (err) {
        setError("Failed to submit business details", err);
      }
    },
  });

  return (
    <div>
      <h2>Self Onboarding</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="businessName">Business Name</label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            value={formik.values.businessName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.businessName && formik.errors.businessName && (
            <div>{formik.errors.businessName}</div>
          )}
        </div>

        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.address && formik.errors.address && (
            <div>{formik.errors.address}</div>
          )}
        </div>

        <div>
          <label htmlFor="contact">Contact</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={formik.values.contact}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.contact && formik.errors.contact && (
            <div>{formik.errors.contact}</div>
          )}
        </div>

        <div>
          <label htmlFor="registrationNumber">Registration Number</label>
          <input
            type="text"
            id="registrationNumber"
            name="registrationNumber"
            value={formik.values.registrationNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.registrationNumber &&
            formik.errors.registrationNumber && (
              <div>{formik.errors.registrationNumber}</div>
            )}
        </div>

        <div>
          <label htmlFor="documents">Upload Documents</label>
          <input
            type="file"
            id="documents"
            name="documents"
            onChange={(e) =>
              formik.setFieldValue("documents", e.target.files[0])
            }
            onBlur={formik.handleBlur}
          />
          {formik.touched.documents && formik.errors.documents && (
            <div>{formik.errors.documents}</div>
          )}
        </div>

        {error && <div>{error}</div>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SelfOnboardingForm;
