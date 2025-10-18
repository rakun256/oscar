import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import clsx from "clsx";

export default function Input({
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
  icon: Icon,
  disabled = false,
  error = "",
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  const baseStyle =
    "w-full border-2 px-4 py-2 rounded-2xl font-semibold transition focus:outline-none focus:ring-2 placeholder-text-secondary text-text";

  const normalBorder = "border-border focus:ring-border-strong bg-bg-soft";
  const errorBorder = "border-red-500 focus:ring-red-500";
  const disabledStyle = "opacity-50 cursor-not-allowed bg-gray-100";

  return (
    <div className="relative flex flex-col w-full">
      <div className="relative flex items-center">
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={clsx(
            baseStyle,
            error ? errorBorder : normalBorder,
            disabled && disabledStyle,
            isPassword || Icon ? "pr-10" : "",
            className
          )}
        />

        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            disabled={disabled}
            className={clsx(
              "absolute right-3 text-text-secondary hover:text-text cursor-pointer",
              disabled && "pointer-events-none text-gray-300"
            )}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        ) : (
          Icon && (
            <div
              className={clsx(
                "absolute right-3 text-text-secondary text-lg",
                disabled && "text-gray-300"
              )}
            >
              <Icon />
            </div>
          )
        )}
      </div>

      {error && <p className="text-red-500 text-sm mt-1 ml-1">{error}</p>}
    </div>
  );
}
