import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

export const AboutSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { hasBeenInView } = useInView(sectionRef, { threshold: 0.3 });

    return (
        <section
            id='about'
            ref={sectionRef}
            className='py-12 sm:py-16 lg:py-20'
        >
            <div className='container mx-auto px-6 sm:px-8 lg:px-4'>
                <div className='max-w-7xl mx-auto'>
                    {/* Intro */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="mb-16 text-center max-w-4xl mx-auto"
                    >
                        <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6'>
                            <span className='text-[var(--color-tedx-red)]'>TEDx</span>NITSilchar
                        </h2>
                        <p className='text-lg sm:text-xl text-gray-300 leading-relaxed'>
                            An independently organized TED event held at National Institute of Technology Silchar,
                            celebrating visionary thinkers, innovators, and changemakers who bring ideas that matter.
                            Join us for a day of inspiring talks, meaningful conversations, and unforgettable experiences as
                            we explore what it means to grow, innovate, and create positive impact. Whether you’re a
                            student, creator, entrepreneur, or dreamer — this is where your curiosity meets action.
                        </p>
                    </motion.div>

                    <div className='grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16'>
                        {/* About TEDx */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={hasBeenInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className='space-y-4'
                        >
                            <h3 className='text-2xl font-bold text-white'>About <span className='text-[var(--color-tedx-red)]'>TEDx</span></h3>
                            <div className='w-12 h-1 bg-[var(--color-tedx-red)]' />
                            <p className='text-gray-300 leading-relaxed'>
                                TEDx is a program of local, self-organized events that bring the spirit of TED’s mission — “Ideas
                                worth spreading” — to communities around the world. At TEDx events, live speakers and TED
                                Talk videos blend to ignite deep discussion and connection in an intimate setting.
                            </p>
                            <p className='text-gray-300 leading-relaxed'>
                                Every TEDx event is carefully curated under license from TED, with its own theme, speakers,
                                and experiences — designed to inspire, challenge, and move you.
                            </p>
                        </motion.div>

                        {/* About NIT Silchar */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={hasBeenInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className='space-y-4'
                        >
                            <h3 className='text-2xl font-bold text-white'>About NIT Silchar</h3>
                            <div className='w-12 h-1 bg-[var(--color-tedx-red)]' />
                            <p className='text-gray-300 leading-relaxed'>
                                National Institute of Technology, Silchar (NITS) is a premier technical institute in Assam, known
                                for academic excellence and a vibrant culture of innovation and leadership. As a hub for bright
                                minds from across the region, NIT Silchar provides the perfect stage for TEDx — where ideas
                                meet action and impact begins.
                            </p>
                            <p className='text-gray-300 leading-relaxed'>
                                Our speakers are diverse thinkers, achievers, and trailblazers from a range of fields — including
                                technology, art, science, business, leadership, and social impact. They bring compelling stories,
                                insights, and ideas that spark reflection and inspire real change.
                            </p>
                        </motion.div>
                    </div>

                    {/* What to Expect */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="bg-gray-800/50 rounded-2xl p-8 md:p-12"
                    >
                        <h3 className='text-2xl md:text-3xl font-bold text-white mb-8 text-center'>What to Expect</h3>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="space-y-2 text-center md:text-left">
                                <h4 className="text-xl font-semibold text-[var(--color-tedx-red)]">🎤 Powerful Talks</h4>
                                <p className="text-gray-300">Thought-provoking ideas that challenge the way you think.</p>
                            </div>
                            <div className="space-y-2 text-center md:text-left">
                                <h4 className="text-xl font-semibold text-[var(--color-tedx-red)]">🤝 Community Connection</h4>
                                <p className="text-gray-300">Meet changemakers, creators, and collaborators.</p>
                            </div>
                            <div className="space-y-2 text-center md:text-left">
                                <h4 className="text-xl font-semibold text-[var(--color-tedx-red)]">🎯 Interactive Experiences</h4>
                                <p className="text-gray-300">Engage in discussions and activities that expand perspective.</p>
                            </div>
                            <div className="space-y-2 text-center md:text-left">
                                <h4 className="text-xl font-semibold text-[var(--color-tedx-red)]">🌟 Memorable Moments</h4>
                                <p className="text-gray-300">A day full of inspiration that stays with you long after the event.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};