import TableHeader from "./TableHeader";
import TableHead from "./TableHead";
import PropTypes from "prop-types";

const Table = ({ inventory }) => {
  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-900 dark:border-neutral-700">
            <TableHeader />

            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
              <TableHead
                columns={[
                  "Product",
                  "Category",
                  "Quantity",
                  "Cost",
                  "Location",
                  "Batch #",
                  "Exp. Date",
                  "Status",
                ]}
                isEmpty={true}
              />

              <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                {inventory.length > 0 ? (
                  inventory.map((item) => (
                    <tr
                      key={item.id}
                      className="bg-white hover:bg-gray-50 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                    >
                      <td className="size-px whitespace-nowrap ">
                        <a className="block p-6" href="#">
                          <div className="flex items-center gap-x-4">
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
                                Raw Ingredients
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
                                PHP 3000
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
                                Shelf
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
                                BHM-241811-F17
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
                                12/12/2024
                              </span>
                            </div>
                          </div>
                        </a>
                      </td>

                      <td className="size-px whitespace-nowrap ">
                        <a className="block p-6" href="#">
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
                            On Stock
                          </span>
                        </a>
                      </td>
                      <td className="size-px whitespace-nowrap">
                        <div className="px-6 py-1.5">
                          <div className="hs-dropdown [--placement:bottom-right] relative inline-block">
                            <button
                              id="hs-table-dropdown-6"
                              type="button"
                              className="hs-dropdown-toggle py-1.5 px-2 inline-flex justify-center items-center gap-2 rounded-lg text-gray-700 align-middle disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:text-neutral-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                              aria-haspopup="menu"
                              aria-expanded="false"
                              aria-label="Dropdown"
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
                <select className="py-2 px-3 pe-9 block border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option selected>5</option>
                  <option>6</option>
                </select>
              </div>

              <div>
                <div className="inline-flex gap-x-2">
                  <button
                    type="button"
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
  );
};

Table.propTypes = {
  inventory: PropTypes.array.isRequired,
};

export default Table;
