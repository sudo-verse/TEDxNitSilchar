import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { Users, Mic, Handshake, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CTABand = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { hasBeenInView } = useInView(sectionRef, { threshold: 0.2 });

    const ctaItems = [
        {
            title: "Attend the Event",
            description: "Reserve your seat and be part of a day of ideas, inspiration, and growth.",
            action: "Be Part of the Movement",
            link: "/tickets",
            icon: Users
        },
        {
            title: "Become a Speaker",
            description: "Have a story worth sharing? Apply to speak and make your voice heard.",
            action: "Apply Now",
            link: "/nominate-speaker",
            icon: Mic
        },
        {
            title: "Support as a Sponsor",
            description: "Join hands to help TEDx NIT Silchar spotlight innovation and impact.",
            action: "Partner with Us",
            link: "/partnership",
            icon: Handshake
        },
        {
            title: "Volunteer",
            description: "Be part of the team that brings the event to life.",
            action: "Join the Team",
            link: "/volunteer",
            icon: Heart
        }
    ];

    return (
        <section
            id='join-us'
            ref={sectionRef}
            className='py-16 sm:py-20 bg-[var(--color-tedx-red)]/90 backdrop-blur-sm'
        >
            <div className='container mx-auto px-6 sm:px-8 lg:px-4'>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className='text-center mb-12 sm:mb-16'
                >
                    <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6'>
                        Be Part of the Movement
                    </h2>
                    <div className='w-24 h-1 bg-white/50 mx-auto' />
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {ctaItems.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-black/20 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-black/30 transition-colors group"
                        >
                            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <item.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-white/80 text-sm mb-6 leading-relaxed">
                                {item.description}
                            </p>
                            <Link
                                to={item.link}
                                className="inline-flex items-center text-sm font-semibold text-white hover:underline underline-offset-4"
                            >
                                {item.action} →
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};