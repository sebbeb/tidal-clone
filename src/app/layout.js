import { Figtree } from "next/font/google";
import "./globals.css";

import Sidebar from "@/components/Sidebar";
import SupabaseProvider from "../../providers/SupabaseProvider";
import UserProvider from "../../providers/UserProvider";
import ModalProvider from "../../providers/ModalProvider";
import ToasterProvider from "../../providers/ToasterProvider";
import getSongByUserId from "../../actions/getSongsByUserId";
import Player from "@/components/Player";
import getPlaylistById from "../../actions/getPlaylistById";

const font = Figtree({ subsets: ["latin"] });

export const metadata = {
    title: "Tidal Clone",
    description: "Listen to some nice music",
};

export const revalidate = 0;

export default async function RootLayout({ children }) {
    const userPlaylists = await getPlaylistById();
    const userSongs = await getSongByUserId();

    return (
        <html lang="en">
            <body className={font.className}>
                <ToasterProvider />
                <SupabaseProvider>
                    <UserProvider>
                        <ModalProvider playlists={userPlaylists} />
                        <Sidebar songs={userSongs} playlists={userPlaylists}>
                            {children}
                        </Sidebar>
                        <Player />
                    </UserProvider>
                </SupabaseProvider>
            </body>
        </html>
    );
}
