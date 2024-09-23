"use client";

import Image from "next/image";
import useLoadImage from "../../hooks/useLoadImage";

import styles from "@/app/page.module.css";
import PlayButton from "./PlayButton";

export default function SongItem({ data, onClick }) {
    const imagePath = useLoadImage(data);

    return (
        <div onClick={() => onClick(data.id)} className={styles["song-item"]}>
            <div className={styles["song-item-image"]}>
                <Image
                    className={styles["song-item-actual-image"]}
                    src={imagePath || "/images/liked.png"}
                    fill={true}
                    alt="Image"
                />
            </div>
            <div className={styles["song-item-text"]}>
                <p className={styles["song-item-title"]}>{data.title}</p>
                <p className={styles["song-item-author"]}>By {data.author}</p>
            </div>
            <div className={styles["song-item-play"]}>
                <PlayButton />
            </div>
        </div>
    );
}
