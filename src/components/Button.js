import { forwardRef } from "react";

import styles from "@/app/page.module.css";

const Button = forwardRef(function Button(
    { className, children, disabled, type = "button", ...props },
    ref
) {
    return (
        <button
            ref={ref}
            type={type}
            disabled={disabled}
            className={`${styles["button"]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
});

export default Button;
