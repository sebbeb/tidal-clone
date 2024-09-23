"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";

import Box from "./Box.js";
import SidebarItem from "./SidebarItem.js";
import Library from "./Library.js";

import styles from "@/app/page.module.css";
import usePlayer from "../../hooks/usePlayer.js";

export default function Sidebar({ children, songs, playlists }) {
    const pathname = usePathname();
    const player = usePlayer();

    const routes = useMemo(
        () => [
            {
                icon: HiHome,
                label: "Home",
                active: pathname !== "/search",
                href: "/",
            },
            {
                icon: BiSearch,
                label: "Search",
                active: pathname === "/search",
                href: "/search",
            },
        ],
        [pathname]
    );
    return (
        <div
            className={`${styles["wrapper-sidebar"]} ${
                player.activeId && styles["wrapper-sidebar-extra"]
            }`}
        >
            <div className={styles["sidebar-boxes"]}>
                <div className={styles["sidebar-item"]}>
                    {routes.map((item) => (
                        <SidebarItem key={item.label} {...item} />
                    ))}
                </div>
                <Library songs={songs} playlists={playlists} />
            </div>

            <main className={styles.main}>{children}</main>
        </div>
    );
}
