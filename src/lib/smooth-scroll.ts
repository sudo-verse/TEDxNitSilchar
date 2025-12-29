export const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
};

export const scrollToTop = () => {
    // Scroll both window and root container to handle different scroll configurations
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    // Also scroll the root container which is the actual scroll container
    const rootElement = document.getElementById('root');
    if (rootElement) {
        rootElement.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};
