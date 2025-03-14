import {
  Banknote,
  MessageSquareHeart,
  PackagePlus,
  Receipt,
} from "lucide-react";
import ClientLayout from "../../layouts/client/ClientLayout";
import { useState, useEffect } from "react";
import axios from "axios";

const ClientDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalSalesToday: 0,
    averageOrderValue: 0,
    topSellingItem: "Loading...",
    latestAddedItem: "Loading...",
    transactions: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/dashboard", {
          withCredentials: true, // Include cookies in the request
        });

        const data = response.data;
        setDashboardData({
          totalSalesToday: parseFloat(data.totalSalesToday),
          averageOrderValue: parseFloat(data.averageOrderValue),
          topSellingItem: data.topSellingItem,
          latestAddedItem: data.latestAddedItem,
          transactions: data.transactions,
        });
        console.log("Dashboard data", dashboardData);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <ClientLayout>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-2 mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-800">
            <div className="p-4 md:p-5 flex gap-x-4">
              <div className="shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg dark:bg-neutral-800">
                <Banknote className="shrink-0 size-5 text-gray-600 dark:text-neutral-400" />
              </div>

              <div className="grow">
                <div className="flex items-center gap-x-2">
                  <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                    Total sales today
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-x-2">
                  <h3 className="text-xl font-medium text-gray-800 dark:text-neutral-200">
                    ₱{dashboardData.totalSalesToday || " N/A"}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-800">
            <div className="p-4 md:p-5 flex gap-x-4">
              <div className="shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg dark:bg-neutral-800">
                <Receipt className="shrink-0 size-5 text-gray-600 dark:text-neutral-400" />
              </div>

              <div className="grow">
                <div className="flex items-center gap-x-2">
                  <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                    Average order value
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-x-2">
                  <h3 className="text-xl font-medium text-gray-800 dark:text-neutral-200">
                    ₱{dashboardData.averageOrderValue}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-800">
            <div className="p-4 md:p-5 flex gap-x-4">
              <div className="shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg dark:bg-neutral-800">
                <MessageSquareHeart className="shrink-0 size-5 text-gray-600 dark:text-neutral-400" />
              </div>

              <div className="grow">
                <div className="flex items-center gap-x-2">
                  <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                    Top selling item
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-x-2">
                  <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
                    {dashboardData.topSellingItem}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-800">
            <div className="p-4 md:p-5 flex gap-x-4">
              <div className="shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg dark:bg-neutral-800">
                <PackagePlus className="shrink-0 size-5 text-gray-600 dark:text-neutral-400" />
              </div>

              <div className="grow">
                <div className="flex items-center gap-x-2">
                  <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                    Latest added item
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-x-2">
                  <h3 className="text-xl font-medium text-gray-800 dark:text-neutral-200">
                    {dashboardData.latestAddedItem}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-2 mx-auto">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-900 dark:border-neutral-700">
                <div className="px-6 py-2 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                  <div className="sm:col-span-1">
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="search"
                        name="search"
                        className="py-2 px-3 ps-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        placeholder="Search"
                        disabled
                      />
                      <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4">
                        <svg
                          className="size-4 text-gray-400 dark:text-neutral-500"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                  <thead className="bg-gray-50 dark:bg-neutral-800">
                    <tr>
                      <th scope="col" className="ps-6 py-3 text-start"></th>

                      <th scope="col" className="pe-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                            Order
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                            Date
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                            Customer
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-start">
                        <div className="flex items-center gap-x-2">
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                            Payment Status
                          </span>
                        </div>
                      </th>

                      <th scope="col" className="px-6 py-3 text-end"></th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                    <tr>
                      <td className="size-px whitespace-nowrap"></td>
                      <td className="size-px whitespace-nowrap">
                        <div className="pe-6 py-2">
                          <a
                            className="text-sm text-blue-600 decoration-2 hover:underline dark:text-blue-500"
                            href="#"
                          >
                            #35463
                          </a>
                        </div>
                      </td>
                      <td className="size-px whitespace-nowrap">
                        <div className="px-6 py-2">
                          <span className="text-sm text-gray-600 dark:text-neutral-400">
                            Aug 17, 2020, 5:48 (ET)
                          </span>
                        </div>
                      </td>
                      <td className="size-px whitespace-nowrap">
                        <div className="px-6 py-2">
                          <span className="text-sm text-gray-600 dark:text-neutral-400">
                            Jase Marley
                          </span>
                        </div>
                      </td>
                      <td className="size-px whitespace-nowrap">
                        <div className="px-6 py-2">
                          <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                            <svg
                              className="size-2.5"
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                            </svg>
                            Paid
                          </span>
                        </div>
                      </td>
                      <td className="size-px whitespace-nowrap">
                        <div className="px-6 py-2">
                          <span className="text-sm text-gray-600 dark:text-neutral-400">
                            Jase Marley
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-neutral-700">
                  <div className="max-w-sm space-y-3">
                    <select
                      disabled
                      className="py-2 px-3 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400"
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option selected>9</option>
                      <option>20</option>
                    </select>
                  </div>

                  <div>
                    <div className="inline-flex gap-x-2">
                      <button
                        type="button"
                        disabled
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
                        disabled
                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      >
                        Next
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
      </div>
    </ClientLayout>
  );
};

export default ClientDashboard;
