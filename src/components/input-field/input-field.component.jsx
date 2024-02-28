import React from "react";
import {v4 as UUID} from 'uuid';

export default function InputField({label, value, onChange, type, className, ...props}) {
    const uid = UUID()
    return (
        <div className={`border-b border-white flex px-2 py-1 ${className}`}>
            {
                value === "" && (
                    <label
                        htmlFor={uid}
                        className="cursor-text text-transparent gradient-label bg-clip-text font-[Inter] absolute">
                        {label}
                    </label>
                )
            }
            <input
                {...props}
                id={uid}
                className="font-lg w-full bg-transparent text-white border-0 focus:border-none focus:outline-none "
                value={value}
                onChange={onChange}
                type={type}
            />
        </div>
    );
}
