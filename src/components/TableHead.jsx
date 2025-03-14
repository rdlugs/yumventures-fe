import PropTypes from "prop-types";
const TableHead = ({ columns, isEmpty = false }) => {
  return (
    <thead className="bg-gray-50 dark:bg-neutral-800">
      <tr>
        {columns?.map((column, index) => (
          <th key={index} scope="col" className="px-6 py-3 text-start">
            <div className="flex items-center gap-x-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                {column}
              </span>
            </div>
          </th>
        ))}
        {/* Empty table head cell */}
        {isEmpty && <th scope="col" className="px-6 py-3 text-end"></th>}
      </tr>
    </thead>
  );
};

TableHead.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  isEmpty: PropTypes.bool,
};

export default TableHead;
