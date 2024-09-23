import Link from "next/link";
import { IconType } from "react-icons";

import styles from "@/app/page.module.css";

export default function SidebarItem({ icon: Icon, label, active, href }) {
    return (
        <Link
            href={href}
            className={`${styles["sidebar-item-content"]} ${
                active && styles["sidebar-item-content-active"]
            }`}
        >
            <Icon size={26} />
            <p>{label}</p>
        </Link>
    );
}
