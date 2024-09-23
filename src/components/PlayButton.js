import { FaPlay } from "react-icons/fa";

import styles from "@/app/page.module.css";

export default function PlayButton() {
    return (
        <button className={styles["play-button"]}>
            <FaPlay className={styles["actual-play-button"]} />
        </button>
    );
}
