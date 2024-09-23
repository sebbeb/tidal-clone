import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function useLoadImage(song) {
    const supabaseClient = useSupabaseClient();

    if (!song) return null;

    song = song.songs ? song.songs : song;

    const { data: imageData } = supabaseClient.storage
        .from("images")
        .getPublicUrl(song.image_path);

    return imageData.publicUrl;
}
