import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

async function getSongByUserId() {
    const supabase = createServerComponentClient({ cookies: cookies });

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
        return [];
    }

    const { data, error } = await supabase
        .from("songs")
        .select("*")
        .eq("user_id", userData.user.id)
        .order("created_at", { ascending: false });

    if (error) {
        console.log(error.message);
    }

    return data || [];
}

export default getSongByUserId;
