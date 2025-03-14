import { useState, useEffect } from "react";
import axios from "axios";
import ClientLayout from "../../layouts/client/ClientLayout";
import { Minus, Plus, Trash2 } from "lucide-react";
import useDialogStore from "../../store/useDialogStore";
import Checkout from "../../dialogform/Checkout";
import { useNavigate } from "react-router-dom";
const PointOfSale = () => {
  const [categories, setCategories] = useState([]); // To hold categories
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]); // To hold menu items
  const [selectedCategory, setSelectedCategory] = useState("all"); // Default is 'all'
  const [order, setOrder] = useState([]); // To hold selected menu items and quantities

  const [amountPaid, setAmountPaid] = useState(0); // Track the amount paid

  const { openDialog } = useDialogStore();

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/menu/categories",
        {
          withCredentials: true, // Automatically send cookies with the request
        }
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
        withCredentials: true, // Automatically send cookies with the request
      });
      setMenuItems(response.data || []);
    } catch (err) {
      console.error("Error fetching menu items:", err);
    }
  };

  // Fetch categories and menu items when authToken changes
  useEffect(() => {
    fetchCategories();
    fetchMenuItems();
  }, []); // Re-run this effect when the component mounts

  const filteredMenuItems =
    selectedCategory === "all"
      ? menuItems
      : menuItems.filter(
          (item) =>
            item.category_name.toLowerCase() === selectedCategory.toLowerCase()
        );

  // Handle adding menu item to the order
  const addToOrder = (item) => {
    setOrder((prevOrder) => {
      const existingItem = prevOrder.find(
        (orderItem) => orderItem.menu_item_id === item.menu_item_id
      );
      if (existingItem) {
        return prevOrder.map((orderItem) =>
          orderItem.menu_item_id === item.menu_item_id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        );
      } else {
        return [...prevOrder, { ...item, quantity: 1 }];
      }
    });
  };

  const reduceOrderQuantity = (item) => {
    setOrder((prevOrder) => {
      return prevOrder
        .map((orderItem) =>
          orderItem.menu_item_id === item.menu_item_id
            ? { ...orderItem, quantity: orderItem.quantity - 1 }
            : orderItem
        )
        .filter((orderItem) => orderItem.quantity > 0); // Remove items with quantity <= 0
    });
  };

  // Handle removing item from the order
  const removeFromOrder = (itemId) => {
    setOrder((prevOrder) =>
      prevOrder.filter((item) => item.menu_item_id !== itemId)
    );
  };

  // Calculate the subtotal
  const calculateSubtotal = () => {
    return order
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // Calculate the total amount due
  const calculateTotal = () => {
    return (
      parseFloat(calculateSubtotal()) + parseFloat(calculateTax())
    ).toFixed(2);
  };

  // Calculate change (if amount paid is greater than total)
  const calculateChange = () => {
    const total = parseFloat(calculateTotal());
    if (amountPaid >= total) {
      return (amountPaid - total).toFixed(2);
    }
    return 0;
  };

  const handleProceedToCheckout = () => {
    openDialog("checkout", {
      order,
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      total: calculateTotal(),
      amountPaid,
      change: calculateChange(),
    });
  };

  const handleClearCart = () => {
    setOrder([]);
    setAmountPaid(0);
  };

  const calculateTax = () => {
    return (parseFloat(calculateSubtotal()) * 0.1).toFixed(2);
  };

  return (
    <ClientLayout>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3">
          {/* Categories (Display category buttons) */}
          <div className="flex flex-row justify-start overflow-x-auto items-center bg-gray-100  rounded-lg transition p-1 dark:bg-neutral-700 dark:hover:bg-neutral-600">
            {categories.length > 0 && (
              <button
                className={`py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg  focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 ${
                  selectedCategory === "all"
                    ? "bg-white text-blue-600 border border-gray-200  shadow-md hover:bg-gray-50"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setSelectedCategory("all")}
              >
                All
              </button>
            )}
            {categories.map((category) => (
              <button
                className={`py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg  focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 ${
                  selectedCategory === category.name.toLowerCase()
                    ? "bg-white text-blue-600 border border-gray-200  shadow-md hover:bg-gray-50"
                    : "text-gray-500 hover:text-gray-700 bg-none"
                }`}
                key={category.category_id}
                onClick={() => setSelectedCategory(category.name.toLowerCase())}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Menu Items as Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
            {filteredMenuItems.map((item) => (
              <div
                key={item.menu_item_id}
                className="max-w-xs flex flex-col bg-white border border-t-4 border-t-blue-600 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:border-t-blue-500 dark:shadow-neutral-700/70"
              >
                <div className="p-4 md:p-5">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                    {item.menu_item_name}
                  </h3>

                  <div className="flex justify-between items-end">
                    <p className="mt-2 text-gray-800 dark:text-neutral-400 font-medium text-lg">
                      <span className="text-sm font-normal text-gray-600">
                        ₱&nbsp;
                      </span>
                      {item.price}
                    </p>
                    <div className="flex flex-row gap-x-2">
                      <button
                        onClick={() => reduceOrderQuantity(item)}
                        className="mt-3  inline-flex items-center gap-x-1 text-sm font-semibold py-1 px-1 rounded-md border border-transparent bg-gray-300 hover:bg-gray-400 text-gray-600 decoration-2 hover:text-white hover:underline  dark:text-blue-500 dark:hover:text-blue-600 dark:focus:text-blue-600"
                      >
                        <Minus className="shrink-0 size-4" />
                      </button>
                      <button
                        onClick={() => addToOrder(item)}
                        className="mt-3  inline-flex items-center gap-x-1 text-sm font-semibold py-1 px-1 rounded-md border border-transparent bg-blue-600 hover:bg-blue-500 text-gray-50 decoration-2 hover:text-white hover:underline  dark:text-blue-500 dark:hover:text-blue-600 dark:focus:text-blue-600"
                      >
                        <Plus className="shrink-0 size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 bg-white">
          <div className=" translate-x-0  relative top-0 end-0 transition-all duration-300 transform h-full lg:max-w-md md:max-w-full w-full z-10 bg-white border-e dark:bg-neutral-800 dark:border-neutral-700">
            <div className="p-4 sm:p-7 overflow-y-auto">
              <div className="flex flex-row justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                    Order Summary
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-neutral-500">
                    {new Date().toLocaleString()}
                  </p>
                </div>
                <button onClick={handleClearCart} className="text-red-600">
                  <Trash2 className="size-4 shrink-0" />
                </button>
              </div>

              <div className="grid grid-flow-col md:grid-flow-row gap-x-4">
                <div className="mt-5  gap-5 min-h-56 max-h-56 bg-white shadow-inner overflow-auto">
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
                            alt="Menu Image"
                          />

                          <div className="grow px-4 py-2 ml-12 sm:ml-16 flex flex-row justify-between items-center ">
                            <div className=" flex flex-col justify-center">
                              <h3 className="font-semibold text-xs text-gray-800 dark:text-neutral-300">
                                {item.menu_item_name}
                              </h3>
                              <p className="mt-1 text-xs text-gray-500 dark:text-neutral-500">
                                {item.quantity} x ₱{item.price}
                              </p>
                            </div>
                            <div>
                              <button
                                onClick={() =>
                                  removeFromOrder(item.menu_item_id)
                                }
                                className="text-red-600"
                              >
                                <Trash2 className=" shrink-0 size-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="mt-5 sm:mt-10">
                    <h4 className="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">
                      Summary
                    </h4>

                    <ul className="mt-3 flex flex-col">
                      <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:border-neutral-700 dark:text-neutral-200">
                        <div className="flex items-center justify-between w-full">
                          <span>Subtotal</span>
                          <span>₱{calculateSubtotal()}</span>
                        </div>
                      </li>
                      <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:border-neutral-700 dark:text-neutral-200">
                        <div className="flex items-center justify-between w-full">
                          <span>Tax (10%)</span>
                          <span>₱{calculateTax()}</span>
                        </div>
                      </li>
                      <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-semibold bg-gray-50 border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
                        <div className="flex items-center justify-between w-full">
                          <span>Total Amount</span>
                          <span>₱{calculateTotal()}</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-5 flex justify-end gap-x-2">
                    <button
                      onClick={handleProceedToCheckout}
                      className="w-full py-2 px-3 flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      Proceed to checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Checkout
        order={order}
        subtotal={calculateSubtotal()}
        total={calculateTotal()}
        setOrder={setOrder}
      />
    </ClientLayout>
  );
};

export default PointOfSale;
