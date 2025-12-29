import { useRef } from 'react';
import { Download, Handshake } from 'lucide-react';
import { motion } from 'framer-motion';
import { PartnerGrid } from '@/components/ui/partner-grid';
import { partnersData } from '@/data/partners';
import { useInView } from '@/hooks/useInView';

export const PartnersSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { hasBeenInView } = useInView(sectionRef, { threshold: 0.2 });

    return (
        <section
            id='partners'
            ref={sectionRef}
            className='py-20 bg-black'
        >
            <div className='container mx-auto px-4'>
                <div className='max-w-7xl mx-auto'>
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className='text-center max-w-4xl mx-auto mb-16'
                    >
                        <div className='space-y-6'>
                            <div className='space-y-4'>
                                <h2 className='text-4xl md:text-5xl font-bold text-white'>
                                    Our <span className='text-[var(--color-tedx-red)]'>Partners</span>
                                </h2>

                                <div className='w-24 h-1 bg-[var(--color-tedx-red)] mx-auto' />
                            </div>

                            <p className='text-xl text-gray-300 leading-relaxed'>
                                We're grateful to our partners who share our vision of spreading ideas worth spreading
                                and making TEDxNITSilchar possible.
                            </p>
                        </div>
                    </motion.div>

                    {/* Partners Grid */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={hasBeenInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className='space-y-16'
                    >
                        {partnersData.map((tier, index) => (
                            <motion.div
                                key={tier.name}
                                initial={{ opacity: 0, y: 50 }}
                                animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.4 + index * 0.2,
                                    ease: 'easeOut'
                                }}
                            >
                                <PartnerGrid
                                    partnerTier={tier}
                                    inView={hasBeenInView}
                                    index={index}
                                />
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Partnership CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
                        className='mt-20'
                    >
                        <div className='bg-gradient-to-r from-gray-800 to-[var(--color-tedx-red)]/10 rounded-2xl p-8 md:p-12 text-center'>
                            <div className='max-w-4xl mx-auto space-y-6'>
                                <div className='w-16 h-16 bg-[var(--color-tedx-red)]/20 rounded-full flex items-center justify-center mx-auto'>
                                    <Handshake className='w-8 h-8 text-[var(--color-tedx-red)]' />
                                </div>

                                <h3 className='text-3xl md:text-4xl font-bold text-white'>Partner with Us</h3>

                                <p className='text-lg text-gray-300 max-w-2xl mx-auto'>
                                    Join us in spreading ideas worth spreading. Partner with TEDxNITSilchar and be part
                                    of an inspiring event that brings together innovation, culture, and positive change.
                                </p>

                                <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => window.open('#partnership-deck', '_blank')}
                                        className='inline-flex items-center gap-2 px-8 py-3 bg-[var(--color-tedx-red)] text-white rounded-lg hover:bg-[var(--color-tedx-red)]/90 transition-colors font-semibold'
                                    >
                                        <Download className='w-5 h-5' />
                                        Download Partnership Deck
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => window.open('#become-partner', '_blank')}
                                        className='px-8 py-3 border-2 border-[var(--color-tedx-red)] text-[var(--color-tedx-red)] rounded-lg hover:bg-[var(--color-tedx-red)] hover:text-white transition-colors font-semibold'
                                    >
                                        Become a Partner
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
