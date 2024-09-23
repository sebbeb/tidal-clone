"use client";

import styles from "@/app/page.module.css";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import useOnPlay from "../../hooks/useOnPlay";
import AddToPlaylist from "./AddToPlaylist";

export default function SearchContent({ songs }) {
    const onPlay = useOnPlay(songs);

    if (songs.length === 0)
        return (
            <div className={styles["search-no-results"]}>No songs found</div>
        );

    return (
        <div className={styles["search-results-wrapper"]}>
            {songs.map((song) => (
                <div key={song.id} className={styles["search-results"]}>
                    <div className={styles["search-results-media"]}>
                        <MediaItem onClick={(id) => onPlay(id)} data={song} />
                    </div>
                    <AddToPlaylist song={song} />
                    <LikeButton songId={song.id} />
                </div>
            ))}
        </div>
    );
}
