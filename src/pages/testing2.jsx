import { XCircle } from "lucide-react";

<>
  <div
    id=""
    className=" size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
  >
    <div className="open:mt-7 open:opacity-100 open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-4xl sm:w-full m-3 h-[calc(100%-3.5rem)] sm:mx-auto">
      <div className="max-h-full overflow-hidden flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-900 dark:border-neutral-800 dark:shadow-neutral-700/70">
        {/*dialog title and close button, this is a header*/}
        <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-800">
          <h3 className="font-bold text-gray-800 dark:text-neutral-200">
            {/*dialog title*/}
          </h3>
          <button
            type="button"
            className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
          >
            <span className="sr-only">Close</span>
            <XCircle className="shrink-0 size-4" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto">
          <div className="sm:divide-y divide-gray-200 dark:divide-neutral-700">
            <div className="py-3 sm:py-6">
              <h4 className="mb-2 text-xs font-semibold uppercase text-gray-600 dark:text-neutral-400">
                {/*heading text about the contents*/}
              </h4>

              <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                {/*contents here*/}
              </div>
            </div>

            <div className="py-3 sm:py-6">
              <h4 className="mb-2 text-xs font-semibold uppercase text-gray-600 dark:text-neutral-400">
                {/*heading text about the contents */}
              </h4>

              <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                {/*contents here*/}
              </div>

              <p className="mt-4 text-xs text-gray-500 dark:text-neutral-500">
                {/*footer about the contents*/}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-800">
          {/*footer buttons*/}
        </div>
      </div>
    </div>
  </div>
</>;
