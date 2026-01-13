import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic2, Users, Lightbulb, Sparkles } from 'lucide-react';
import { StatsGrid } from '@/components/ui/stats-grid';
import { eventStats } from '@/data/event';
import { useInView } from '@/hooks/useInView';

const expectationItems = [
    {
        icon: Mic2,
        title: 'Powerful Talks',
        description: 'Thought-provoking ideas that challenge the way you think.'
    },
    {
        icon: Users,
        title: 'Community Connection',
        description: 'Meet changemakers, creators, and collaborators.'
    },
    {
        icon: Lightbulb,
        title: 'Interactive Experiences',
        description: 'Engage in discussions and activities that expand perspective.'
    },
    {
        icon: Sparkles,
        title: 'Memorable Moments',
        description: 'A day full of inspiration that stays with you long after the event.'
    }
];

export const AboutSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { hasBeenInView } = useInView(sectionRef, { threshold: 0.3 });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] }
        }
    };

    return (
        <section
            id='about'
            ref={sectionRef}
            className='py-12 sm:py-16 lg:py-20 bg-black'
        >
            <div className='container mx-auto px-6 sm:px-8 lg:px-4'>
                <div className='max-w-7xl mx-auto'>
                    {/* Main Introduction */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className='text-center max-w-4xl mx-auto mb-12 sm:mb-16 lg:mb-20'
                    >
                        <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6'>
                            About <span className='text-[var(--color-tedx-red)]'>TEDx</span>NITSilchar
                        </h2>
                        <div className='w-24 h-1 bg-[var(--color-tedx-red)] mx-auto mb-8' />
                        <div className='space-y-5 text-gray-300 text-base sm:text-lg leading-relaxed'>
                            <p>
                                An independently organized TED event held at National Institute of Technology Silchar, celebrating visionary thinkers, innovators, and changemakers who bring ideas that matter.
                            </p>
                            <p>
                                Join us for a day of inspiring talks, meaningful conversations, and unforgettable experiences as we explore what it means to grow, innovate, and create positive impact. Whether you're a student, creator, entrepreneur, or dreamer — this is where your curiosity meets action.
                            </p>
                        </div>
                    </motion.div>

                    {/* About TEDx & NIT Silchar Grid */}
                    <div className='grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mb-12 sm:mb-16 lg:mb-20'>
                        {/* About TEDx */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={hasBeenInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                            className='space-y-5 sm:space-y-6'
                        >
                            <div>
                                <h3 className='text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4'>About TEDx</h3>
                                <div className='w-16 h-1 bg-[var(--color-tedx-red)]' />
                            </div>
                            <div className='space-y-4 text-gray-300 text-base sm:text-lg leading-relaxed'>
                                <p>
                                    TEDx is a program of local, self-organized events that bring the spirit of TED's mission — "Ideas worth spreading" — to communities around the world. At TEDx events, live speakers and TED Talk videos blend to ignite deep discussion and connection in an intimate setting.
                                </p>
                                <p>
                                    Every TEDx event is carefully curated under license from TED, with its own theme, speakers, and experiences — designed to inspire, challenge, and move you.
                                </p>
                            </div>
                        </motion.div>

                        {/* About NIT Silchar */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={hasBeenInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                            className='space-y-5 sm:space-y-6'
                        >
                            <div>
                                <h3 className='text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4'>About NIT Silchar</h3>
                                <div className='w-16 h-1 bg-[var(--color-tedx-red)]' />
                            </div>
                            <div className='space-y-4 text-gray-300 text-base sm:text-lg leading-relaxed'>
                                <p>
                                    National Institute of Technology, Silchar (NITS) is a premier technical institute in Assam, known for academic excellence and a vibrant culture of innovation and leadership. As a hub for bright minds from across the region, NIT Silchar provides the perfect stage for TEDx — where ideas meet action and impact begins.
                                </p>
                                <p>
                                    Our speakers are diverse thinkers, achievers, and trailblazers from a range of fields — including technology, art, science, business, leadership, and social impact. They bring compelling stories, insights, and ideas that spark reflection and inspire real change.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* What to Expect Section */}
                    <div className='mb-12 sm:mb-16 lg:mb-20'>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                            className='text-center mb-12 sm:mb-16'
                        >
                            <h3 className='text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4'>What to Expect</h3>
                            <div className='w-20 h-1 bg-[var(--color-tedx-red)] mx-auto' />
                        </motion.div>

                        <motion.div
                            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8'
                            variants={containerVariants}
                            initial='hidden'
                            animate={hasBeenInView ? 'visible' : 'hidden'}
                        >
                            {expectationItems.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div
                                        key={item.title}
                                        variants={itemVariants}
                                        whileHover={{ y: -8, scale: 1.02 }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                        className='bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700/50 text-center space-y-4'
                                    >
                                        <div className='w-16 h-16 mx-auto bg-[var(--color-tedx-red)]/20 rounded-full flex items-center justify-center'>
                                            <Icon className='w-8 h-8 text-[var(--color-tedx-red)]' />
                                        </div>
                                        <h4 className='text-lg sm:text-xl font-bold text-white'>{item.title}</h4>
                                        <p className='text-sm sm:text-base text-gray-300 leading-relaxed'>{item.description}</p>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>

                    {/* Stats Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
                        className='bg-gray-800 rounded-2xl p-6 sm:p-8 md:p-12 mb-12 sm:mb-16'
                    >
                        <div className='text-center mb-8 sm:mb-12'>
                            <h3 className='text-xl sm:text-2xl font-bold text-white mb-2'>Event at a Glance</h3>
                            <p className='text-sm sm:text-base text-gray-300'>Numbers that showcase our impact</p>
                        </div>
                        <StatsGrid stats={eventStats} />
                    </motion.div>

                    {/* Closing Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                        className='text-center max-w-4xl mx-auto'
                    >
                        <div className='bg-gradient-to-r from-[var(--color-tedx-red)]/20 to-gray-800/50 rounded-2xl p-6 sm:p-8 md:p-12 border border-[var(--color-tedx-red)]/30'>
                            <blockquote className='text-lg sm:text-xl md:text-2xl font-medium text-gray-200 leading-relaxed'>
                                "We believe in the power of ideas to change attitudes, lives, and ultimately, the world. Join us as we celebrate innovation, courage, and the transformative potential that emerges when brilliant minds come together."
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
