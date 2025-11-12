'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Root as VisuallyHidden } from '@radix-ui/react-visually-hidden';
import Image from 'next/image';
import styles from './ImageModal.module.css';
import { Item } from '@/lib/types/types';
import {useCallback, useEffect, useRef, useState} from "react";
import type { CSSProperties } from 'react';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    image: Item | null;
    alt: string;
};



export default function ImageModal({ isOpen, onClose, image, alt }: Props) {
    const frameRef = useRef<HTMLDivElement>(null);
    const [nat, setNat] = useState<{w:number; h:number} | null>(null);
    const [pads, setPads] = useState<{x:number; y:number}>({x:0, y:0});

    type ModalVars = CSSProperties & Record<'--pad-x' | '--pad-y', string>;

    const styleVars: ModalVars = {
        '--pad-x': `${pads.x}px`,
        '--pad-y': `${pads.y}px`,
    };

    const recalcPads = useCallback(() => {
        const frame = frameRef.current;
        if (!frame || !nat) return;
        const wF = frame.clientWidth;
        const hF = frame.clientHeight;
        const scale = Math.min(wF / nat.w, hF / nat.h);
        const wImg = nat.w * scale;
        const hImg = nat.h * scale;
        setPads({ x: Math.max((wF - wImg) / 2, 0), y: Math.max((hF - hImg) / 2, 0) });
    }, [nat]);

    useEffect(() => {
        if (!isOpen) return;
        recalcPads();
        const onResize = () => recalcPads();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [isOpen, recalcPads]);

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
                            <div
                                ref={frameRef}
                                className={styles.frame}
                                style={styleVars}
                            >
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
                                <div className={styles.imgClip}>
                                    <Image
                                        src={image.url}
                                        alt={alt}
                                        width={544}
                                        height={900}
                                        priority
                                        className={styles.img}
                                        onLoadingComplete={(el) => {
                                            setNat({ w: el.naturalWidth, h: el.naturalHeight });
                                            requestAnimationFrame(recalcPads);
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
