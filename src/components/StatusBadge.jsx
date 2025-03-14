import {
  Award,
  CheckCircle,
  CookingPot,
  Loader,
  ShoppingBag,
} from "lucide-react";
import PropTypes from "prop-types";

const StatusBadge = ({ status }) => {
  return (
    <div>
      {status === "pending" && (
        <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full dark:bg-yellow-500/10 dark:text-yellow-500">
          <Loader className="size-2.5" />
          {status}
        </span>
      )}
      {status === "verified" && (
        <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
          <Award className="size-2.5" />
          {status}
        </span>
      )}
      {status === "preparing" && (
        <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full dark:bg-blue-500/10 dark:text-blue-500">
          <CookingPot className="size-2.5" />
          {status}
        </span>
      )}
      {status === "ready to pick up" && (
        <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-green-100 text-green-800 rounded-full dark:bg-green-500/10 dark:text-green-500">
          <ShoppingBag className="size-2.5" />
          {status}
        </span>
      )}
    </div>
  );
};

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
};

export default StatusBadge;
