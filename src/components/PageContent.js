"use client";

import styles from "@/app/page.module.css";
import SongItem from "./SongItem";
import useOnPlay from "../../hooks/useOnPlay";

export default function PageContent({ songs }) {
    const onPlay = useOnPlay(songs);

    return (
        <>
            {songs.length === 0 ? (
                <div className={styles["no-songs"]}>No songs available</div>
            ) : (
                <div className={styles["list-of-songs"]}>
                    {songs.map((song) => (
                        <SongItem
                            key={song.id}
                            onClick={(id) => onPlay(id)}
                            data={song}
                        />
                    ))}
                </div>
            )}
        </>
    );
}
