"use client";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

import styles from "@/app/page.module.css";
import useAuthModal from "../../hooks/useAuthModal";
import { useUser } from "../../hooks/useUser";
import useUploadModal from "../../hooks/useUploadModal";
import MediaItem from "./MediaItem";
import useOnPlay from "../../hooks/useOnPlay";
import useUploadPlaylistModal from "../../hooks/useUploadPlaylistModal";
import Link from "next/link";
import { RiPlayListLine } from "react-icons/ri";
import { IoIosMusicalNotes } from "react-icons/io";

export default function Library({ songs, playlists }) {
    const authModal = useAuthModal();
    const uploadPlaylistModal = useUploadPlaylistModal();
    const uploadSongModal = useUploadModal();
    const { user } = useUser();
    const onPlay = useOnPlay(songs);

    function handleNewPlaylist() {
        if (!user) return authModal.onOpen();

        return uploadPlaylistModal.onOpen();
    }

    function handleNewSong() {
        if (!user) return authModal.onOpen();

        return uploadSongModal.onOpen();
    }

    return (
        <div className={styles["wrapper-library"]}>
            <div className={styles["library-first"]}>
                <div className={styles["library-playlist"]}>
                    <RiPlayListLine
                        size={20}
                        className={styles["playlist-icon"]}
                    />
                    <p>Playlists</p>
                </div>
                <AiOutlinePlus
                    onClick={handleNewPlaylist}
                    size={20}
                    className={styles["new-playlist"]}
                />
            </div>
            <div className={styles["library-song-list"]}>
                {playlists.map((playlist) => (
                    <Link key={playlist.id} href={`/playlist/${playlist.id}`}>
                        <MediaItem data={playlist} />
                    </Link>
                ))}
            </div>

            <div className={styles["library-first"]}>
                <div className={styles["library-playlist"]}>
                    <IoIosMusicalNotes
                        size={20}
                        className={styles["playlist-icon"]}
                    />
                    <p>Songs</p>
                </div>
                <AiOutlinePlus
                    onClick={handleNewSong}
                    size={20}
                    className={styles["new-playlist"]}
                />
            </div>
            <div className={styles["library-song-list"]}>
                {songs.map((song) => (
                    <MediaItem
                        onClick={(id) => onPlay(id)}
                        key={song.id}
                        data={song}
                    />
                ))}
            </div>
        </div>
    );
}
