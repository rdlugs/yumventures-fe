import { useState } from "react";
import StatusBadge from "../StatusBadge";
import PropTypes from "prop-types";
import {
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  Plus,
} from "lucide-react";

import useDialogStore from "../../store/useDialogStore";
import { Menu } from "@headlessui/react";
import {
  fetchBusinesses,
  generateLink,
  updateBusinessStatus,
} from "../../services/businessApi";

const DisplayBusiness = ({
  businesses,
  setBusinesses,
  setGeneratedLink,
  setLinkGenerated,
  generatedLink,
  linkGenerated,
}) => {
  const { openDialog, closeDialog } = useDialogStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [displayBusiness, setDisplayBusiness] = useState("All");
  const filterBusinesses = () => {
    if (displayBusiness === "All") {
      return businesses;
    }
    return businesses.filter((business) => business.status === displayBusiness);
  };

  const indexOfLastBusiness = currentPage * itemsPerPage;
  const indexOfFirstBusiness = indexOfLastBusiness - itemsPerPage;
  const currentBusinesses = filterBusinesses().slice(
    indexOfFirstBusiness,
    indexOfLastBusiness
  );

  const handleUpdateBusinessStatus = async (businessId, status) => {
    const response = await updateBusinessStatus(businessId, status);
    if (response.success) {
      alert(response.message);
      const businessesData = await fetchBusinesses();
      setBusinesses(businessesData);

      // Close the dialog only if the response was successful
      closeDialog();
    } else {
      alert(`Error: ${response.message}`);
    }
  };

  const handleGenerateLink = async (businessId) => {
    const response = await generateLink(businessId);
    if (response.success) {
      setGeneratedLink(response.link);
      setLinkGenerated(true);
      console.log(linkGenerated);
    }
  };

  const handleCopyLink = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      alert("Link copied to clipboard.");
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-full px-4 py-10 sm:px-6 lg:px-4 lg:py-4 mx-auto">
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
              <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                <div>
                  <div className="border-b border-gray-200 dark:border-neutral-700">
                    <nav className="flex gap-x-1">
                      <button
                        type="button"
                        onClick={() => setDisplayBusiness("All")}
                        className={`${
                          displayBusiness === "All"
                            ? "font-semibold border-blue-600 text-blue-600"
                            : "text-gray-500"
                        } py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap hover:text-blue-600 focus:outline-none`}
                      >
                        All
                      </button>
                      <button
                        type="button"
                        onClick={() => setDisplayBusiness("verified")}
                        className={`${
                          displayBusiness === "verified"
                            ? "font-semibold border-blue-600 text-blue-600"
                            : "text-gray-500"
                        } py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap hover:text-blue-600 focus:outline-none`}
                      >
                        Verified
                      </button>
                      <button
                        type="button"
                        onClick={() => setDisplayBusiness("pending")}
                        className={`${
                          displayBusiness === "pending"
                            ? "font-semibold border-blue-600 text-blue-600"
                            : "text-gray-500"
                        } py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap hover:text-blue-600 focus:outline-none`}
                      >
                        Pending
                      </button>
                    </nav>
                  </div>
                </div>

                <div>
                  <div className="inline-flex gap-x-2">
                    <button
                      onClick={() => openDialog("addBusiness")}
                      className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      <Plus className="shrink-0 size-4" />
                      Add business
                    </button>
                  </div>
                </div>
              </div>

              <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                <thead className="bg-gray-50 dark:bg-neutral-800">
                  <tr>
                    <th scope="col" className="ps-6 py-3 text-start">
                      <label htmlFor="spacer" className="flex"></label>
                    </th>
                    <th
                      scope="col"
                      className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3 text-start"
                    >
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                          Business
                        </span>
                      </div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-start">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                          Contact Information
                        </span>
                      </div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-start">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                          Address
                        </span>
                      </div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-start">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                          Details
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
                  {currentBusinesses.length > 0 ? (
                    currentBusinesses.map((business, index) => (
                      <tr key={index}>
                        <td className="size-px whitespace-nowrap">
                          <div className="ps-6 py-3">
                            <label htmlFor="spacer" className="flex"></label>
                          </div>
                        </td>
                        <td className="size-px whitespace-nowrap">
                          <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                            <div className="flex items-center gap-x-3">
                              <div className="grow">
                                <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">
                                  {business.name}
                                </span>
                                <span className="block text-sm text-gray-500 dark:text-neutral-500">
                                  {business.registration_number}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="h-px w-72 whitespace-nowrap">
                          <div className="px-6 py-3">
                            <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">
                              {business.representative}
                            </span>
                            <span className="block text-sm text-gray-500 dark:text-neutral-500">
                              {business.email}
                            </span>
                          </div>
                        </td>
                        <td className="h-px w-72 whitespace-nowrap">
                          <div className="px-6 py-3">
                            <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200 capitalize">
                              {business.address}
                            </span>
                            <span className="block text-sm text-gray-500 dark:text-neutral-500">
                              {business.contact}
                            </span>
                          </div>
                        </td>

                        <td className="size-px whitespace-nowrap">
                          <div className="px-6 py-3">
                            <span className="text-sm text-gray-500 dark:text-neutral-500">
                              {business.details || "No details provided."}
                            </span>
                          </div>
                        </td>
                        <td className="size-px whitespace-nowrap">
                          <div className="px-6 py-3">
                            <StatusBadge status={business.status} />
                          </div>
                        </td>

                        <td className="size-px whitespace-nowrap">
                          <div className="px-6 py-1.5">
                            <Menu
                              as="div"
                              className="relative inline-block text-left"
                            >
                              <Menu.Button className="px-1 py-1 border border-gray-300 rounded-md bg-white shadow-sm hover:bg-gray-100">
                                <EllipsisVertical className="shrink size-4" />
                              </Menu.Button>
                              <Menu.Items className="absolute right-0 z-50 mt-2 w-40 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="px-2 py-1">
                                  {business.status === "pending" && (
                                    <Menu.Item>
                                      <button
                                        onClick={() =>
                                          handleUpdateBusinessStatus(
                                            business.id,
                                            "verified"
                                          )
                                        }
                                        className={` bg-gray-100 group flex w-full items-center px-4 py-2 text-sm `}
                                      >
                                        Approve
                                      </button>
                                    </Menu.Item>
                                  )}
                                  {business.status === "verified" && (
                                    <Menu.Item>
                                      <button
                                        onClick={() =>
                                          handleGenerateLink(business.id)
                                        }
                                        className={`bg-gray-100 group flex w-full items-center px-4 py-2 text-sm `}
                                      >
                                        Generate Link
                                      </button>
                                    </Menu.Item>
                                  )}
                                  {linkGenerated && (
                                    <button
                                      onClick={() => handleCopyLink()}
                                      className={`bg-gray-100  group flex w-full items-center px-4 py-2 text-sm `}
                                    >
                                      Copy Link
                                    </button>
                                  )}
                                </div>
                              </Menu.Items>
                            </Menu>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-2 px-4 text-center">
                        No businesses found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-neutral-700">
                <div>
                  <p className="text-sm text-gray-600 dark:text-neutral-400">
                    <span className="font-semibold text-gray-800 dark:text-neutral-200">
                      {filterBusinesses().length}
                    </span>{" "}
                    results
                  </p>
                </div>

                <div>
                  <div className="inline-flex gap-x-2">
                    <button
                      type="button"
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                    >
                      <ChevronLeft className="shrink-0 size-4" />
                      Prev
                    </button>

                    <button
                      type="button"
                      onClick={() => paginate(currentPage + 1)}
                      disabled={
                        currentPage * itemsPerPage >= filterBusinesses().length
                      }
                      className="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
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
  );
};

DisplayBusiness.propTypes = {
  businesses: PropTypes.array.isRequired,
  setBusinesses: PropTypes.func.isRequired,
  setLinkGenerated: PropTypes.bool.value,
  setGeneratedLink: PropTypes.string,
  linkGenerated: PropTypes.bool,
  generatedLink: PropTypes.string,
};

export default DisplayBusiness;
