'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Root as VisuallyHidden } from '@radix-ui/react-visually-hidden';
import Image from 'next/image';
import styles from './ImageModal.module.css';
import { Item } from '@/lib/types/types';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    image: Item | null;
    alt: string;
};

export default function ImageModal({ isOpen, onClose, image, alt }: Props) {
    return (
        <Dialog.Root open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
            <Dialog.Portal>
                <Dialog.Overlay className={styles.overlay} />
                <Dialog.Content
                    className={styles.wrapper}
                    onInteractOutside={(e) => {
                        e.preventDefault();
                        onClose();
                    }}
                >
                    <VisuallyHidden>
                        <Dialog.Title>{alt || 'Image preview'}</Dialog.Title>
                    </VisuallyHidden>



                    <div className={styles.panel}>
                        {image && (
                            <div className={styles.frame}>
                                <button
                                    type="button"
                                    aria-label="Close"
                                    className={styles.close}
                                    onClick={onClose}
                                >
                                    <Image src="/img/icons/close.svg"
                                           alt="close"
                                           width={40}
                                           height={40} />
                                </button>
                                <Image
                                    src={image.url}
                                    alt={alt}
                                    width={544}
                                    height={900}
                                    priority
                                    className={styles.img}
                                />
                            </div>
                        )}
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
