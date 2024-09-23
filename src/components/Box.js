import styles from "@/app/page.module.css";

export default function Box({ children, className }) {
    return <div className={`${styles.box} ${className}`}>{children}</div>;
}
