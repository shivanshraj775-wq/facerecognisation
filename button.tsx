import React from "react";

export const Button = ({
  children,
  onClick,
  type = "button",
  variant = "default",
  size = "md",
  className = "",
  disabled = false,
}: any) => {
  const base = "px-4 py-2 rounded-md text-sm font-medium transition";
  const variants: Record<string, string> = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 bg-white text-gray-700",
    destructive: "bg-red-600 text-white hover:bg-red-700",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant] || variants.default} ${className}`}
    >
      {children}
    </button>
  );
};
