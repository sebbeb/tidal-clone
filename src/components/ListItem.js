"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";

import styles from "@/app/page.module.css";
import Link from "next/link";

export default function ListItem({ image, name, href }) {
    return (
        <Link href={href} className={styles["list-item-button"]}>
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
