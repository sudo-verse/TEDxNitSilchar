import { useRef } from 'react';
import { motion } from 'framer-motion';
import { StatsGrid } from '@/components/ui/stats-grid';
import { eventStats } from '@/data/event';
import { useInView } from '@/hooks/useInView';

export const AboutSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { hasBeenInView } = useInView(sectionRef, { threshold: 0.3 });

    return (
        <section
            id='about'
            ref={sectionRef}
            className='py-12 sm:py-16 lg:py-20 bg-black'
        >
            <div className='container mx-auto px-6 sm:px-8 lg:px-4'>
                <div className='max-w-7xl mx-auto'>
                    <div className='grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-8 sm:mb-12 lg:mb-16'>
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={hasBeenInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className='space-y-5 sm:space-y-6'
                        >
                            <div className='space-y-4'>
                                <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white'>
                                    About <span className='text-[var(--color-tedx-red)]'>TEDx</span>NITSilchar
                                </h2>

                                <div className='w-24 h-1 bg-[var(--color-tedx-red)]' />
                            </div>

                            <div className='space-y-4 sm:space-y-5 text-gray-300 text-base sm:text-lg leading-relaxed'>
                                <div className='bg-gradient-to-r from-[var(--color-tedx-red)]/10 to-transparent border-l-4 border-[var(--color-tedx-red)] pl-3 sm:pl-4 py-2 mb-4'>
                                    <p className='text-[var(--color-tedx-red)] font-semibold text-xs sm:text-sm uppercase tracking-wide'>
                                        Making History • Inaugural Event
                                    </p>
                                </div>

                                <p>
                                    <strong>TEDxNITSilchar</strong> marks a historic milestone as the very first TEDx
                                    event to be held at National Institute of Technology Silchar, bringing the spirit of
                                    TED's mission to the heart of Northeast India for the first time. Our inaugural
                                    event showcases innovative ideas, breakthrough research, and inspiring stories from
                                    the region and beyond.
                                </p>

                                <p>
                                    Operating under license from TED, we are pioneering this groundbreaking experience
                                    that celebrates the unique perspective of Northeast India while addressing global
                                    challenges. Our speakers include researchers, entrepreneurs, artists, and
                                    change-makers who are turning their lessons into lasting legacies.
                                </p>

                                <p>
                                    As the inaugural TEDx event at the prestigious National Institute of Technology
                                    Silchar, this historic gathering serves as a bridge between academic excellence and
                                    real-world impact, inspiring the next generation of innovators and leaders in a
                                    truly unprecedented way.
                                </p>
                            </div>

                            <div className='pt-3 sm:pt-4'>
                                <p className='text-xs sm:text-sm text-gray-400 italic'>
                                    This independent TEDx event is operated under license from TED.
                                </p>
                            </div>
                        </motion.div>

                        {/* Right Content - Stats */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={hasBeenInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                        >
                            <div className='bg-gray-800 rounded-2xl p-6 sm:p-8 md:p-12'>
                                <div className='text-center mb-6 sm:mb-8'>
                                    <h3 className='text-xl sm:text-2xl font-bold text-white mb-2'>Event at a Glance</h3>
                                    <p className='text-sm sm:text-base text-gray-300'>
                                        Numbers that showcase our impact
                                    </p>
                                </div>

                                <StatsGrid stats={eventStats} />
                            </div>
                        </motion.div>
                    </div>

                    {/* Mission Statement */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
                        className='text-center max-w-4xl mx-auto'
                    >
                        <div className='bg-gradient-to-r from-[var(--color-tedx-red)]/20 to-gray-800/50 rounded-2xl p-6 sm:p-8 md:p-12'>
                            <blockquote className='text-lg sm:text-xl md:text-2xl font-medium text-gray-200 leading-relaxed'>
                                "We believe in the power of ideas to change attitudes, lives, and ultimately, the world.
                                As we make history with the first-ever TEDx event at NIT Silchar, we're proud to pioneer
                                the spread of transformative ideas from the heart of Northeast India."
                            </blockquote>
                            <cite className='block mt-4 sm:mt-6 text-sm sm:text-base text-gray-300 font-medium'>
                                — TEDxNITSilchar Organizing Committee
                            </cite>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};