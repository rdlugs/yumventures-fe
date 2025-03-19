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
                <svg fill="#ff7800" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 416.979 416.979" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M356.004,61.156c-81.37-81.47-213.377-81.551-294.848-0.182c-81.47,81.371-81.552,213.379-0.181,294.85 c81.369,81.47,213.378,81.551,294.849,0.181C437.293,274.636,437.375,142.626,356.004,61.156z M237.6,340.786 c0,3.217-2.607,5.822-5.822,5.822h-46.576c-3.215,0-5.822-2.605-5.822-5.822V167.885c0-3.217,2.607-5.822,5.822-5.822h46.576 c3.215,0,5.822,2.604,5.822,5.822V340.786z M208.49,137.901c-18.618,0-33.766-15.146-33.766-33.765 c0-18.617,15.147-33.766,33.766-33.766c18.619,0,33.766,15.148,33.766,33.766C242.256,122.755,227.107,137.901,208.49,137.901z"></path> </g> </g></svg>
                
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