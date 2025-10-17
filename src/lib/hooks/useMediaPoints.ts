'use client'

import {useMediaQuery} from "react-responsive";

export const useMediaPoints = () => {
    const isMobile = useMediaQuery({query: '(max-width: 767px)'});
    const isDesktop = useMediaQuery({query: '(min-width: 768px)'});

    return {
        isMobile,
        isDesktop
    };
}