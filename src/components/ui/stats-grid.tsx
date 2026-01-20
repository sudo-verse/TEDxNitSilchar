import { useRef } from 'react';
import { motion } from 'framer-motion';
import { EventStats } from '@/types/event';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

interface StatsGridProps {
    stats: EventStats;
}

export const StatsGrid = ({ stats }: StatsGridProps) => {
    const statsRef = useRef<HTMLDivElement>(null);
    const { hasBeenInView } = useInView(statsRef, { threshold: 0.5 });

    const statsData = [
        { label: 'Inspiring Speakers', value: stats.speakers, suffix: '+' },
        { label: 'Expected Attendees', value: stats.attendees, suffix: '+' },
        { label: 'Years Running', value: stats.yearsRunning, suffix: '' },
        { label: 'Engaging Sessions', value: stats.sessions, suffix: '+' }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.6, ease: 'easeOut' }
        }
    };

    return (
        <motion.div
            ref={statsRef}
            className='grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8'
            variants={containerVariants}
            initial='hidden'
            animate={hasBeenInView ? 'visible' : 'hidden'}
        >
            {statsData.map(stat => (
                <motion.div
                    key={stat.label}
                    className='text-center'
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                    <div className='space-y-1.5 sm:space-y-2'>
                        <div className='text-3xl sm:text-4xl md:text-5xl font-bold text-(--color-tedx-red)'>
                            {stat.value}
                            {stat.suffix}
                        </div>
                        <p className='text-xs sm:text-sm md:text-base text-gray-300 font-medium'>{stat.label}</p>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};
