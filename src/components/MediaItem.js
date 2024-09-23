"use client";

import Image from "next/image";
import useLoadImage from "../../hooks/useLoadImage";

import styles from "@/app/page.module.css";

export default function MediaItem({ data, onClick }) {
    const imageUrl = useLoadImage(data);

    function handleClick() {
        if (onClick) {
            return onClick(data.id);
        }

        //todo
    }

    return (
        <div onClick={handleClick} className={styles["media-item"]}>
            <div className={styles["inner-media-item"]}>
                <Image
                    fill={true}
                    src={imageUrl || "/images/liked.png"}
                    alt="Media Item"
                    className={styles["media-item-image"]}
                />
            </div>
            <div className={styles["media-item-text"]}>
                {!data.name && (
                    <>
                        <p className={styles["media-item-p1"]}>
                            {data.title || data.songs?.title}
                        </p>
                        <p className={styles["media-item-p2"]}>
                            {data.author || data.songs?.author}
                        </p>
                    </>
                )}

                {/* Dum måde at vælge mellem sangtitel og playliste navn. I stedet for if statement, kigger jeg bare om propertien findes i data objektet */}
                {data.name && (
                    <>
                        <p className={styles["media-item-p1"]}>{data.name}</p>
                        <p className={styles["media-item-p2"]}>By you</p>
                    </>
                )}
            </div>
        </div>
    );
}
