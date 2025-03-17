import ClientLayout from "../../layouts/client/ClientLayout";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../instance/AxiosClient";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Asterisk,
  CalendarX,
  PackageSearch,
  Plus,
  Warehouse,
  XCircle,
} from "lucide-react";
import useDialogStore from "../../store/useDialogStore";
import DialogComponent from "../../components/DialogComponent";
import InventoryStatus from "../../components/client/InventoryStatus";



const Inventory = () => {
  const navigate = useNavigate();
  const { openDialog, closeDialog } = useDialogStore();
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const validationSchema = Yup.object({
    ingredientName: Yup.string().required("Product name is required"),
    category: Yup.string().required("Category is required"),
    quantity: Yup.number()
      .required("Quantity is required")
      .positive("Quantity must be positive")
      .min(1, "Quantity must be at least 1"),
    unit: Yup.string().required("Unit is required"),
    cost: Yup.number()
      .required("Cost is required")
      .positive("Cost must be positive")
      .min(0, "Cost cannot be negative"),
    location: Yup.string().required("Location is required"),
    expirationDate: Yup.date().nullable().notRequired(),
  });

  const unit_option = [
    "kg",
    "g",
    "l",
    "ml",
    "lb",
    "oz",
    "pc/s",
    "box",
    "bag",
    "bottle",
    "packet",
    "bundle",
    "set",
    "roll",
  ];

  useEffect(() => {
    fetchInventory();
  }, []);

  useEffect(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    setFilteredInventory(inventory.slice(startIdx, endIdx));
  }, [currentPage, itemsPerPage, inventory]);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // Reset to the first page when items per page change
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage * itemsPerPage < inventory.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const fetchInventory = async () => {
    try {
      const response = await apiClient.get("/inventory", {
        withCredentials: true,
      });
      setInventory(response.data);
      setFilteredInventory(response.data.slice(0, itemsPerPage)); // Initial page
    } catch (err) {
      console.error("Error fetching inventory:", err);
      if (err.response?.status === 401) {
        console.error("Unauthorized. Redirecting to login...");
        navigate("/client/login");
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      ingredientName: "",
      category: "",
      quantity: "",
      unit: "",
      cost: "",
      location: "",
      expirationDate: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Replace this with your actual submit logic (like axios)
        const response = await apiClient.post("/inventory", {
          ...values,
          withCredentials: true,
        });
        // Check if the response status is 201 (Created) or 200 (OK)

        if (response.status === 201 || response.status === 200) {
          alert("Ingredient added successfully!");
          formik.resetForm();
          closeDialog();
          fetchInventory();
        } else {
          alert("Failed to add ingredient.");
        }
      } catch (err) {
        console.error("Error submitting form:", err);
        alert("Failed to add ingredient.");
      }
    },
  });

  return (
      <ClientLayout>
        <div className="flex flex-col h-screen px-4 py-4">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-900 dark:border-neutral-700">
                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                  {/*search field here*/}

                  <div className="sm:col-span-2 md:grow">
                    <div className="flex justify-end gap-x-2">
                      <div className=" [--placement:bottom-right] relative inline-block">
                        <button
                          type="button"
                          onClick={() => openDialog("addInventory")}
                          className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                        >
                          <Plus className="shrink-0 size-3.5" />
                          Add new
                        </button>
                        <DialogComponent id="addInventory">
                          <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-800">
                            <h3 className="font-bold text-gray-800 dark:text-neutral-200">
                              Insert new item
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
                          <form onSubmit={formik.handleSubmit}>
                            <div className="p-4 overflow-y-auto">
                              <div className="sm:divide-y divide-gray-200 dark:divide-neutral-700">
                                <div className="max-w-lg space-y-3">
                                  <div>
                                    <label
                                      htmlFor="ingredientName"
                                      className="block text-sm font-medium mb-2 dark:text-white"
                                    >
                                      Product Name
                                    </label>
                                    <div className="relative">
                                      <input
                                        type="text"
                                        id="ingredientName"
                                        name="ingredientName"
                                        className="py-3 px-4 ps-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                        placeholder="e.g. Sugar"
                                        value={formik.values.ingredientName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                      />
                                      <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                                        <PackageSearch className="shrink-0 size-4 text-gray-400 dark:text-neutral-600" />
                                      </div>
                                    </div>
                                  </div>
                                  {formik.touched.ingredientName &&
                                    formik.errors.ingredientName && (
                                      <div className="text-sm text-red-500">
                                        {formik.errors.ingredientName}
                                      </div>
                                    )}

                                  <div>
                                    <label
                                      htmlFor="category"
                                      className="block text-sm font-medium mb-2 dark:text-white"
                                    >
                                      Category
                                    </label>
                                    <div className="relative">
                                      <input
                                        type="text"
                                        id="category"
                                        name="category"
                                        className="py-3 px-4 ps-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                        placeholder="e.g. Raw Ingredients"
                                        value={formik.values.category}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                      />
                                      <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                                        <PackageSearch className="shrink-0 size-4 text-gray-400 dark:text-neutral-600" />
                                      </div>
                                    </div>
                                  </div>
                                  {formik.touched.category &&
                                    formik.errors.category && (
                                      <div className="text-sm text-red-500">
                                        {formik.errors.category}
                                      </div>
                                    )}

                                  <div>
                                    <label
                                      htmlFor="quantity"
                                      className="block text-sm font-medium mb-2 dark:text-white"
                                    >
                                      Quantity
                                    </label>
                                    <div className="relative">
                                      <input
                                        type="text"
                                        id="quantity"
                                        name="quantity"
                                        className="py-3 px-4 ps-9 pe-20 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                        placeholder="e.g. 100"
                                        value={formik.values.quantity}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                      />
                                      <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                                        <span className="text-gray-500 dark:text-neutral-500">
                                          <Asterisk className="shrink-0 size-4 text-gray-400 dark:text-neutral-600" />
                                        </span>
                                      </div>
                                      <div className="absolute inset-y-0 end-0 flex items-center text-gray-500 pe-px">
                                        <label
                                          htmlFor="unit"
                                          className="sr-only"
                                        >
                                          Unit
                                        </label>
                                        <select
                                          id="unit"
                                          name="unit"
                                          value={formik.values.unit}
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          className="block w-full border-transparent rounded-lg focus:ring-blue-600 focus:border-blue-600 dark:text-neutral-500 dark:bg-neutral-800"
                                        >
                                          {unit_option.map((unit) => (
                                            <option key={unit} value={unit}>
                                              {unit}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  {formik.touched.quantity &&
                                    formik.errors.quantity && (
                                      <div className="text-sm text-red-500">
                                        {formik.errors.quantity}
                                      </div>
                                    )}
                                  {formik.touched.unit &&
                                    formik.errors.unit && (
                                      <div className="text-sm text-red-500">
                                        {formik.errors.unit}
                                      </div>
                                    )}

                                  <div>
                                    <label
                                      htmlFor="cost"
                                      className="block text-sm font-medium mb-2 dark:text-white"
                                    >
                                      Cost
                                    </label>
                                    <div className="relative">
                                      <input
                                        type="text"
                                        id="cost"
                                        name="cost"
                                        className="py-3 px-4 ps-9 pe-16 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                        placeholder="0.00"
                                        value={formik.values.cost}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
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
                                  </div>
                                  {formik.touched.cost &&
                                    formik.errors.cost && (
                                      <div className="text-sm text-red-500">
                                        {formik.errors.cost}
                                      </div>
                                    )}

                                  <div>
                                    <label
                                      htmlFor="location"
                                      className="block text-sm font-medium mb-2 dark:text-white"
                                    >
                                      Location
                                    </label>
                                    <div className="relative">
                                      <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        className="py-3 px-4 ps-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                        placeholder="e.g. Shelf"
                                        value={formik.values.location}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                      />
                                      <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                                        <Warehouse className="shrink-0 size-4 text-gray-400 dark:text-neutral-600" />
                                      </div>
                                    </div>
                                  </div>
                                  {formik.touched.location &&
                                    formik.errors.location && (
                                      <div className="text-sm text-red-500">
                                        {formik.errors.location}
                                      </div>
                                    )}

                                  <div>
                                    <label
                                      htmlFor="expirationDate"
                                      className="block text-sm font-medium mb-2 dark:text-white"
                                    >
                                      Exp. Date
                                    </label>
                                    <div className="relative">
                                      <input
                                        type="date"
                                        id="expirationDate"
                                        name="expirationDate"
                                        className="py-3 px-4 ps-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                        placeholder="--/--/----"
                                        value={formik.values.expirationDate}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                      />
                                      <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                                        <CalendarX className="shrink-0 size-4 text-gray-400 dark:text-neutral-600" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-800">
                              <button
                                type="button"
                                onClick={closeDialog}
                                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                              >
                                Insert item
                              </button>
                            </div>
                          </form>
                        </DialogComponent>
                      </div>
                    </div>
                  </div>
                </div>

                <table className="min-w-full max-h-screen overflow-auto divide-y divide-gray-200 dark:divide-neutral-700">
                  <thead className="bg-gray-50 dark:bg-neutral-800">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                            Product
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                            Category
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                            Quantity
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                            Cost
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                            Location
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                            Batch #
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                            Exp. Date
                          </span>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                            Status
                          </span>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3 text-end"></th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                    {filteredInventory.length > 0 ? (
                      filteredInventory.map((item, index) => (
                        <tr
                          key={index}
                          className="bg-white hover:bg-gray-50 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                        >
                          <td className="size-px whitespace-nowrap ">
                            <a className="block p-6" href="#">
                              <div className="flex items-center gap-x-4">
                                {/*do not remove*/}
                                <img
                                  className="hidden shrink-0 size-[38px] rounded-lg"
                                  src="https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=320&q=80"
                                  alt="Product Image"
                                />
                                <div>
                                  <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">
                                    {item.ingredient_name}
                                  </span>
                                </div>
                              </div>
                            </a>
                          </td>
                          <td className="size-px whitespace-nowrap ">
                            <a className="block p-6" href="#">
                              <div className="flex items-center gap-x-3">
                                <div className="grow">
                                  <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">
                                    {item.category}
                                  </span>
                                </div>
                              </div>
                            </a>
                          </td>

                          <td className="size-px whitespace-nowrap ">
                            <a className="block p-6" href="#">
                              <div className="flex items-center gap-x-3">
                                <div className="grow">
                                  <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">
                                    {item.quantity}
                                    {item.unit}
                                  </span>
                                </div>
                              </div>
                            </a>
                          </td>
                          <td className="size-px whitespace-nowrap ">
                            <a className="block p-6" href="#">
                              <div className="flex items-center gap-x-3">
                                <div className="grow">
                                  <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">
                                    PHP {item.cost}
                                  </span>
                                </div>
                              </div>
                            </a>
                          </td>
                          <td className="size-px whitespace-nowrap ">
                            <a className="block p-6" href="#">
                              <div className="flex items-center gap-x-3">
                                <div className="grow">
                                  <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">
                                    {item.location}
                                  </span>
                                </div>
                              </div>
                            </a>
                          </td>
                          <td className="size-px whitespace-nowrap ">
                            <a className="block p-6" href="#">
                              <div className="flex items-center gap-x-3">
                                <div className="grow">
                                  <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">
                                    {item.batch_number}
                                  </span>
                                </div>
                              </div>
                            </a>
                          </td>
                          <td className="size-px whitespace-nowrap ">
                            <a className="block p-6" href="#">
                              <div className="flex items-center gap-x-3">
                                <div className="grow">
                                  <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">
                                    {new Date(
                                      item.expiration_date
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </a>
                          </td>

                          <td className="size-px whitespace-nowrap ">
                            <a className="block p-6" href="#">
                              <InventoryStatus name={item.inventory_name} description={item.inventory_status} />
                            </a>
                          </td>
                          <td className="size-px whitespace-nowrap">
                            <div className="px-6 py-1.5">
                              <div className="hs-dropdown [--placement:bottom-right] relative inline-block">
                                <button
                                  type="button"
                                  className="hs-dropdown-toggle py-1.5 px-2 inline-flex justify-center items-center gap-2 rounded-lg text-gray-700 align-middle disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:text-neutral-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                                >
                                  <svg
                                    className="shrink-0 size-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <circle cx="12" cy="12" r="1" />
                                    <circle cx="19" cy="12" r="1" />
                                    <circle cx="5" cy="12" r="1" />
                                  </svg>
                                </button>
                                <div className=" transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden divide-y divide-gray-200 min-w-40 z-10 bg-white shadow-2xl rounded-lg p-2 mt-2 dark:divide-neutral-700 dark:bg-neutral-800 dark:border dark:border-neutral-700">
                                  <div className="py-2 first:pt-0 last:pb-0">
                                    <a
                                      className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
                                      href="#"
                                    >
                                      Rename
                                    </a>
                                    <a
                                      className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
                                      href="#"
                                    >
                                      Regenrate Key
                                    </a>
                                    <a
                                      className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
                                      href="#"
                                    >
                                      Disable
                                    </a>
                                  </div>
                                  <div className="py-2 first:pt-0 last:pb-0">
                                    <a
                                      className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-red-600 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-red-500 dark:hover:bg-neutral-700"
                                      href="#"
                                    >
                                      Delete
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-neutral-200">
                          No inventory items available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-neutral-700">
                  <div className="max-w-sm space-y-3">
                    <select
                      value={itemsPerPage}
                      onChange={handleItemsPerPageChange}
                      className="py-2 px-3 pe-9 block border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400"
                    >
                      {[1, 2, 15, 20].map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <div className="inline-flex gap-x-2">
                      <button
                        type="button"
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      >
                        <svg
                          className="shrink-0 size-4"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m15 18-6-6 6-6" />
                        </svg>
                        Prev
                      </button>

                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={
                          currentPage * itemsPerPage >= inventory.length
                        }
                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      >
                        Next
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ClientLayout>
  );
};

export default Inventory;
