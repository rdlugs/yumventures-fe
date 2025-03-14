import PropTypes from "prop-types";
import useDialogStore from "../store/useDialogStore";
import { Dialog, DialogPanel } from "@headlessui/react";

const DialogComponent = ({ children, id }) => {
  const { openDialogId, closeDialog } = useDialogStore();

  return (
    <Dialog
      open={openDialogId === id}
      onClose={closeDialog}
      className="relative z-50 focus:outline-none inset-0"
    >
      <div className="fixed inset-0 bg-black bg-opacity-30" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="max-h-full overflow-auto flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-900 dark:border-neutral-800 dark:shadow-neutral-700/70">
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
};

DialogComponent.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string.isRequired, // Make sure 'id' is required for the dialog
};

export default DialogComponent;
