const TableHeader = () => {
  return (
    <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
      {/*search field here*/}

      <div className="sm:col-span-2 md:grow">
        <div className="flex justify-end gap-x-2">
          <div className=" [--placement:bottom-right] relative inline-block">
            {/*header*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableHeader;
