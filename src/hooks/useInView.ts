import { useState, useEffect, RefObject, useCallback } from 'react';

export const useInView = (ref: RefObject<HTMLElement | null>, options: IntersectionObserverInit = {}) => {
    const [isInView, setIsInView] = useState(false);
    const [hasBeenInView, setHasBeenInView] = useState(false);

    const handleIntersection = useCallback(
        ([entry]: IntersectionObserverEntry[]) => {
            const inView = entry.isIntersecting;
            setIsInView(inView);
            if (inView && !hasBeenInView) {
                setHasBeenInView(true);
            }
        },
        [hasBeenInView]
    );

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Enhanced options for better mobile compatibility
        const observerOptions = {
            threshold: 0.1, // Lower threshold for mobile
            rootMargin: '50px', // Add margin for earlier detection
            ...options
        };

        // Check if IntersectionObserver is supported
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(handleIntersection, observerOptions);
            observer.observe(element);

            return () => {
                observer.disconnect();
            };
        } else {
            // Fallback for older browsers - assume in view
            setIsInView(true);
            setHasBeenInView(true);
        }
    }, [handleIntersection, options, ref]);

    return { isInView, hasBeenInView };
};
