import Header from "@/components/Header";
import getLikedSongs from "../../../actions/getLikedSongs";
import Image from "next/image";

import styles from "@/app/page.module.css";
import LikedContent from "@/components/LikedContent";

export const revalidate = 0;

export default async function Liked() {
    const songs = await getLikedSongs();

    return (
        <div className={styles["wrapper-liked"]}>
            <Header>
                <div className={styles["inner-wrapper-liked"]}>
                    <div className={styles["inner-inner-wrapper-liked"]}>
                        <div className={styles["image-wrapper-liked"]}>
                            <Image
                                fill={true}
                                alt="Playlist Image"
                                className={styles["liked-image"]}
                                src="/images/liked.png"
                            />
                        </div>
                        <div className={styles["liked-songs-text"]}>
                            <p className={styles["liked-songs-p"]}>Playlist</p>
                            <h1 className={styles["liked-songs-h1"]}>
                                Liked songs
                            </h1>
                        </div>
                    </div>
                </div>
            </Header>
            <LikedContent songs={songs} />
        </div>
    );
}
