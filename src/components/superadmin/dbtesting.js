import { Tabs, TabsPanel } from "../Tabs";
import { useState, useEffect } from "react";
import { Menu } from "@headlessui/react";
import axios from "axios";

const DisplayBusiness = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [generatedLink, setGeneratedLink] = useState(null);
  const [linkGenerated, setLinkGenerated] = useState(false);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/superadmin/businesses",
          {
            withCredentials: true,
          }
        );

        setBusinesses(response.data.businesses); // Assuming the response contains a businesses array
      } catch (error) {
        setError(error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  const updateBusinessStatus = async (businessId, status) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/superadmin/businesses/${businessId}/status`,
        { status },
        {
          withCredentials: true,
        }
      );

      // Show an alert confirming the status update
      alert(`Status updated successfully!`, response.sucess);
    } catch (error) {
      console.error(error.message);
      alert("Failed to update business status.");
    }
  };

  const generateLink = async (businessId) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/superadmin/generate-link",
        { businessId },
        {
          withCredentials: true,
        }
      );

      setGeneratedLink(response.data.link);
      setLinkGenerated(true); // Enable the Copy Link and Send Invitation buttons
    } catch (error) {
      console.error(error.message);
      alert("Failed to generate link.");
    }
  };

  const copyLink = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      alert("Link copied to clipboard.");
    }
  };

  const sendInvitation = async (businessId) => {
    // Call the backend to send an invitation
    try {
      const response = await axios.post(
        "http://localhost:3000/superadmin/send-invitation",
        { businessId, email: "example@business.com" }, // Add the email field
        {
          withCredentials: true,
        }
      );
      alert("Invitation sent successfully!", response.success);
    } catch (error) {
      alert("Failed to send invitation.", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Function to render businesses as table rows
  const renderBusinesses = (filteredBusinesses) => {
    return (
      <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
        <thead className="bg-gray-50 dark:bg-neutral-800">
          <tr>
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
          {filteredBusinesses.length > 0 ? (
            filteredBusinesses.map((business, index) => (
              <tr key={index}>
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
                    <ActionDropdown
                      business={business}
                      updateBusinessStatus={updateBusinessStatus}
                      generateLink={generateLink}
                      linkGenerated={linkGenerated}
                      copyLink={copyLink}
                      sendInvitation={sendInvitation}
                    />
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
    );
  };

  // Filter businesses based on status
  const allBusinesses = businesses;
  const pendingBusinesses = businesses.filter(
    (business) => business.status === "pending"
  );
  const activeBusinesses = businesses.filter(
    (business) => business.status === "active"
  );

  return (
    <div className="w-full overflow-auto">
      <Tabs>
        <TabsPanel label="All">{renderBusinesses(allBusinesses)}</TabsPanel>
        <TabsPanel label="Pending">
          {renderBusinesses(pendingBusinesses)}
        </TabsPanel>
        <TabsPanel label="Active">
          {renderBusinesses(activeBusinesses)}
        </TabsPanel>
      </Tabs>
    </div>
  );
};

// Action dropdown component
import PropTypes from "prop-types";
import StatusBadge from "../StatusBadge";

const ActionDropdown = ({
  business,
  updateBusinessStatus,
  generateLink,
  linkGenerated,

  copyLink,
  sendInvitation,
}) => {
  const renderActions = () => {
    switch (business.status) {
      case "pending":
        return (
          <>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => alert(`Viewing details for ${business.name}`)}
                  className={`${
                    active ? "bg-gray-100" : ""
                  } group flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                >
                  View Details
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => updateBusinessStatus(business.id, "verified")}
                  className={`${
                    active ? "bg-gray-100" : ""
                  } group flex w-full items-center px-4 py-2 text-sm `}
                >
                  Approve
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() =>
                    alert(`Requesting more documents for ${business.name}`)
                  }
                  className={`${
                    active ? "bg-gray-100" : ""
                  } group flex w-full items-center px-4 py-2 text-sm `}
                >
                  Amend
                </button>
              )}
            </Menu.Item>
          </>
        );
      case "verified":
        return (
          <>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => alert(`Viewing details for ${business.name}`)}
                  className={`${
                    active ? "bg-gray-100" : ""
                  } group flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                >
                  View Details
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => generateLink(business.id)}
                  className={`${
                    active ? "bg-gray-100" : ""
                  } group flex w-full items-center px-4 py-2 text-sm `}
                >
                  Generate Link
                </button>
              )}
            </Menu.Item>
            {linkGenerated && (
              <>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={copyLink}
                      className={`${
                        active ? "bg-gray-100" : ""
                      } group flex w-full items-center px-4 py-2 text-sm `}
                    >
                      Copy Link
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => sendInvitation(business.id)}
                      className={`${
                        active ? "bg-gray-100" : ""
                      } group flex w-full items-center px-4 py-2 text-sm `}
                    >
                      Send Invitation
                    </button>
                  )}
                </Menu.Item>
              </>
            )}
          </>
        );
      case "active":
        return (
          <>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => alert(`Viewing details for ${business.name}`)}
                  className={`${
                    active ? "bg-gray-100" : ""
                  } group flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                >
                  View Details
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => alert(`Disabling ${business.name}`)}
                  className={`${
                    active ? "bg-gray-100" : ""
                  } group flex w-full items-center px-4 py-2 text-sm text-red-600`}
                >
                  Disable
                </button>
              )}
            </Menu.Item>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="px-3 py-1 border border-gray-300 rounded-md bg-white shadow-sm hover:bg-gray-100">
        Actions
      </Menu.Button>
      <Menu.Items className="absolute right-0 z-50 mt-2 w-40 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="px-2 py-1">
          {renderActions()}
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => alert(`Editing ${business.name}`)}
                className={`${
                  active ? "bg-gray-100" : ""
                } group flex w-full items-center px-4 py-2 text-sm text-gray-700`}
              >
                Edit
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => alert(`Deleting ${business.name}`)}
                className={`${
                  active ? "bg-gray-100" : ""
                } group flex w-full items-center px-4 py-2 text-sm text-red-600`}
              >
                Delete
              </button>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
};

ActionDropdown.propTypes = {
  business: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    registration_number: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  updateBusinessStatus: PropTypes.func.isRequired,
  generateLink: PropTypes.func.isRequired,
  linkGenerated: PropTypes.bool.isRequired,
  copyLink: PropTypes.func.isRequired,
  sendInvitation: PropTypes.func.isRequired,
};

export default DisplayBusiness;
