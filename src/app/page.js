import Header from "@/components/Header";
import ListItem from "@/components/ListItem";

import styles from "./page.module.css";
import getSongs from "../../actions/getSongs";
import PageContent from "@/components/PageContent";

export const revalidate = 0;

export default async function Home() {
    const songs = await getSongs();

    return (
        <div className={styles["main-content"]}>
            <Header>
                <div className={styles["wrapper-list"]}>
                    <h1 className={styles["h1"]}>Welcome back</h1>
                    <div className={styles["list-items"]}>
                        <ListItem
                            image="/images/liked.png"
                            name="Liked Songs"
                            href="liked"
                        />
                    </div>
                </div>
            </Header>
            <div className={styles["wrapper-new-songs"]}>
                <div className={styles["new-songs-text"]}>
                    <h1 className={styles["new-songs-h1"]}>Newest songs</h1>
                </div>
                <PageContent songs={songs} />
            </div>
        </div>
    );
}
