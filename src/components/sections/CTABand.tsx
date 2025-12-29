import { useRef } from 'react';
import { motion } from 'framer-motion';
import { CTAButton } from '@/components/ui/cta-button';
import { useInView } from '@/hooks/useInView';

export const CTABand = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { hasBeenInView } = useInView(sectionRef, { threshold: 0.3 });

    return (
        <section
            id='register'
            ref={sectionRef}
            className='py-16 bg-(--color-tedx-red)'
        >
            <div className='container mx-auto px-4'>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={hasBeenInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className='max-w-4xl mx-auto text-center space-y-8'
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className='space-y-4'
                    >
                        <h2 className='text-4xl md:text-5xl font-bold text-white'>Join TEDxNITSilchar 2026</h2>

                        <p className='text-xl text-white/90 leading-relaxed'>
                            Be part of an extraordinary day of inspiring ideas, meaningful connections, and
                            transformative experiences at NIT Silchar.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className='flex flex-col sm:flex-row gap-4 justify-center'
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <CTAButton
                                href='#buy-tickets'
                                size='lg'
                                className='text-lg px-12 py-4 bg-white text-(--color-tedx-red) hover:bg-gray-100 border-0'
                            >
                                Buy Tickets Now
                            </CTAButton>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <CTAButton
                                href='#volunteer'
                                variant='secondary'
                                size='lg'
                                className='text-lg px-12 py-4 border-white/30 text-white hover:bg-white hover:text-(--color-tedx-red)'
                            >
                                Volunteer With Us
                            </CTAButton>
                        </motion.div>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={hasBeenInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className='text-white/70 text-sm'
                    >
                        Limited seats available • Early bird pricing ends soon
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
};
