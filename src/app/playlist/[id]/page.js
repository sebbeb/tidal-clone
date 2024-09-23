import styles from "@/app/page.module.css";
import getSongsFromPlaylistId from "../../../../actions/getSongsFromPlaylistId";
import Header from "@/components/Header";
import Image from "next/image";
import LikedContent from "@/components/LikedContent";
import getPlaylistImageById from "../../../../actions/getPlaylistImageById";

export default async function Playlist({ params }) {
    const songs = await getSongsFromPlaylistId(params.id);
    const songsArray = songs.map((songData) => songData.songs);

    const playlist = await getPlaylistImageById(params.id);

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
                                src={playlist.url || "/images/liked.png"}
                            />
                        </div>
                        <div className={styles["liked-songs-text"]}>
                            <p className={styles["liked-songs-p"]}>Playlist</p>
                            <h1 className={styles["liked-songs-h1"]}>
                                {playlist.name}
                            </h1>
                        </div>
                    </div>
                </div>
            </Header>
            <LikedContent songs={songsArray} />
        </div>
    );
}
