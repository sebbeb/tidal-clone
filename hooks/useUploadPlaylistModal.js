import { create } from "zustand";

const useUploadPlaylistModal = create((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useUploadPlaylistModal;
