import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function useLoadSongUrl(song) {
    const supabaseClient = useSupabaseClient();

    if (!song) return "";

    const { data: songData } = supabaseClient.storage
        .from("songs")
        .getPublicUrl(song.song_path);

    return songData.publicUrl;
}
