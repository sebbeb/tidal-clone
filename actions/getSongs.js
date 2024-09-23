import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

async function getSongs() {
    const supabase = createServerComponentClient({ cookies: cookies });

    const { data, error } = await supabase
        .from("songs")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.log(error);
    }

    return data || [];
}

export default getSongs;
