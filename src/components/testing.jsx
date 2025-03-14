<>
  <div className="border-b border-gray-200 dark:border-neutral-700">
    <nav className="flex gap-x-1">
      <button
        type="button"
        className="active:font-semibold active:border-blue-600 active:text-blue-600 py-4 px-1 inline-flex items-center gap-x-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-blue-500 "
      >
        {/*Dynamic tab button - this will display all the statuses then when you click them, the businesses with that status will appear e.g pending*/}
        <span className="hs-tab-active:bg-blue-100 hs-tab-active:text-blue-600 dark:hs-tab-active:bg-blue-800 dark:hs-tab-active:text-white ms-1 py-0.5 px-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-neutral-700 dark:text-neutral-300">
          {/*count of those businesses that have the certain status*/}
        </span>
      </button>
    </nav>
  </div>

  <div className="mt-3">
    <div>
      {/*dynamic tab - this is where the businesses are displayed based on their status */}
    </div>
  </div>
</>;
