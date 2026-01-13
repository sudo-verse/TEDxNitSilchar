import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, MapPin, Users, ExternalLink } from 'lucide-react';
import { EventDetails } from '@/types/event';
import { CTAButton } from './cta-button';

interface EventCardProps {
    event: EventDetails;
}

export const EventCard = ({ event }: EventCardProps) => {
    const handleAddToCalendar = () => {
        // Simple calendar event creation
        const eventDate = new Date('2026-02-08T09:00:00')
            .toISOString()
            .replace(/[-:]/g, '')
            .replace(/\.\d{3}/, '');
        const endDate = new Date('2026-02-08T18:00:00')
            .toISOString()
            .replace(/[-:]/g, '')
            .replace(/\.\d{3}/, '');

        const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.name)}&dates=${eventDate}/${endDate}&details=${encodeURIComponent(`${event.tagline}\n\nTheme: ${event.theme}`)}&location=${encodeURIComponent(event.location)}`;

        window.open(calendarUrl, '_blank');
    };

    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            <Card className='bg-white/10 backdrop-blur-md border border-white/20 text-white'>
                <CardContent className='p-6 space-y-4'>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className='flex items-center gap-3'
                    >
                        <Calendar className='w-5 h-5 text-(--color-tedx-red)' />
                        <div>
                            <p className='font-semibold'>{event.date}</p>
                            <p className='text-sm text-gray-300'>{event.time}</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className='flex items-start gap-3'
                    >
                        <MapPin className='w-5 h-5 text-(--color-tedx-red) mt-0.5' />
                        <div>
                            <p className='font-semibold'>{event.venue}</p>
                            <p className='text-sm text-gray-300'>{event.location}</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className='flex items-center gap-3'
                    >
                        <Users className='w-5 h-5 text-(--color-tedx-red)' />
                        <div>
                            <p className='font-semibold'>{event.expectedAttendees}+ Expected Attendees</p>
                            <p className='text-sm text-gray-300'>Limited seats available</p>
                        </div>
                    </motion.div>

                    <div className='pt-4 space-y-3'>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                            <CTAButton
                                onClick={handleAddToCalendar}
                                variant='secondary'
                                size='sm'
                                className='w-full border-white/30 text-white hover:bg-white hover:text-black'
                            >
                                <Calendar className='w-4 h-4 mr-2' />
                                Add to Calendar
                            </CTAButton>
                        </motion.div>

                        <motion.button
                            onClick={() => window.open(event.directionsUrl, '_blank')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className='w-full text-sm text-gray-300 hover:text-white transition-colors flex items-center justify-center gap-2'
                        >
                            <ExternalLink className='w-4 h-4' />
                            Get Directions
                        </motion.button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};
