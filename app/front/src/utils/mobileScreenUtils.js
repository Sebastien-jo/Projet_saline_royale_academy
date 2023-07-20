import { useEffect, useState } from 'react';

export const useIsMobileScreen = (breakpoint = 991) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < breakpoint);
        };

        window.addEventListener('resize', handleResize);

        // Optionally, you can call handleResize once on mount to set the initial value.
        // handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [breakpoint]);

    return isMobile;
};

