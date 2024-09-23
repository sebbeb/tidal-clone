import styles from "@/app/page.module.css";

const { forwardRef } = require("react");

const Input = forwardRef(function Input(
    { className, type, disabled, ...props },
    ref
) {
    return (
        <input
            type={type}
            className={`${styles["input"]} ${className}`}
            disabled={disabled}
            ref={ref}
            {...props}
        />
    );
});

Input.displayName = "Input";

export default Input;
