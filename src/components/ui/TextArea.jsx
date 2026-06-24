import React from 'react';

const TextArea = ({ label, placeholder, id, required = false, error = "", ...props }) => {
    const errorId = `${id}-error`;
    return (
        <div className="flex flex-col items-start gap-1">
            <label className="text-base font-semibold" htmlFor={id}>
                {label}{required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            <textarea
                id={id}
                name={id}
                placeholder={placeholder}
                required={required}
                aria-invalid={!!error}
                aria-describedby={error ? errorId : undefined}
                className={`py-2 px-2 text-base rounded-sm w-full h-56 ${error
                    ? "border-red-500 dark:border-red-400 text-red-600 dark:text-red-400"
                    : "text-carbon-400 border-carbon-400 dark:text-carbon-1400 dark:border-carbon-1400"
                    } border`}
                {...props}
            />
            {error && (
                <p id={errorId} className="text-xs text-red-500 dark:text-red-400 mt-0.5" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
};

export default TextArea;
