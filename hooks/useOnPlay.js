import useAuthModal from "./useAuthModal";
import usePlayer from "./usePlayer";
import { useUser } from "./useUser";

export default function useOnPlay(songs) {
    const player = usePlayer();
    const authModal = useAuthModal();
    const { user } = useUser();

    function onPlay(id) {
        if (!user) {
            return authModal.onOpen();
        }

        player.setId(id);
        player.setIds(songs.map((song) => song.id));
    }

    return onPlay;
}
