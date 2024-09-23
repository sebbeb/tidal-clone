import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

async function getSongsFromPlaylistId(id) {
    const supabase = createServerComponentClient({ cookies: cookies });

    const { data, error } = await supabase
        .from("playlist_songs")
        .select("*, songs(*), playlists(*)")
        .eq("playlist_id", id)
        .order("created_at", { ascending: false });

    if (error) {
        console.log(error);
    }

    return data || [];
}

export default getSongsFromPlaylistId;
