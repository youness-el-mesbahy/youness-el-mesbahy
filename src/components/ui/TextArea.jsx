import React from 'react';

const TextArea = ({ label, placeholder, id, ...props }) => {
    return (
        <div className="flex flex-col items-start gap-1">
            <label className="text-base font-semibold" htmlFor={id}>
                {label}
            </label>
            <textarea
                id={id}
                name={id}
                placeholder={placeholder}
                className="py-2 px-2 text-base text-carbon-400 border dark:border-carbon-1400 dark:text-carbon-1400 border-carbon-400 rounded-sm w-full h-56"
                {...props}
            />
        </div>
    );
};

export default TextArea;
