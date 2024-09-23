import { create } from "zustand";

const useAddToPlaylistModal = create((set) => ({
    song: null,
    setSong: (song) => set({ song }),
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useAddToPlaylistModal;
