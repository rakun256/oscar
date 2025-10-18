export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
}) {
  const baseStyle =
    "border-2 px-6 py-2 rounded-2xl  font-semibold transition cursor-pointer active:scale-95";

  const variants = {
    primary: "border-primary text-primary hover:bg-primary hover:text-bg",
    secondary:
      "border-secondary text-secondary hover:bg-secondary hover:text-bg",
    outline_primary:
      "border-primary text-bg hover:bg-bg hover:text-primary bg-primary",
    outline_secondary:
      "border-secondary text-bg hover:bg-bg hover:text-secondary bg-secondary",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${
        disabled
          ? "opacity-50 cursor-not-allowed! hover:bg-bg! hover:text-primary active:scale-100!"
          : ""
      } ${className}`}
    >
      {children}
    </button>
  );
}
