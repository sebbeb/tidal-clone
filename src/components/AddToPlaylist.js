"use client";

import useAddToPlaylistModal from "../../hooks/useAddToPlaylistModal";
import useAuthModal from "../../hooks/useAuthModal";
import { useUser } from "../../hooks/useUser";
import { RiPlayListAddLine } from "react-icons/ri";

export default function AddToPlaylist({ song }) {
    const { user } = useUser();
    const authModal = useAuthModal();
    const addModal = useAddToPlaylistModal();

    function handleClick(e) {
        e.stopPropagation();

        if (!user) return authModal.onOpen();

        addModal.setSong(song);
        addModal.onOpen();
    }

    return (
        <button onClick={handleClick}>
            <RiPlayListAddLine size={23} />
        </button>
    );
}
