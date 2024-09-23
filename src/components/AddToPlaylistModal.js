"use client";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import useAddToPlaylistModal from "../../hooks/useAddToPlaylistModal";
import { useEffect } from "react";
import MediaItem from "./MediaItem";
import toast from "react-hot-toast";

export default function AddToPlaylistModal({ playlists }) {
    const router = useRouter();
    const { song, onClose, isOpen } = useAddToPlaylistModal();
    const supabaseClient = useSupabaseClient();

    function onChange(open) {
        if (!open) onClose();
    }

    async function handleClick(playlist) {
        try {
            const { error: supabaseError } = await supabaseClient
                .from("playlist_songs")
                .insert({
                    playlist_id: playlist.id,
                    song_id: song.id,
                });

            if (supabaseError) {
                return toast.error("Song is already in this playlist");
            }

            router.refresh();
            toast.success(`${song.title} has been added to ${playlist.name}`);
            onClose();
        } catch (error) {
            toast.error("Something went wrong, try again");
        }
    }

    return (
        <Modal
            title="Add to playlist"
            description="Choose one of your playlists"
            isOpen={isOpen}
            onChange={onChange}
        >
            {playlists.map((playlist) => (
                <MediaItem
                    key={playlist.id}
                    data={playlist}
                    onClick={() => handleClick(playlist)}
                />
            ))}
        </Modal>
    );
}
