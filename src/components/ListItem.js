"use client";

import Image from "next/image";

import styles from "@/app/page.module.css";
import Link from "next/link";
import { useUser } from "../../hooks/useUser";
import useAuthModal from "../../hooks/useAuthModal";

export default function ListItem({ image, name, href, checkAuth }) {
    const { user } = useUser();
    const authModal = useAuthModal();

    function check(e) {
        if (!user) {
            e.preventDefault();

            authModal.onOpen();
        }
    }
    return (
        <Link
            href={href}
            className={styles["list-item-button"]}
            onClick={check}
        >
            <div className={styles["list-item-button-div"]}>
                <Image
                    className={styles["list-item-button-image"]}
                    fill
                    src={image}
                    alt="Image"
                />
            </div>
            <p className={styles["list-item-button-p"]}>{name}</p>
        </Link>
    );
}
