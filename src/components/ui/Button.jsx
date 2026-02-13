import React from 'react';
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const baseClasses = "flex items-center gap-1 m-0 px-4 py-2 rounded-xs text-base justify-center";

const buttonVariants = {
    primary: "bg-primary text-white",
    secondary: "bg-carbon-200 dark:bg-carbon-1000",
};

const Button = ({ variant = 'primary', className = '', children, ...props }) => {
    const buttonClasses = twMerge(clsx(baseClasses, buttonVariants[variant], className));

    return (
        <button className={buttonClasses} {...props}>
            {children}
        </button>
    );
};

export default Button;
