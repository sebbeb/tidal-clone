import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";

import styles from "@/app/page.module.css";
import { Children } from "react";

export default function Modal({
    title,
    description,
    isOpen,
    onChange,
    children,
}) {
    return (
        <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
            <Dialog.Portal>
                <Dialog.Overlay className={styles["modal-overlay"]} />
                <Dialog.Content className={styles["modal-content"]}>
                    <Dialog.Title className={styles["modal-title"]}>
                        {title}
                    </Dialog.Title>
                    <Dialog.Description className={styles["modal-desc"]}>
                        {description}
                    </Dialog.Description>
                    <div>{children}</div>
                    <Dialog.Close asChild={true}>
                        <button className={styles["modal-button-close"]}>
                            <IoMdClose />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
