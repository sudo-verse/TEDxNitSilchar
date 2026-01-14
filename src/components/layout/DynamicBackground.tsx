import { motion } from 'framer-motion';

export const DynamicBackground = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-black" style={{ willChange: 'contents' }}>
            {/* Main animated gradient orbs */}
            <motion.div
                className="absolute inset-0 opacity-30"
                animate={{
                    background: [
                        'radial-gradient(circle at 20% 50%, rgba(235, 0, 40, 0.15) 0%, transparent 50%)',
                        'radial-gradient(circle at 80% 50%, rgba(235, 0, 40, 0.15) 0%, transparent 50%)',
                        'radial-gradient(circle at 20% 50%, rgba(235, 0, 40, 0.15) 0%, transparent 50%)',
                    ],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            />

            {/* Animated floating orbs - left side */}
            <motion.div
                className="absolute left-0 top-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-red-600/20 to-transparent blur-2xl"
                animate={{
                    y: [0, -40, 0],
                    x: [0, 30, 0],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                style={{ willChange: 'transform, opacity' }}
            />

            {/* Animated floating orbs - right side */}
            <motion.div
                className="absolute right-0 bottom-1/4 w-96 h-96 rounded-full bg-gradient-to-l from-blue-600/20 to-transparent blur-2xl"
                animate={{
                    y: [0, 40, 0],
                    x: [0, -30, 0],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                style={{ willChange: 'transform, opacity' }}
            />

            {/* Center glow effect */}
            <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-transparent via-red-600/10 to-transparent blur-2xl"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                style={{ willChange: 'transform, opacity' }}
            />

            {/* Subtle grid pattern overlay - static, no animation */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
                backgroundImage: `
                    linear-gradient(to right, rgba(235, 0, 40, 0.1) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(235, 0, 40, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '100px 100px',
            }} />

            {/* Reduced particle count for better performance */}
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={`particle-${i}`}
                    className="absolute w-0.5 h-0.5 bg-red-500/40 rounded-full"
                    initial={{
                        x: Math.random() * 100 + '%',
                        y: Math.random() * 100 + '%',
                    }}
                    animate={{
                        y: [0, -150],
                        opacity: [0, 0.6, 0],
                    }}
                    transition={{
                        duration: 12 + i * 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.5,
                    }}
                    style={{ willChange: 'transform, opacity' }}
                />
            ))}
        </div>
    );
};
