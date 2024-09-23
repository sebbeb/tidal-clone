"use client";

import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import useAuthModal from "../../hooks/useAuthModal";
import { useUser } from "../../hooks/useUser";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import styles from "@/app/page.module.css";
import toast from "react-hot-toast";

export default function LikeButton({ songId }) {
    const router = useRouter();
    const { supabaseClient } = useSessionContext();

    const authModal = useAuthModal();
    const { user } = useUser();

    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (!user?.id) return;

        async function fetchData() {
            const { data, error } = await supabaseClient
                .from("liked_songs")
                .select("*")
                .eq("user_id", user.id)
                .eq("song_id", songId)
                .single();

            if (!error && data) setIsLiked(true);
        }

        fetchData();
    }, [songId, supabaseClient, user?.id]);

    async function handleLike() {
        if (!user) return authModal.onOpen();

        if (isLiked) {
            const { error } = await supabaseClient
                .from("liked_songs")
                .delete()
                .eq("user_id", user.id)
                .eq("song_id", songId);

            if (error) toast.error(error.message);
            else setIsLiked(false);
        } else {
            const { error } = await supabaseClient
                .from("liked_songs")
                .insert({ song_id: songId, user_id: user.id });

            if (error) toast.error(error.message);
            else {
                setIsLiked(true);
                toast.success("Liked!");
            }
        }
        router.refresh();
    }

    const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

    return (
        <button onClick={handleLike} className={styles["like-button"]}>
            <Icon color={isLiked ? "rgb(51, 255, 238)" : "white"} size={25} />
        </button>
    );
}
