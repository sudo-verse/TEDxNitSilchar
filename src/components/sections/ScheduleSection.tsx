import { useRef, useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

export const ScheduleSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { hasBeenInView } = useInView(sectionRef, {
        threshold: 0.1,
        rootMargin: '50px 0px'
    });
    const [fallbackVisible, setFallbackVisible] = useState(false);

    // Fallback for iOS Safari issues
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!hasBeenInView) {
                setFallbackVisible(true);
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [hasBeenInView]);

    const shouldAnimate = hasBeenInView || fallbackVisible;

    const handleDownloadSchedule = () => {
        alert("Schedule will be available for download once it's announced. Stay tuned!");
    };

    return (
        <section
            id='schedule'
            ref={sectionRef}
            className='py-12 sm:py-16 lg:py-20'
        >
            <div className='container mx-auto px-6 sm:px-8 lg:px-4'>
                <div className='max-w-7xl mx-auto'>
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className='text-center max-w-4xl mx-auto mb-16'
                    >
                        <div className='space-y-6'>
                            <div className='space-y-4'>
                                <h2 className='text-4xl md:text-5xl font-bold text-white'>
                                    Event <span className='text-[var(--color-tedx-red)]'>Schedule</span>
                                </h2>

                                <div className='w-24 h-1 bg-[var(--color-tedx-red)] mx-auto' />
                            </div>

                            <p className='text-xl text-gray-300 leading-relaxed'>
                                A full day of inspiring talks, performances, and networking opportunities. Mark your
                                calendar for February 08, 2026.
                            </p>

                            <button
                                onClick={handleDownloadSchedule}
                                className='inline-flex items-center gap-2 px-6 py-3 bg-gray-800 border border-[var(--color-tedx-red)] text-[var(--color-tedx-red)] rounded-lg hover:bg-[var(--color-tedx-red)] hover:text-white transition-colors font-semibold'
                            >
                                <Download className='w-5 h-5' />
                                Download Full Schedule
                            </button>
                        </div>
                    </motion.div>

                    {/* Schedule Announcement */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                        className='text-center'
                    >
                        <div className='bg-gray-800/30 backdrop-blur-sm rounded-2xl p-12 md:p-16 max-w-4xl mx-auto border border-gray-700/50 shadow-2xl'>
                            <div className='space-y-6'>
                                <div className='w-20 h-20 mx-auto mb-6 rounded-full bg-gray-700/50 flex items-center justify-center'>
                                    <div className='text-4xl'>📅</div>
                                </div>
                                <h3 className='text-3xl md:text-4xl font-bold text-white mb-4'>
                                    Schedule Will Be Announced Soon
                                </h3>
                                <p className='text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto'>
                                    We're curating an amazing lineup of speakers and activities for February 08, 2026.
                                    Stay tuned for the detailed schedule that will make this first-ever TEDx event at
                                    NIT Silchar unforgettable.
                                </p>
                                <div className='pt-4'>
                                    <p className='text-[var(--color-tedx-red)] font-semibold text-lg'>
                                        Follow us for updates!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Additional Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                        className='mt-16 text-center'
                    >
                        <div className='bg-gray-800 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto shadow-lg'>
                            <div className='space-y-4'>
                                <h3 className='text-2xl font-bold text-white'>Important Information</h3>

                                <div className='grid md:grid-cols-3 gap-6 text-left'>
                                    <div className='space-y-2'>
                                        <h4 className='font-semibold text-white'>Registration</h4>
                                        <p className='text-gray-300 text-sm'>
                                            Doors open at 8:30 AM. Please arrive early for check-in and networking.
                                        </p>
                                    </div>

                                    <div className='space-y-2'>
                                        <h4 className='font-semibold text-white'>Meals Included</h4>
                                        <p className='text-gray-300 text-sm'>
                                            Traditional Assamese lunch, tea breaks, and refreshments throughout the day.
                                        </p>
                                    </div>

                                    <div className='space-y-2'>
                                        <h4 className='font-semibold text-white'>Live Stream</h4>
                                        <p className='text-gray-300 text-sm'>
                                            All talks will be live-streamed and recorded for those unable to attend.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
