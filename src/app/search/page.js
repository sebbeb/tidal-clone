import Header from "@/components/Header";
import getSongsFromTitle from "../../../actions/getSongsByTitle";

import styles from "@/app/page.module.css";
import SearchContent from "@/components/SearchContent";
import SearchInput from "@/components/SearchInput";

export default async function Search({ searchParams }) {
    const songs = await getSongsFromTitle(searchParams.title);

    return (
        <div className={styles["wrapper-search"]}>
            <Header className={styles["header-search"]}>
                <div className={styles["header-search-div"]}>
                    <h1>Search</h1>
                    <SearchInput />
                </div>
            </Header>
            <SearchContent songs={songs} />
        </div>
    );
}
