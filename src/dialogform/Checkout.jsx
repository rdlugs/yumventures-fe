import { XCircle } from "lucide-react";
import DialogComponent from "../components/DialogComponent";
import useDialogStore from "../store/useDialogStore";
import { useFormik } from "formik";
import * as Yup from "yup";
import apiClient from "../instance/AxiosClient";
import PropTypes from "prop-types";
import { useState } from "react";

const Checkout = ({ total, order, setOrder }) => {
  const { closeDialog } = useDialogStore();
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const [amountPaid, setAmountPaid] = useState(""); // Cash amount input
  const denominations = [1, 5, 10, 20, 50, 100, 200, 500, 1000]; // Example denominations

  const change = Math.max(
    parseFloat(amountPaid || 0) - parseFloat(total || 0),
    0
  ).toFixed(2);

  const formik = useFormik({
    initialValues: {
      amountPaid: "",
      paymentMethod: "Cash",
      total,
    },
    validationSchema: Yup.object({
      amountPaid: Yup.number()
        .required("Amount paid is required")
        .min(total, "Amount paid must cover the total amount"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const payload = {
          order,
          paymentMethod: values.paymentMethod,
          amountPaid: parseFloat(values.amountPaid),
          discountAmount: parseFloat(values.discountAmount || 0),
        };

        const response = await apiClient.post(
          "/pos/create-transaction",
          payload
        );
        alert("Transaction successful:", response.data);

        // Reset form and close dialog
        setOrder([]);
        setAmountPaid(0);
        resetForm();
        closeDialog();
      } catch (error) {
        console.error("Error completing transaction:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <DialogComponent id="checkout">
      <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-800">
        <h3 className="font-bold text-gray-800 dark:text-neutral-200">
          Checkout
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
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-lg overflow-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Payment Methods and Billing & Payment Information */}
          <div className="flex flex-col gap-6">
            {/* Payment Methods */}
            <div className="flex flex-row w-full justify-center items-center">
              {/* Pay with Cash */}
              <button
                onClick={() => setPaymentMethod("Cash")}
                type="button"
                className={`py-2 px-3 inline-flex justify-center items-center gap-2 -ms-px first:rounded-l-lg text-sm font-medium focus:z-10 shadow-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800
          ${
            paymentMethod === "Cash"
              ? "border border-gray-200 bg-white text-gray-800 hover:bg-gray-50"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
              >
                Pay with Cash
              </button>

              {/* Pay with E-wallet (disabled for now) */}
              <button
                onClick={() => setPaymentMethod("e-wallet")}
                type="button"
                disabled={true} // Disable the e-wallet button
                className={`py-2 px-3 inline-flex justify-center items-center gap-2 -ms-px last:rounded-r-lg text-sm font-medium focus:z-10 shadow-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800
          ${
            paymentMethod === "e-wallet"
              ? "border border-gray-200 bg-white text-gray-800 hover:bg-gray-50"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
              >
                Pay with E-wallet
              </button>
            </div>

            {/* Cash Payment Information */}
            {paymentMethod === "Cash" && (
              <div>
                <div className="max-w-sm space-y-3">
                  <div>
                    <label
                      htmlFor="amountPaid"
                      className="block text-sm font-medium mb-2 dark:text-white"
                    >
                      Cash amount
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        id="amountPaid"
                        name="amountPaid"
                        value={formik.values.amountPaid}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="py-3 px-4 ps-9 pe-16 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        placeholder="0.00"
                      />
                      <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                        <span className="text-gray-500 dark:text-neutral-500">
                          ₱
                        </span>
                      </div>
                      <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-4">
                        <span className="text-gray-500 dark:text-neutral-500">
                          PHP
                        </span>
                      </div>
                    </div>
                    {formik.touched.amountPaid && formik.errors.amountPaid && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.amountPaid}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="font-semibold text-lg">Denomination</h4>
                  <div className="grid grid-cols-5 gap-4 mt-2">
                    {denominations.map((denom) => (
                      <button
                        key={denom}
                        type="button"
                        onClick={() => {
                          // Add denomination value to the current amountPaid
                          const newTotal = parseFloat(amountPaid || 0) + denom;
                          setAmountPaid(newTotal.toFixed(2)); // Update local state
                          formik.setFieldValue(
                            "amountPaid",
                            newTotal.toFixed(2)
                          ); // Update Formik's state
                        }}
                        className={`px-4 py-2 border rounded-lg text-sm font-medium ${
                          parseFloat(amountPaid) === denom
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        ₱{denom}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Summary Section */}
          <div className="flex flex-col gap-4">
            <div className="gap-5 min-h-48 max-h-52 bg-white shadow-inner overflow-auto">
              <ul>
                {order.map((item, index) => (
                  <div
                    key={index}
                    className="block border border-gray-200 rounded-lg hover:shadow-sm focus:outline-none dark:border-neutral-700 my-2"
                  >
                    <div className="relative flex items-center overflow-hidden ">
                      <img
                        className="w-14 h-full absolute inset-0 object-cover rounded-s-lg"
                        src={`http://localhost:3000${item.image.replace(
                          "C:\\Users\\Lenovo\\Downloads\\capstone\\yumventures\\backend",
                          ""
                        )}`}
                        alt="Blog Image"
                      />

                      <div className="grow p-2 ml-12 sm:ml-16 flex flex-row justify-between items-center">
                        <div className=" flex flex-col justify-center">
                          <h3 className="font-semibold text-xs text-gray-800 dark:text-neutral-300">
                            {item.menu_item_name}
                          </h3>
                          <p className="mt-1 text-xs text-gray-500 dark:text-neutral-500">
                            {item.quantity} x ₱{item.price}
                          </p>
                        </div>
                        <div></div>
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
            </div>

            <ul className="mt-3 flex flex-col">
              <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:border-neutral-700 dark:text-neutral-200">
                <div className="flex items-center justify-between w-full">
                  <span>Total</span>
                  <span>₱{total}</span>
                </div>
              </li>

              <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-semibold bg-gray-50 border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
                <div className="flex items-center justify-between w-full">
                  <span>Amount paid</span>
                  <span>₱{amountPaid || 0}</span>
                </div>
              </li>
              <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:border-neutral-700 dark:text-neutral-200">
                <div className="flex items-center justify-between w-full">
                  <span>Change</span>
                  <span>₱{change}</span>
                </div>
              </li>
            </ul>

            <button
              disabled={formik.isSubmitting}
              className="bg-blue-600 text-white font-semibold py-3 rounded-lg mt-6"
            >
              {formik.isSubmitting ? "Processing..." : "Complete Transaction"}
            </button>
            <p className="mt-4 text-xs text-gray-600">
              By completing this transaction, you agree to our Terms of Service
              and Privacy Policy.
            </p>
          </div>
        </div>
      </form>
    </DialogComponent>
  );
};

Checkout.propTypes = {
  total: PropTypes.number.isRequired,
  order: PropTypes.arrayOf(
    PropTypes.shape({
      menu_item_name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  setOrder: PropTypes.func.isRequired,
};

export default Checkout;
