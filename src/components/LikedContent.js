"use client";

import { useRouter } from "next/navigation";
import { useUser } from "../../hooks/useUser";
import { useEffect } from "react";

import styles from "@/app/page.module.css";
import MediaItem from "./MediaItem";
import useOnPlay from "../../hooks/useOnPlay";

export default function LikedContent({ songs }) {
    const router = useRouter();
    const { isLoading, user } = useUser();
    const onPlay = useOnPlay(songs);

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace("/");
        }
    }, [isLoading, user, router]);

    if (songs.length === 0) {
        return <div className={styles["no-liked-content"]}>No songs</div>;
    }

    return (
        <div className={styles["liked-content"]}>
            {songs.map((song) => (
                <div key={song.id} className={styles["liked-content-song"]}>
                    <div className={styles["liked-content-song-inner"]}>
                        <MediaItem onClick={(id) => onPlay(id)} data={song} />
                    </div>
                </div>
            ))}
        </div>
    );
}
