import PropTypes from "prop-types";

const InventoryStatus = ({ name, description }) => {

    let in_stock_class = `bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-500`;
    let low_stock_class = `bg-orange-100 text-orange-800 dark:bg-orange-500/10 dark:text-orange-500`;
    let out_of_stock_class = `bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-500`;

    let statusClass = (name == 'in_stock' ? in_stock_class : (
        name == 'low_stock' ? low_stock_class : (
            name == 'out_of_stock' ? out_of_stock_class : "" 
        )
    ));

    return (
        <>
           
            <span className={`py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium rounded-full ` + statusClass}>
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
                {description}
            </span>
            

            <span>
            </span>
        </>
    )
}

InventoryStatus.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string
};

export default InventoryStatus;