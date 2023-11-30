import React from "react";

export default function InputField({ label, value, onChange, type , className}) {

  return (
    <div className={`border-b border-white flex px-2 py-1 ${className}`}>
      {
        value==="" && (
          <div
            className="text-transparent gradient-label bg-clip-text font-[Inter] absolute">
            {label}
          </div>
        )
      }
      <input
        className="font-lg bg-transparent text-white border-0 focus:border-none focus:outline-none "
        value={value}
        onChange={onChange}
        type={type}
      />
    </div>
  );
}
