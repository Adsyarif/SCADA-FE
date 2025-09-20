import { forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: "default" | "modern";
  endAdornment?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      variant = "default",
      endAdornment,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2";

    const variantClasses = {
      default: "border-gray-300 focus:border-blue-500 focus:ring-blue-200",
      modern:
        "border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 bg-gray-50 transition-colors duration-200",
    };

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            className={`${baseClasses} ${variantClasses[variant]} ${
              endAdornment ? "pr-10" : ""
            } ${className}`}
            {...props}
          />
          {endAdornment && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {endAdornment}
            </div>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
