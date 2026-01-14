import { motion } from 'framer-motion';

export const DynamicBackground = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-black">
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
                className="absolute left-0 top-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-red-600/20 to-transparent blur-3xl"
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
            />

            {/* Animated floating orbs - right side */}
            <motion.div
                className="absolute right-0 bottom-1/4 w-96 h-96 rounded-full bg-gradient-to-l from-blue-600/20 to-transparent blur-3xl"
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
            />

            {/* Center glow effect */}
            <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-transparent via-red-600/10 to-transparent blur-3xl"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Subtle grid pattern overlay */}
            <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: `
                    linear-gradient(to right, rgba(235, 0, 40, 0.1) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(235, 0, 40, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '100px 100px',
            }} />

            {/* Animated accent lines */}
            <motion.div
                className="absolute inset-0 opacity-10"
                animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: 'linear',
                }}
                style={{
                    background: 'linear-gradient(45deg, rgba(235, 0, 40, 0.1) 0%, transparent 50%, rgba(59, 130, 246, 0.1) 100%)',
                    backgroundSize: '200% 200%',
                }}
            />

            {/* Floating particles - small dots */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={`particle-${i}`}
                    className="absolute w-1 h-1 bg-red-500/30 rounded-full"
                    initial={{
                        x: Math.random() * 100 + '%',
                        y: Math.random() * 100 + '%',
                    }}
                    animate={{
                        y: [0, -100, -200],
                        x: Math.sin(i) * 50,
                        opacity: [0, 0.5, 0],
                    }}
                    transition={{
                        duration: 10 + i * 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
};
