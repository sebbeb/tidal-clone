"use client";

import { useRouter } from "next/navigation";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";

import Button from "./Button";

import styles from "@/app/page.module.css";
import useAuthModal from "../../hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "../../hooks/useUser";
import Link from "next/link";

export default function Header({ children, className }) {
    const authModal = useAuthModal();
    const router = useRouter();

    const supabaseClient = useSupabaseClient();
    const { user } = useUser();

    async function handleLogOut() {
        const { error } = await supabaseClient.auth.signOut();

        router.refresh();

        if (error) {
            toast.error(error.message);
        } else {
            toast.success("Logged out!");
        }
    }

    return (
        <div className={`${styles["header"]} ${className}`}>
            <div className={styles["header-first"]}>
                <div className={styles["header-second"]}>
                    <button
                        onClick={() => router.back()}
                        className={styles["header-button"]}
                    >
                        <RxCaretLeft
                            className={styles["header-icon"]}
                            size={35}
                        />
                    </button>
                    <button
                        onClick={() => router.forward()}
                        className={styles["header-button"]}
                    >
                        <RxCaretRight
                            className={styles["header-icon"]}
                            size={35}
                        />
                    </button>
                </div>
                <div className={styles["header-mobile"]}>
                    <Link href="/" className={styles["header-mobile-button"]}>
                        <HiHome
                            className={styles["header-mobile-icon"]}
                            size={20}
                        />
                    </Link>
                    <Link
                        href="/search"
                        className={styles["header-mobile-button"]}
                    >
                        <BiSearch
                            className={styles["header-mobile-icon"]}
                            size={20}
                        />
                    </Link>
                </div>
                <div className={styles["header-login"]}>
                    {user ? (
                        <div className={styles["logged-in"]}>
                            <Button
                                onClick={handleLogOut}
                                className={styles["logged-in-button-1"]}
                            >
                                Log out
                            </Button>
                            <Button
                                onClick={handleLogOut}
                                className={styles["logged-in-button-2"]}
                            >
                                <FaUserAlt />
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div>
                                <Button
                                    onClick={authModal.onOpen}
                                    className={styles["sign-up-button"]}
                                >
                                    Sign up
                                </Button>
                            </div>
                            <div>
                                <Button
                                    onClick={authModal.onOpen}
                                    className={styles["log-in-button"]}
                                >
                                    Log in
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {children}
        </div>
    );
}
