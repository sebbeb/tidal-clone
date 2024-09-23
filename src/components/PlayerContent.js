"use client";

import styles from "@/app/page.module.css";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerXMark, HiSpeakerWave } from "react-icons/hi2";
import Slider from "./Slider";
import usePlayer from "../../hooks/usePlayer";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import AddToPlaylist from "./AddToPlaylist";

export default function PlayerContent({ song, songUrl }) {
    const player = usePlayer();
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);

    const Icon = isPlaying ? BsPauseFill : BsPlayFill;
    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

    function onPlayNext() {
        if (player.ids.length === 0) return;

        const currentIndex = player.ids.findIndex(
            (id) => id === player.activeId
        );
        const nextSong = player.ids[currentIndex + 1];

        if (!nextSong) return player.setId(player.ids[0]);

        player.setId(nextSong);
    }

    function onPlayPrev() {
        if (player.ids.length === 0) return;

        const currentIndex = player.ids.findIndex(
            (id) => id === player.activeId
        );
        const prevSong = player.ids[currentIndex - 1];

        if (!prevSong) return player.setId(player.ids[player.ids.length - 1]);

        player.setId(prevSong);
    }

    const [play, { pause, sound }] = useSound(songUrl, {
        volume,
        onplay: () => setIsPlaying(true),
        onend: () => {
            setIsPlaying(false);
            onPlayNext();
        },
        onpause: () => setIsPlaying(false),
        format: ["mp3"],
    });

    useEffect(() => {
        sound?.play();

        return () => {
            sound?.unload();
        };
    }, [sound]);

    function handlePlay() {
        if (!isPlaying) play();
        else pause();
    }

    function toggleMute() {
        if (volume === 0) setVolume(1);
        else setVolume(0);
    }

    return (
        <div className={styles["wrapper-player-content"]}>
            <div className={styles["inner-player-content"]}>
                <div className={styles["inner-inner-player-content"]}>
                    <MediaItem data={song} />
                    <LikeButton songId={song.id} />
                    <AddToPlaylist song={song} />
                </div>
            </div>
            <div className={styles["inner2-player-content"]}>
                <div
                    onClick={handlePlay}
                    className={styles["inner-inner2-player-content"]}
                >
                    <Icon size={30} className={styles["player-icon"]} />
                </div>
            </div>
            <div className={styles["player-controls"]}>
                <AiFillStepBackward
                    onClick={onPlayPrev}
                    size={30}
                    className={styles["player-forward-backward"]}
                />
                <div
                    onClick={handlePlay}
                    className={styles["player-icon-wrap"]}
                >
                    <Icon size={30} className={styles["player-icon"]} />
                </div>
                <AiFillStepForward
                    onClick={onPlayNext}
                    size={30}
                    className={styles["player-forward-backward"]}
                />
            </div>

            <div className={styles["player-speaker-wrapper"]}>
                <div className={styles["player-speaker"]}>
                    <VolumeIcon
                        onClick={toggleMute}
                        className={styles["player-speaker-icon"]}
                        size={34}
                    />
                    <Slider
                        value={volume}
                        onChange={(value) => setVolume(value)}
                    />
                </div>
            </div>
        </div>
    );
}
