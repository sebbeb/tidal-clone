import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

async function getPlaylistImageById(id) {
    const supabase = createServerComponentClient({ cookies: cookies });

    const { data, error } = await supabase
        .from("playlists")
        .select("*")
        .eq("id", id);

    if (error) {
        console.log(error);
    }

    const { data: imageData } = await supabase.storage
        .from("images")
        .getPublicUrl(data[0]?.image_path);

    return { url: imageData.publicUrl, name: data[0]?.name };
}

export default getPlaylistImageById;
