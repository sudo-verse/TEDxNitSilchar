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

    return (
        <div
            ref={statsRef}
            className='grid grid-cols-2 lg:grid-cols-4 gap-8'
        >
            {statsData.map((stat, index) => (
                <div
                    key={stat.label}
                    className={cn(
                        'text-center transition-all duration-700 transform',
                        hasBeenInView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                    )}
                    style={{ transitionDelay: `${index * 100}ms` }}
                >
                    <div className='space-y-2'>
                        <div className='text-4xl md:text-5xl font-bold text-(--color-tedx-red)'>
                            {stat.value}
                            {stat.suffix}
                        </div>
                        <p className='text-gray-300 font-medium'>{stat.label}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
