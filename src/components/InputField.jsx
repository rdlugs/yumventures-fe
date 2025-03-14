import { useState } from "react";
import PropTypes from "prop-types";

const InputField = ({
  label,
  name,
  value,
  onChange,
  required,
  placeholder,
  type = "text", // Default type is text, can be overridden
  errorMessage,
  disabled = false,
  showIcon = true, // new prop to control whether to show the icon or not
  icon = null, // optional custom icon, defaults to null
}) => {
  const [error, setError] = useState(errorMessage || "");

  // Handle change event
  const handleChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);
    if (newValue && newValue.length > 0) {
      setError("");
    }
  };

  // Handle blur event (to validate required fields)
  const handleBlur = () => {
    if (required && !value) {
      setError(`${label} is required.`);
    }
  };

  return (
    <div className="max-w-sm space-y-3">
      <div>
        <label
          htmlFor={name}
          className="block text-sm font-medium mb-2 dark:text-white"
        >
          {label}
        </label>
        <div className="relative">
          <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            required={required}
            disabled={disabled}
            className={`py-3 px-4 ${
              showIcon ? "ps-16" : "ps-4"
            } block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600`}
            placeholder={placeholder}
            aria-describedby={error ? `${name}-error` : undefined}
            aria-required={required ? "true" : "false"}
            aria-invalid={error ? "true" : "false"}
          />
          {error && (
            <span
              id={`${name}-error`}
              className="text-xs text-red-500 dark:text-red-400 mt-1"
            >
              {error}
            </span>
          )}
          {showIcon && (
            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
              {icon || (
                <svg
                  className="shrink-0 size-4 text-gray-400 dark:text-neutral-600"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Define prop types for validation
InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  errorMessage: PropTypes.string,
  disabled: PropTypes.bool,
  showIcon: PropTypes.bool, // Prop for controlling the icon visibility
  icon: PropTypes.node, // Prop for passing a custom icon (SVG or any component)
};

// Set default props
InputField.defaultProps = {
  required: false,
  placeholder: "",
  type: "text",
  errorMessage: "",
  disabled: false,
  showIcon: true,
  icon: null, // Default is null, meaning it uses the default icon
};

export default InputField;
