"use client";

import { useEffect, useState } from "react";

import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";
import UploadPlaylistModal from "@/components/UploadPlaylistModal";
import AddToPlaylistModal from "@/components/AddToPlaylistModal";

export default function ModalProvider({ playlists }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <>
            <AuthModal />
            <UploadModal />
            <UploadPlaylistModal />
            <AddToPlaylistModal playlists={playlists} />
        </>
    );
}
