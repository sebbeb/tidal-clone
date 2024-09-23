import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

export default function useGetSongById(id) {
    const [isLoading, setIsLoading] = useState(false);
    const [song, setsong] = useState(undefined);
    const { supabaseClient } = useSessionContext();

    useEffect(() => {
        if (!id) return;

        setIsLoading(true);

        async function fetchSong() {
            const { data, error } = await supabaseClient
                .from("songs")
                .select("*")
                .eq("id", id)
                .single();

            if (error) {
                setIsLoading(false);
                return toast.error(error.message);
            }

            setsong(data);
            setIsLoading(false);
        }

        fetchSong();
    }, [id, supabaseClient]);

    return useMemo(
        () => ({
            isLoading,
            song,
        }),
        [isLoading, song]
    );
}
