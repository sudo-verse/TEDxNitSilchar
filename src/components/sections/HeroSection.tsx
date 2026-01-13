import { useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { CTAButton } from '@/components/ui/cta-button';
import { EventCard } from '@/components/ui/event-card';
import { eventDetails } from '@/data/event';
import { useInView } from '@/hooks/useInView';

export const HeroSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { hasBeenInView } = useInView(sectionRef, { threshold: 0.3 });

    return (
        <section
            id='home'
            ref={sectionRef}
            className='relative min-h-screen flex items-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden pt-20 pb-8 md:pt-20 md:pb-0'
        >
            {/* Background Pattern */}
            <div className='absolute inset-0 opacity-10'>
                <div className='absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.15)_1px,_transparent_0)] bg-[length:50px_50px]' />
            </div>

            {/* Background Video Placeholder */}
            <div className='absolute inset-0 bg-gradient-to-br from-black/70 via-transparent to-black/70' />

            <div className='container mx-auto px-6 sm:px-8 md:px-4 relative z-10 pb-16 lg:pb-16'>
                <div className='grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center'>
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        animate={hasBeenInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className='space-y-6 sm:space-y-8 pl-4 sm:pl-6 md:pl-8 lg:pl-0'
                    >
                        {/* Main Headline */}
                        <div className='space-y-4'>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={hasBeenInView ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                            >
                                <h1 className='text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight'>
                                    <motion.span
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                                        className='block'
                                    >
                                        {eventDetails.theme.split(' ').slice(0, 2).join(' ')}
                                    </motion.span>
                                    <motion.span
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                        transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                                        className='block text-[var(--color-tedx-red)]'
                                    >
                                        {eventDetails.theme.split(' ').slice(2).join(' ')}
                                    </motion.span>
                                </h1>
                            </motion.div>

                            <p className='text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl'>
                                {eventDetails.tagline}
                            </p>

                            <div className='space-y-4 sm:space-y-3'>
                                <div className='inline-block bg-[var(--color-tedx-red)]/20 border border-[var(--color-tedx-red)]/30 rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-[var(--color-tedx-red)] mb-3 sm:mb-2'>
                                    🎉 INAUGURAL EVENT • FIRST TIME IN NIT SILCHAR
                                </div>
                                <p className='text-sm sm:text-base text-gray-400 leading-relaxed max-w-2xl'>
                                    Join us for an extraordinary day of inspiring talks, innovative ideas, and
                                    meaningful connections as we make history with the very first TEDx event at National
                                    Institute of Technology Silchar.
                                </p>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
                            className='flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-0'
                        >
                            <motion.div
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                            >
                                <CTAButton
                                    href='#register'
                                    size='lg'
                                    className='text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4'
                                >
                                    Buy Tickets
                                </CTAButton>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                            >
                                <CTAButton
                                    href='#partner'
                                    variant='secondary'
                                    size='lg'
                                    className='text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 border-white/30 text-white hover:bg-white hover:text-black'
                                >
                                    Become a Partner
                                </CTAButton>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Event Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 100, rotateY: 10 }}
                        animate={hasBeenInView ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: 100, rotateY: 10 }}
                        transition={{ duration: 0.9, delay: 0.3, ease: [0.23, 1, 0.320, 1] }}
                        className='flex justify-center lg:justify-end mt-8 lg:mt-0'
                        style={{ perspective: 1000 }}
                    >
                        <div className='w-full max-w-xs sm:max-w-sm'>
                            <EventCard event={eventDetails} />
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className='absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:flex'
                >
                    <button
                        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                        className='flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors group'
                    >
                        <span className='text-sm font-medium'>Discover More</span>
                        <motion.div
                            animate={{ y: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <ArrowDown className='w-5 h-5 group-hover:animate-none' />
                        </motion.div>
                    </button>
                </motion.div>
            </div>
        </section>
    );
};
