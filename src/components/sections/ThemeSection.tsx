import { useRef } from 'react';
import { Lightbulb, Users, Mountain, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { ThemeCard } from '@/components/ui/theme-card';
import { CTAButton } from '@/components/ui/cta-button';
import { themeDescription } from '@/data/event';
import { useInView } from '@/hooks/useInView';

const iconMap = {
    Lightbulb,
    Users,
    Mountain,
    TrendingUp
};

export const ThemeSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { hasBeenInView } = useInView(sectionRef, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    return (
        <section
            id='theme'
            ref={sectionRef}
            className='py-12 sm:py-16 lg:py-20 bg-black'
        >
            <div className='container mx-auto px-6 sm:px-8 lg:px-4'>
                <div className='max-w-7xl mx-auto'>
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                        transition={{ duration: 0.8, ease: [0.23, 1, 0.320, 1] }}
                        className='text-center max-w-4xl mx-auto mb-10 sm:mb-12 lg:mb-16'
                    >
                        <div className='space-y-5 sm:space-y-6'>
                            <div className='space-y-3 sm:space-y-4'>
                                <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white'>
                                    Theme 2026:{' '}
                                    <span className='text-[var(--color-tedx-red)]'>{themeDescription.title}</span>
                                </h2>

                                <div className='w-24 h-1 bg-[var(--color-tedx-red)] mx-auto' />
                            </div>

                            <p className='text-lg sm:text-xl text-gray-300 leading-relaxed'>
                                {themeDescription.description}
                            </p>
                        </div>
                    </motion.div>

                    {/* Theme Pillars Grid */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={hasBeenInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8'
                    >
                        {themeDescription.pillars.map((pillar, index) => {
                            const IconComponent = iconMap[pillar.icon as keyof typeof iconMap];
                            const isEven = index % 2 === 0;

                            return (
                                <motion.div
                                    key={pillar.id}
                                    initial={{ opacity: 0, x: isEven ? -40 : 40, y: 30 }}
                                    animate={hasBeenInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: isEven ? -40 : 40, y: 30 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: 0.2 + index * 0.12,
                                        ease: [0.23, 1, 0.320, 1]
                                    }}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <ThemeCard
                                        title={pillar.title}
                                        description={pillar.description}
                                        icon={IconComponent}
                                        index={index}
                                        inView={hasBeenInView}
                                    />
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* Call to Action */}
                    <motion.div
                        initial={{ opacity: 0, y: 60, scale: 0.95 }}
                        animate={hasBeenInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.95 }}
                        transition={{ duration: 0.8, delay: 0.8, ease: [0.23, 1, 0.320, 1] }}
                        className='text-center mt-10 sm:mt-12 lg:mt-16'
                    >
                        <div className='bg-gray-800 rounded-2xl p-6 sm:p-8 md:p-12 shadow-lg max-w-4xl mx-auto'>
                            <div className='space-y-5 sm:space-y-6'>
                                <h3 className='text-xl sm:text-2xl md:text-3xl font-bold text-white'>
                                    Ready to Share Your Legacy?
                                </h3>

                                <p className='text-base sm:text-lg text-gray-300'>
                                    Whether you're an entrepreneur, researcher, artist, or change-maker, we'd love to
                                    hear how you're turning lessons into legacies.
                                </p>

                                <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center'>
                                    <motion.div
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                                    >
                                        <CTAButton
                                            href='#speaker-nomination'
                                            className='px-8 py-3 text-white font-semibold'
                                        >
                                            Nominate a Speaker
                                        </CTAButton>
                                    </motion.div>

                                    <motion.div
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                                    >
                                        <CTAButton
                                            href='#volunteer'
                                            variant='secondary'
                                            className='px-8 py-3 border-white/30 text-[var(--color-tedx-red)] hover:bg-[var(--color-tedx-red)] hover:text-white font-semibold'
                                        >
                                            Join Our Team
                                        </CTAButton>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
