"use client";

import uniqid from "uniqid";
import { Form, useForm } from "react-hook-form";
import Modal from "./Modal";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";

import styles from "@/app/page.module.css";
import { useUser } from "../../hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useUploadPlaylistModal from "../../hooks/useUploadPlaylistModal";

export default function UploadPlaylistModal() {
    const [isLoading, setIsLoading] = useState(false);
    const uploadPlaylistModal = useUploadPlaylistModal();
    const { user } = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const { register, handleSubmit, reset } = useForm({
        defaultValues: { name: "", image: null },
    });

    function onChange(open) {
        if (!open) {
            reset();
            uploadPlaylistModal.onClose();
        }
    }

    async function onSubmit(values) {
        try {
            setIsLoading(true);

            const imageFile = values.image?.[0];

            if (!imageFile || !user) {
                toast.error("Missing fields!");
                return;
            }

            const uniqueID = uniqid();

            // Upload the image
            const { data: imageData, error: imageError } =
                await supabaseClient.storage
                    .from("images")
                    .upload(`image-${values.name}-${uniqueID}`, imageFile, {
                        cacheControl: "3600",
                        upsert: false,
                    });

            if (imageError) {
                console.log(imageError.message);
                setIsLoading(false);
                return toast.error("Failed to upload image");
            }

            const { error: supabaseError } = await supabaseClient
                .from("playlists")
                .insert({
                    user_id: user.id,
                    name: values.name,
                    image_path: imageData.path,
                });

            if (supabaseError) {
                setIsLoading(false);
                return toast.error(supabaseError.message);
            }

            router.refresh();
            setIsLoading(false);
            toast.success("Playlist created!");
            reset();
            uploadPlaylistModal.onClose();
        } catch (error) {
            console.log(error.message);
            toast.error("Something went wrong, try again");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Modal
            title="New playlist"
            description="Create a new playlist"
            isOpen={uploadPlaylistModal.isOpen}
            onChange={onChange}
        >
            <form className={styles["form"]} onSubmit={handleSubmit(onSubmit)}>
                <Input
                    id="name"
                    disabled={isLoading}
                    {...register("name", { required: true })}
                    placeholder="Playlist name"
                />
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
