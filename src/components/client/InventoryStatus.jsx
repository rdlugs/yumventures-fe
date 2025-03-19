import PropTypes from "prop-types";

const InventoryStatus = ({ name, description }) => {

    let in_stock_class = `bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-500`;
    let low_stock_class = `bg-orange-100 text-orange-800 dark:bg-orange-500/10 dark:text-orange-500`;
    let out_of_stock_class = `bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-500`;
    let phase_out_class = `bg-red-400 text-red-900 dark:bg-red-600/10 dark:text-red-500`;

    let statusClass = in_stock_class;
    
    switch(name) {
        case 'low_stock':
            statusClass = low_stock_class;
            break;

        case 'out_of_stock':
            statusClass = out_of_stock_class;
            break;

        case 'phase_out':
            statusClass = phase_out_class;
            break;
    }

    return (
        <>
           
            <span className={`py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium rounded-full ` + statusClass}>
                
                {name == 'low_stock' && <svg fill="#ff7800" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 416.979 416.979" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M356.004,61.156c-81.37-81.47-213.377-81.551-294.848-0.182c-81.47,81.371-81.552,213.379-0.181,294.85 c81.369,81.47,213.378,81.551,294.849,0.181C437.293,274.636,437.375,142.626,356.004,61.156z M237.6,340.786 c0,3.217-2.607,5.822-5.822,5.822h-46.576c-3.215,0-5.822-2.605-5.822-5.822V167.885c0-3.217,2.607-5.822,5.822-5.822h46.576 c3.215,0,5.822,2.604,5.822,5.822V340.786z M208.49,137.901c-18.618,0-33.766-15.146-33.766-33.765 c0-18.617,15.147-33.766,33.766-33.766c18.619,0,33.766,15.148,33.766,33.766C242.256,122.755,227.107,137.901,208.49,137.901z"></path> </g> </g></svg>}
                
                {name == 'out_of_stock' && <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2.20164 18.4695L10.1643 4.00506C10.9021 2.66498 13.0979 2.66498 13.8357 4.00506L21.7984 18.4695C22.4443 19.6428 21.4598 21 19.9627 21H4.0373C2.54022 21 1.55571 19.6428 2.20164 18.4695Z" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 9V13" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 17.0195V17" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>}

                {name == 'phase_out' && <svg fill="#ff0000" height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" stroke="#ff0000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M256,0C114.615,0,0,114.616,0,256s114.615,256,256,256s256-114.616,256-256S397.385,0,256,0z M66.783,256 c0-104.503,84.716-189.217,189.217-189.217c40.19,0,77.446,12.541,108.089,33.907L100.689,364.089 C79.323,333.446,66.783,296.19,66.783,256z M256,445.217c-40.19,0-77.446-12.541-108.089-33.907l263.399-263.399 c21.366,30.643,33.907,67.899,33.907,108.089C445.217,360.501,360.501,445.217,256,445.217z"></path> </g> </g> </g></svg>}

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