import React from "react";

export function Input({ type, placeholder, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}
