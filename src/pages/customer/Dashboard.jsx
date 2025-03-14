import CustomerLayout from "../../layouts/customer/CustomerLayout";
import Carousel from "../../components/Carousel";
import { ChevronRight, Plus, Minus, Trash2 } from "lucide-react";

const CustomerDashboard = () => {
  const slides = [
    { content: "Welcome to the Dashboard", bgColor: "#bfdbfe" }, // Light blue
    { content: "Explore our Features", bgColor: "#bbf7d0" }, // Light green
    { content: "Enjoy Your Experience", bgColor: "#fecaca" }, // Light red
  ];

  return (
    <CustomerLayout>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Carousel */}
          <div className="p-4">
            <Carousel slides={slides} autoPlay={true} interval={4000} />
          </div>

          {/* Categories Section */}
          <div className="border border-gray-100 p-6 rounded-md bg-white shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Category</h2>
              <a
                href="#"
                className="flex items-center text-sm font-medium text-blue-600 hover:underline"
              >
                See all <ChevronRight className="ml-1" />
              </a>
            </div>

            <div className="flex space-x-4 overflow-auto">
              <button className="py-3 px-4 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200">
                Tab 1
              </button>
              <button className="py-3 px-4 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200">
                Tab 2
              </button>
              <button className="py-3 px-4 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200">
                Tab 3
              </button>
            </div>

            {/* Product Cards */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(4)].map((_, idx) => (
                <div
                  key={idx}
                  className="rounded-lg shadow-lg p-4 bg-white hover:scale-105 transform transition duration-150"
                >
                  <div className="mx-auto px-3">
                    <img
                      src="https://www.cuisinefiend.com/recipeimages/filipino%20beef%20tapa/beef-tapa-1.jpg"
                      alt="Product"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="font-bold text-gray-800">Sinampalukan</h3>
                    <p className="text-sm text-gray-500">₱250</p>
                  </div>
                  <button className="w-full mt-3 py-2 bg-yellow-400 text-black font-bold text-sm rounded-lg">
                    Order
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
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
                <button className="text-red-600">
                  <Trash2 className="size-4 shrink-0" />
                </button>
              </div>

              <div className="grid grid-flow-col md:grid-flow-row gap-x-4">
                <div className="mt-5  gap-5 min-h-56 max-h-56 bg-white shadow-inner overflow-auto">
                  <ul>
                    {/*order.map((item, index) => (*/}
                    <div
                      //key={index}
                      className="block border border-gray-200 rounded-lg hover:shadow-sm focus:outline-none dark:border-neutral-700 my-2"
                    >
                      <div className="relative flex items-center overflow-hidden ">
                        <img
                          className="w-14 h-full absolute inset-0 object-cover rounded-s-lg"
                          src="https://images.unsplash.com/photo-1661956600655-e772b2b97db4?q=80&w=560&auto=format&fit=crop&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt="Blog Image"
                        />

                        <div className="grow px-4 py-2 ml-12 sm:ml-16 flex flex-row justify-between items-center ">
                          <div className=" flex flex-col justify-center">
                            <h3 className="font-semibold text-xs text-gray-800 dark:text-neutral-300">
                              {/*item.menu_item_name*/}
                            </h3>
                            <p className="mt-1 text-xs text-gray-500 dark:text-neutral-500">
                              {/*item.quantity} x ₱{item.price*/}
                            </p>
                          </div>
                          <div>
                            <button className="text-red-600">
                              <Trash2 className=" shrink-0 size-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*))}*/}
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
                          <span>₱1000</span>
                        </div>
                      </li>
                      <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:border-neutral-700 dark:text-neutral-200">
                        <div className="flex items-center justify-between w-full">
                          <span>Tax (10%)</span>
                          <span>₱230</span>
                        </div>
                      </li>
                      <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-semibold bg-gray-50 border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
                        <div className="flex items-center justify-between w-full">
                          <span>Total Amount</span>
                          <span>₱1230</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-5 flex justify-end gap-x-2">
                    <button className="w-full py-2 px-3 flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                      Proceed to checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
};
export default CustomerDashboard;
