import React from "react";

export default function Button({ content, onClick, type, className, children }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={
        `rounded-lg border-white border-[1px] w-full text-white bg-light-clr-20 p-2 uppercase tracking-widest ${className}`
      }
    >
      { content ? content : children }
    </button>
  );
}
