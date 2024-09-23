"use client";

import uniqid from "uniqid";
import { Form, useForm } from "react-hook-form";
import useUploadModal from "../../hooks/useUploadModal";
import Modal from "./Modal";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";

import styles from "@/app/page.module.css";
import { useUser } from "../../hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function UploadModal() {
    const [isLoading, setIsLoading] = useState(false);
    const uploadModal = useUploadModal();
    const { user } = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const { register, handleSubmit, reset } = useForm({
        defaultValues: { author: "", title: "", song: null, image: null },
    });

    function onChange(open) {
        if (!open) {
            reset();
            uploadModal.onClose();
        }
    }

    async function onSubmit(values) {
        try {
            setIsLoading(true);

            const imageFile = values.image?.[0];
            const songFile = values.song?.[0];

            if (!imageFile || !songFile || !user) {
                toast.error("Missing fields!");
                return;
            }

            const uniqueID = uniqid();

            // Upload the files
            const { data: songData, error: songError } =
                await supabaseClient.storage
                    .from("songs")
                    .upload(`song-${values.title}-${uniqueID}`, songFile, {
                        cacheControl: "3600",
                        upsert: false,
                    });

            if (songError) {
                setIsLoading(false);
                return toast.error("Failed to upload song");
            }

            // Upload the files
            const { data: imageData, error: imageError } =
                await supabaseClient.storage
                    .from("images")
                    .upload(`image-${values.title}-${uniqueID}`, imageFile, {
                        cacheControl: "3600",
                        upsert: false,
                    });

            if (imageError) {
                setIsLoading(false);
                return toast.error("Failed to upload image");
            }

            const { error: supabaseError } = await supabaseClient
                .from("songs")
                .insert({
                    user_id: user.id,
                    title: values.title,
                    author: values.author,
                    image_path: imageData.path,
                    song_path: songData.path,
                });

            if (supabaseError) {
                setIsLoading(false);
                return toast.error(supabaseError.message);
            }

            router.refresh();
            setIsLoading(false);
            toast.success("Song created!");
            reset();
            uploadModal.onClose();
        } catch (error) {
            toast.error("Something went wrong, try again");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Modal
            title="Add a song"
            description="Upload an mp3 file"
            isOpen={uploadModal.isOpen}
            onChange={onChange}
        >
            <form className={styles["form"]} onSubmit={handleSubmit(onSubmit)}>
                <Input
                    id="title"
                    disabled={isLoading}
                    {...register("title", { required: true })}
                    placeholder="Song title"
                />
                <Input
                    id="author"
                    disabled={isLoading}
                    {...register("author", { required: true })}
                    placeholder="Song author"
                />
                <div>
                    <div className={styles["input-padding"]}>Select a song</div>
                    <Input
                        id="song"
                        type="file"
                        disabled={isLoading}
                        accept=".mp3"
                        {...register("song", { required: true })}
                    />
                </div>
                <div>
                    <div className={styles["input-padding"]}>
                        Select an image
                    </div>
                    <Input
                        id="image"
                        type="file"
                        disabled={isLoading}
                        accept="image/*"
                        {...register("image", { required: true })}
                    />
                </div>
                <Button disabled={isLoading} type="submit">
                    Create
                </Button>
            </form>
        </Modal>
    );
}
