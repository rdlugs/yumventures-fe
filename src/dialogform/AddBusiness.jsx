import { XCircle } from "lucide-react";
import DialogComponent from "../components/DialogComponent";
import useDialogStore from "../store/useDialogStore";
import { useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { AddBusinesses } from "../services/businessApi";

import { fetchBusinesses } from "../services/businessApi";

const AddBusiness = ({ setBusinesses }) => {
  const { closeDialog } = useDialogStore();

  // Form validation schema using Yup
  const formik = useFormik({
    initialValues: {
      businessName: "",
      businessRepresentative: "",
      businessEmail: "",
      address: "",
      contact: "",
      registrationNumber: "",
      documents: null,
    },
    validationSchema: Yup.object({
      businessName: Yup.string().required("Business name is required"),
      businessRepresentative: Yup.string().required(
        "Name of representative is required"
      ),
      businessEmail: Yup.string()
        .email("Invalid email address")
        .required("Business email is required"),
      address: Yup.string().required("Address is required"),
      contact: Yup.string().required("Contact is required"),
      registrationNumber: Yup.string().required(
        "Registration number is required"
      ),
      documents: Yup.mixed().required("Documents are required"),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        // Append the individual business details directly to FormData
        formData.append("businessName", values.businessName);
        formData.append(
          "businessRepresentative",
          values.businessRepresentative
        );
        formData.append("businessEmail", values.businessEmail);
        formData.append("address", values.address);
        formData.append("contact", values.contact);
        formData.append("registrationNumber", values.registrationNumber);

        // Append the document (assuming it's a file)
        formData.append("documents", values.documents);

        const response = await AddBusinesses(formData);

        if (response.success) {
          alert(response.message);
          const businessesData = await fetchBusinesses();
          setBusinesses(businessesData);

          // Close the dialog only if the response was successful
          closeDialog();

          // Reset the form after submission
          formik.resetForm();
        } else {
          alert(`Error: ${response.message}`);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <DialogComponent id="addBusiness">
      <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-800">
        <h3 className="font-bold text-gray-800 dark:text-neutral-200">
          Add new business
        </h3>
        <button
          type="button"
          onClick={closeDialog}
          className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
        >
          <span className="sr-only">Close</span>
          <XCircle className="shrink-0 size-4" />
        </button>
      </div>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="max-w-xl px-4 py-10 sm:px-6 lg:px-8 mx-auto "
        >
          <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="businessName"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
              >
                Business Name
              </label>
            </div>

            <div className="sm:col-span-9">
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={formik.values.businessName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="e.g. Jollibee"
              />
              {formik.touched.businessName && formik.errors.businessName && (
                <div className="text-xs text-red-600 py-2">
                  {formik.errors.businessName}
                </div>
              )}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="businessRepresentative"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
              >
                Representative
              </label>
            </div>

            <div className="sm:col-span-9">
              <input
                type="text"
                id="businessRepresentative"
                name="businessRepresentative"
                value={formik.values.businessRepresentative}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="e.g. John Doe"
              />
              {formik.touched.businessRepresentative &&
                formik.errors.businessRepresentative && (
                  <div className="text-xs text-red-600 py-2">
                    {formik.errors.businessRepresentative}
                  </div>
                )}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="businessEmail"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
              >
                Email
              </label>
            </div>

            <div className="sm:col-span-9">
              <input
                type="email"
                id="businessEmail"
                name="businessEmail"
                value={formik.values.businessEmail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="e.g. your@email.com"
              />
              {formik.touched.businessEmail && formik.errors.businessEmail && (
                <div className="text-xs text-red-600 py-2">
                  {formik.errors.businessEmail}
                </div>
              )}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="address"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
              >
                Business Address
              </label>
            </div>

            <div className="sm:col-span-9">
              <input
                type="text"
                id="address"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="e.g. Metro manila, Philippines"
              />
              {formik.touched.address && formik.errors.address && (
                <div className="text-xs text-red-600 py-2">
                  {formik.errors.address}
                </div>
              )}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="contact"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
              >
                Phone Number
              </label>
            </div>

            <div className="sm:col-span-9">
              <input
                type="text"
                id="contact"
                name="contact"
                value={formik.values.contact}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="e.g. 9123456789"
              />
              {formik.touched.contact && formik.errors.contact && (
                <div className="text-xs text-red-600 py-2">
                  {formik.errors.contact}
                </div>
              )}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="registrationNumber"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
              >
                Registration No.
              </label>
            </div>

            <div className="sm:col-span-9">
              <input
                type="text"
                id="registrationNumber"
                name="registrationNumber"
                value={formik.values.registrationNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="e.g. DTI Reg No. or SEC Reg No."
              />
              {formik.touched.registrationNumber &&
                formik.errors.registrationNumber && (
                  <div className="text-xs text-red-600 py-2">
                    {formik.errors.registrationNumber}
                  </div>
                )}
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="documents"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
              >
                Document/s
              </label>
            </div>

            <div className="sm:col-span-9">
              <input
                type="file"
                id="documents"
                name="documents"
                onChange={(e) =>
                  formik.setFieldValue("documents", e.target.files[0])
                }
                onBlur={formik.handleBlur}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                placeholder="e.g. 9123456789"
              />
              {formik.touched.documents && formik.errors.documents && (
                <div className="text-xs text-red-600 py-2">
                  {formik.errors.documents}
                </div>
              )}
            </div>
          </div>

          <button
            className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </DialogComponent>
  );
};

// Add PropTypes
AddBusiness.propTypes = {
  setBusinesses: PropTypes.func.isRequired,
};

export default AddBusiness;
