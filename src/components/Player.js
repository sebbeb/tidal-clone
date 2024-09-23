"use client";

import useGetSongById from "../../hooks/useGetSongById";
import useLoadSongUrl from "../../hooks/useLoadSongUrl";
import usePlayer from "../../hooks/usePlayer";

import styles from "@/app/page.module.css";
import PlayerContent from "./PlayerContent";

export default function Player() {
    const player = usePlayer();
    const { song } = useGetSongById(player.activeId);

    const songUrl = useLoadSongUrl(song);

    if (!song || !songUrl || !player.activeId) return null;

    return (
        <div className={styles["player"]}>
            <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
        </div>
    );
}
