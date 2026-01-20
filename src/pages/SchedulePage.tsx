import { useRef } from 'react';
import { Download, Calendar, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

export const SchedulePage = () => {
    const pageRef = useRef<HTMLDivElement>(null);
    const { hasBeenInView } = useInView(pageRef, { threshold: 0.1 });

    const handleDownloadSchedule = () => {
        // In a real app, this would download a PDF schedule
        alert('Schedule PDF download would start here');
    };

    return (
        <div
            ref={pageRef}
            className='min-h-screen pt-20'
        >
            <main className='py-12'>
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
                                    <h1 className='text-4xl md:text-6xl font-bold text-white'>
                                        Event <span className='text-(--color-tedx-red)'>Schedule</span>
                                    </h1>

                                    <div className='w-24 h-1 bg-(--color-tedx-red) mx-auto' />
                                </div>

                                <p className='text-xl text-gray-300 leading-relaxed'>
                                    A full day of inspiring talks, performances, and networking opportunities. Join us
                                    for an unforgettable experience of ideas worth spreading.
                                </p>

                                {/* Event Details */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    className='grid md:grid-cols-3 gap-6 mt-8 text-center'
                                >
                                    {[
                                        { icon: Calendar, title: 'Date', value: 'February 08, 2026' },
                                        { icon: Clock, title: 'Time', value: '9:00 AM - 6:00 PM' },
                                        { icon: MapPin, title: 'Venue', value: 'NIT Silchar Auditorium' }
                                    ].map((item, index) => (
                                        <motion.div
                                            key={item.title}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={
                                                hasBeenInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
                                            }
                                            transition={{
                                                duration: 0.5,
                                                delay: 0.4 + index * 0.1,
                                                ease: 'easeOut'
                                            }}
                                            whileHover={{ scale: 1.05 }}
                                            className='flex flex-col items-center space-y-2'
                                        >
                                            <item.icon className='w-8 h-8 text-(--color-tedx-red)' />
                                            <div>
                                                <h3 className='font-semibold text-white'>{item.title}</h3>
                                                <p className='text-gray-300'>{item.value}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>

                                <motion.button
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={hasBeenInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.5, delay: 0.7 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleDownloadSchedule}
                                    className='inline-flex items-center gap-2 px-6 py-3 bg-gray-800 border border-(--color-tedx-red) text-(--color-tedx-red) rounded-lg hover:bg-(--color-tedx-red) hover:text-white transition-colors font-semibold'
                                >
                                    <Download className='w-5 h-5' />
                                    Download Full Schedule
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* Schedule Announcement */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className='text-center py-16'
                        >
                            <div className='bg-gray-800 rounded-2xl p-12 border border-gray-700'>
                                <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
                                    **Schedule Will Be Announced Soon**
                                </h2>
                                <p className='text-xl text-gray-300'>
                                    We're finalizing the lineup of speakers and sessions. Stay tuned for the complete
                                    schedule!
                                </p>
                            </div>
                        </motion.div>

                        {/* Additional Information */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className='mt-16'
                        >
                            <div className='bg-gray-800 rounded-2xl p-8 md:p-12 shadow-lg'>
                                <div className='space-y-6'>
                                    <h2 className='text-3xl font-bold text-white text-center'>Important Information</h2>

                                    <div className='grid md:grid-cols-3 gap-8'>
                                        <div className='space-y-3'>
                                            <h4 className='text-lg font-semibold text-white'>Registration</h4>
                                            <p className='text-gray-300'>
                                                Doors open at 8:30 AM. Please arrive early for check-in and networking.
                                                Bring your ticket confirmation and a valid ID.
                                            </p>
                                        </div>

                                        <div className='space-y-3'>
                                            <h4 className='text-lg font-semibold text-white'>Meals & Refreshments</h4>
                                            <p className='text-gray-300'>
                                                Traditional Assamese lunch, tea breaks, and refreshments throughout the
                                                day. Special dietary requirements will be accommodated.
                                            </p>
                                        </div>

                                        <div className='space-y-3'>
                                            <h4 className='text-lg font-semibold text-white'>
                                                Live Stream & Recording
                                            </h4>
                                            <p className='text-gray-300'>
                                                All talks will be live-streamed and recorded for global audiences. Links
                                                will be shared on our social media channels.
                                            </p>
                                        </div>
                                    </div>

                                    <div className='border-t border-gray-700 pt-6 mt-8'>
                                        <h4 className='text-lg font-semibold text-white mb-4 text-center'>
                                            Event Guidelines
                                        </h4>
                                        <div className='grid md:grid-cols-2 gap-6 text-sm text-gray-300'>
                                            <ul className='space-y-2'>
                                                <li>
                                                    • Photography and videography allowed during designated sessions
                                                </li>
                                                <li>• Mobile phones on silent mode during talks</li>
                                                <li>• Networking encouraged during breaks</li>
                                            </ul>
                                            <ul className='space-y-2'>
                                                <li>• Business casual or smart casual attire recommended</li>
                                                <li>• Parking available on campus (limited spaces)</li>
                                                <li>• Certificate of participation will be provided</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
};
