import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Scroll both window and root container to handle different scroll configurations
        window.scrollTo(0, 0);

        // Also scroll the root container which is the actual scroll container
        const rootElement = document.getElementById('root');
        if (rootElement) {
            rootElement.scrollTo(0, 0);
        }
    }, [pathname]);

    return null;
};
