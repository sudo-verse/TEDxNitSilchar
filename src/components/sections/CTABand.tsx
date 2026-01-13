import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Ticket, Mic2, Handshake, Users } from 'lucide-react';
import { CTAButton } from '@/components/ui/cta-button';
import { useInView } from '@/hooks/useInView';

const ctaOptions = [
    {
        icon: Ticket,
        title: 'Attend the Event',
        description: 'Reserve your seat and be part of a day of ideas, inspiration, and growth.',
        href: '#register',
        buttonText: 'Get Your Ticket',
        variant: 'primary'
    },
    {
        icon: Mic2,
        title: 'Become a Speaker',
        description: 'Have a story worth sharing? Apply to speak and make your voice heard.',
        href: '#speaker-nomination',
        buttonText: 'Apply Now',
        variant: 'secondary'
    },
    {
        icon: Handshake,
        title: 'Support as a Sponsor',
        description: 'Join hands to help TEDx NIT Silchar spotlight innovation and impact.',
        href: '#sponsorship',
        buttonText: 'Explore Sponsorship',
        variant: 'secondary'
    },
    {
        icon: Users,
        title: 'Volunteer',
        description: 'Be part of the team that brings the event to life.',
        href: '#volunteer',
        buttonText: 'Join the Team',
        variant: 'secondary'
    }
];

export const CTABand = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { hasBeenInView } = useInView(sectionRef, { threshold: 0.3 });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] }
        }
    };

    return (
        <section
            id='register'
            ref={sectionRef}
            className='py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-[var(--color-tedx-red)] to-red-800'
        >
            <div className='container mx-auto px-6 sm:px-8 lg:px-4'>
                <div className='max-w-7xl mx-auto'>
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className='text-center mb-12 sm:mb-16 lg:mb-20'
                    >
                        <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4'>
                            Be Part of the Movement
                        </h2>
                        <p className='text-lg sm:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto'>
                            Whether you want to attend, speak, sponsor, or volunteer — there are many ways to be part of TEDxNITSilchar 2026.
                        </p>
                    </motion.div>

                    {/* CTA Options Grid */}
                    <motion.div
                        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16'
                        variants={containerVariants}
                        initial='hidden'
                        animate={hasBeenInView ? 'visible' : 'hidden'}
                    >
                        {ctaOptions.map((option) => {
                            const Icon = option.icon;
                            return (
                                <motion.div
                                    key={option.title}
                                    variants={itemVariants}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                    className='bg-white/10 backdrop-blur-md rounded-xl p-6 sm:p-8 border border-white/20 text-white space-y-4 hover:bg-white/15 transition-colors'
                                >
                                    <div className='w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center'>
                                        <Icon className='w-6 h-6 text-white' />
                                    </div>
                                    <h3 className='text-lg sm:text-xl font-bold'>{option.title}</h3>
                                    <p className='text-sm sm:text-base text-white/80 leading-relaxed'>{option.description}</p>
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='pt-2'>
                                        <CTAButton
                                            href={option.href}
                                            variant={option.variant === 'primary' ? 'primary' : 'secondary'}
                                            size='sm'
                                            className={option.variant === 'primary' ? 'w-full bg-white text-[var(--color-tedx-red)] hover:bg-gray-100 border-0' : 'w-full border-white/50 text-white hover:bg-white hover:text-[var(--color-tedx-red)]'}
                                        >
                                            {option.buttonText}
                                        </CTAButton>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* Bottom Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                        className='text-center'
                    >
                        <p className='text-white/80 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto'>
                            Limited seats available • Early bird pricing ends soon<br />
                            <span className='text-white font-semibold mt-2 block'>Questions? Reach out to us anytime!</span>
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
