import React from 'react';

const Input = ({ label, placeholder, id, ...props }) => {
    return (
        <div className="flex flex-col items-start gap-1">
            <label className="text-base font-semibold" htmlFor={id}>
                {label}
            </label>
            <input
                type="text"
                id={id}
                name={id}
                placeholder={placeholder}
                className="py-2 px-2 text-base text-carbon-400 border border-carbon-400 dark:text-carbon-1400 dark:border-carbon-1400 rounded-sm w-full"
                {...props}
            />
        </div>
    );
};

export default Input;
