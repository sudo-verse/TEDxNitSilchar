import { useState, useEffect } from 'react';

export const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMoving, setIsMoving] = useState(false);
    let movementTimeout: NodeJS.Timeout;

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            setIsMoving(true);

            // Reset movement flag after inactivity
            clearTimeout(movementTimeout);
            movementTimeout = setTimeout(() => {
                setIsMoving(false);
            }, 100);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearTimeout(movementTimeout);
        };
    }, []);

    return { mousePosition, isMoving };
};
