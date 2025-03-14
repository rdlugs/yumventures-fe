import { useState, useEffect } from "react";
import axios from "axios";
import ClientLayout from "../../layouts/client/ClientLayout";
import {
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  LayoutList,
  Plus,
  PlusIcon,
  Search,
  Trash2,
} from "lucide-react";

import useDialogStore from "../../store/useDialogStore";
import AddMenu from "../../dialogform/AddMenu";
import { useNavigate } from "react-router-dom";

const ClientMenu = () => {
  const { openDialog } = useDialogStore();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState(""); // For new category
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/menu/categories",
        { withCredentials: true }
      );
      setCategories(response.data.categories || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
      if (err.response?.status === 401) {
        console.error("Unauthorized. Redirecting to login...");
        navigate("/client/login");
      }
    }
  };

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get("http://localhost:3000/menu", {
        withCredentials: true,
      });
      setMenuItems(response.data || []);
    } catch (err) {
      console.error("Error fetching menu items:", err);
    }
  };

  const fetchInventory = async () => {
    try {
      const response = await axios.get("http://localhost:3000/inventory", {
        withCredentials: true,
      });
      setInventory(response.data || []);
      console.log(response.data);
    } catch (err) {
      console.error("Error fetching inventory:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchMenuItems();
    fetchInventory();
  }, []);

  const filteredMenuItems =
    filter === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === filter);

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/menu/category",
        { name: newCategoryName },
        { withCredentials: true }
      );
      fetchCategories();
      setNewCategoryName("");
      alert("Category created successfully!", response.statusCode);
    } catch (err) {
      console.error("Error creating category:", err);
    }
  };

  const handleCategoryDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/menu/category/${id}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        alert("Category deleted successfully!");
        fetchCategories(); // Refresh the category list after deletion
      } else {
        alert("Failed to delete the category.");
      }
    } catch (err) {
      console.error("Error deleting category:", err);
      alert("An error occurred while deleting the category.");
    }
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredMenuItems.length / itemsPerPage);

  // Calculate items to display
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredMenuItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Handlers for navigation
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <ClientLayout>
      <div>
        <div className="w-full h-screen grid grid-cols-4 gap-x-2">
          <ul className="max-w-full flex flex-col col-span-1">
            <li className="inline-flex items-center  text-sm font-medium bg-white border border-gray-200 text-gray-800 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white rounded-t-lg">
              <form className="w-full" onSubmit={handleCategorySubmit}>
                <div className="flex w-full">
                  <div className="relative flex-grow">
                    <input
                      type="text"
                      id="category-input"
                      name="category-input"
                      className="py-3 px-4 ps-11 block w-full border-gray-200 shadow-sm rounded-tl-lg  text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="Add a new category"
                    />
                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                      <LayoutList className="shrink-0 size-4 text-gray-400 dark:text-neutral-500" />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm rounded-tr-lg font-medium border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    onClick={handleCategorySubmit}
                  >
                    <PlusIcon className="shrink-0 size-4" />
                  </button>
                </div>
              </form>
            </li>
            {categories.map((category, index) => (
              <li
                key={index}
                className="inline-flex  justify-between items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-neutral-900 dark:border-neutral-700 dark:text-white"
              >
                {category.name}{" "}
                <button
                  onClick={() => handleCategoryDelete(category.category_id)}
                  type="button"
                  className="flex justify-center items-center size-auto  text-sm font-medium rounded-lg border border-gray-200 bg-white text-red-600 shadow-md hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                >
                  <Trash2 className="shrink-0 size-4" />
                </button>
              </li>
            ))}
          </ul>
          <div className="flex flex-col  max-w-full col-span-3">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="border rounded-lg divide-y bg-white divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">
                  <div className="py-3 px-4 flex w-full justify-between">
                    <div>
                      <div className="relative max-w-xs">
                        <label className="sr-only">Search</label>
                        <input
                          type="text"
                          name="search-filter"
                          id="search-filter"
                          className="py-2 px-3 ps-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                          placeholder="Search for menu item"
                          disabled={true}
                        />
                        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
                          <Search className="size-4 text-gray-400 dark:text-neutral-500" />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-x-2">
                      <button
                        type="button"
                        onClick={() => openDialog("addMenu")}
                        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      >
                        <Plus className="shrink-0 size-4" />
                        Add menu
                      </button>
                    </div>
                  </div>
                  <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                      <thead className="bg-gray-50 dark:bg-neutral-700">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                          >
                            Category
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                          >
                            Price
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                          ></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                        {menuItems.map((item, index) => (
                          <tr key={index}>
                            <td className="flex gap-x-2 items-center px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                              <img
                                className="shrink-0 size-[38px] rounded-lg"
                                src={`http://localhost:3000${item.image.replace(
                                  "C:\\Users\\Lenovo\\Downloads\\capstone\\yumventures\\backend",
                                  ""
                                )}`}
                                alt="Product Image"
                              />
                              <div>
                                <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">
                                  {item.menu_item_name}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                              <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-md text-xs font-medium border border-gray-200 bg-gray-200 text-gray-800 shadow-sm dark:bg-neutral-900 dark:border-neutral-700 dark:text-white">
                                {item.category_name}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                              ₱{item.price}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                              <button
                                id="dropdown-menu"
                                type="button"
                                className="hs-dropdown-toggle py-1.5 px-2 inline-flex justify-center items-center gap-2 rounded-lg text-gray-700 align-middle disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:text-neutral-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                              >
                                <EllipsisVertical className="shrink-0 size-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-neutral-700">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-neutral-400">
                          Showing{" "}
                          <span className="font-semibold text-gray-800 dark:text-neutral-200">
                            {startIndex + 1} -{" "}
                            {Math.min(
                              startIndex + itemsPerPage,
                              filteredMenuItems.length
                            )}
                          </span>{" "}
                          of{" "}
                          <span className="font-semibold text-gray-800 dark:text-neutral-200">
                            {filteredMenuItems.length}
                          </span>{" "}
                          results
                        </p>
                      </div>

                      <div>
                        <div className="inline-flex gap-x-2">
                          <button
                            type="button"
                            onClick={handlePrev}
                            disabled={currentPage === 1}
                            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                          >
                            <ChevronLeft className="shrink-0 size-4" />
                            Prev
                          </button>

                          <button
                            type="button"
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                          >
                            Next
                            <ChevronRight className="shrink-0 size-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AddMenu
          inventory={inventory}
          categories={categories}
          fetchMenuItems={fetchMenuItems}
        />
      </div>
    </ClientLayout>
  );
};

export default ClientMenu;
