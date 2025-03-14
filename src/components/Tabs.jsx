import { Tab, TabGroup, TabList, TabPanels, TabPanel } from "@headlessui/react";
import PropTypes from "prop-types";
import { Plus } from "lucide-react";
// A reusable Tabs component that allows arbitrary content inside the TabPanel
const Tabs = ({ children }) => {
  return (
    <div className="w-full mx-auto mt-6">
      <TabGroup>
        <div className="flex justify-between items-center px-4 py-2 ">
          <TabList className="flex gap-4 border-b border-gray-200 dark:border-neutral-700">
            {children
              .filter((child) => child.type === TabsPanel)
              .map((panel, index) => (
                <Tab
                  key={index}
                  className={({ selected }) =>
                    selected
                      ? "font-semibold text-blue-600 border-b-2 border-blue-600 py-4 px-1 inline-flex items-center gap-x-2 capitalize"
                      : "text-gray-500 hover:text-blue-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent capitalize"
                  }
                >
                  {panel.props.label}
                </Tab>
              ))}
          </TabList>
          <div className="flex flex-row justify-center items-center gap-x-2">
            <button
              type="button"
              className="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            >
              Filter
              <Plus className="shrink-0 size-4" />
            </button>
            <button
              type="button"
              className="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
            >
              Create
              <Plus className="shrink-0 size-4" />
            </button>
          </div>
        </div>

        <TabPanels className="mt-3">
          {children
            .filter((child) => child.type === TabsPanel)
            .map((panel, index) => (
              <TabPanel
                key={index}
                className="p-3 bg-white dark:bg-neutral-800 rounded-xl"
              >
                {panel.props.children}
              </TabPanel>
            ))}
        </TabPanels>
      </TabGroup>
    </div>
  );
};

// A TabsPanel component that allows content to be passed inside each TabPanel
const TabsPanel = ({ label, children }) => {
  return <div label={label}>{children}</div>;
};

// PropTypes for validation
Tabs.propTypes = {
  children: PropTypes.node.isRequired, // Children can be any valid JSX elements
};

// PropTypes for TabsPanel
TabsPanel.propTypes = {
  label: PropTypes.string.isRequired, // Label for the tab
  children: PropTypes.node.isRequired, // Content to display inside the TabPanel
};

export { Tabs, TabsPanel };
