import { motion } from 'framer-motion';

export const DynamicBackground = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" style={{ willChange: 'contents' }}>
            {/* Dot Pattern Overlay */}
            <div className='absolute inset-0 opacity-5 pointer-events-none'>
                <div className='absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.2)_1px,_transparent_0)] bg-[length:50px_50px]' />
            </div>

            {/* Gradient Overlay */}
            <div className='absolute inset-0 bg-gradient-to-br from-slate-900/50 via-transparent to-slate-900/50 pointer-events-none' />

            {/* Main animated gradient orbs */}
            <motion.div
                className="absolute inset-0 opacity-30"
                animate={{
                    background: [
                        'radial-gradient(circle at 20% 50%, rgba(235, 0, 40, 0.08) 0%, transparent 50%)',
                        'radial-gradient(circle at 80% 50%, rgba(235, 0, 40, 0.08) 0%, transparent 50%)',
                        'radial-gradient(circle at 20% 50%, rgba(235, 0, 40, 0.08) 0%, transparent 50%)',
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
                className="absolute left-0 top-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-red-500/10 to-transparent blur-3xl"
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
                className="absolute right-0 bottom-1/4 w-96 h-96 rounded-full bg-gradient-to-l from-slate-400/8 to-transparent blur-3xl"
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

            {/* Center glow effect - subtle */}
            <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-transparent via-red-500/5 to-transparent blur-3xl"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.35, 0.2],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                style={{ willChange: 'transform, opacity' }}
            />

            {/* Reduced particle count for better performance */}
            {[...Array(2)].map((_, i) => (
                <motion.div
                    key={`particle-${i}`}
                    className="absolute w-0.5 h-0.5 bg-red-500/30 rounded-full"
                    initial={{
                        x: Math.random() * 100 + '%',
                        y: Math.random() * 100 + '%',
                    }}
                    animate={{
                        y: [0, -150],
                        opacity: [0, 0.4, 0],
                    }}
                    transition={{
                        duration: 14 + i * 3,
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
