import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, Users, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { speakers } from '@/data/speakers';
import { useInView } from '@/hooks/useInView';

export const SpeakersPage = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { hasBeenInView } = useInView(sectionRef, { threshold: 0.2 });
    const [activeSpeakerIndex, setActiveSpeakerIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Check if speakers are announced (empty array or placeholder data means not announced)
    const speakersAnnounced = false; // Set to false since speakers are not announced yet

    const handlePrevSpeaker = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setActiveSpeakerIndex(prev => (prev === 0 ? speakers.length - 1 : prev - 1));
        setTimeout(() => setIsAnimating(false), 500);
    };

    const handleNextSpeaker = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setActiveSpeakerIndex(prev => (prev === speakers.length - 1 ? 0 : prev + 1));
        setTimeout(() => setIsAnimating(false), 500);
    };

    const handleSpeakerClick = (index: number) => {
        if (isAnimating) return;
        setIsAnimating(true);
        setActiveSpeakerIndex(index);
        setTimeout(() => setIsAnimating(false), 500);
    };

    // Auto-rotation (optional) - only if speakers are announced
    useEffect(() => {
        if (!speakersAnnounced) return;

        const interval = setInterval(() => {
            if (!isAnimating && hasBeenInView) {
                setActiveSpeakerIndex(prev => (prev === speakers.length - 1 ? 0 : prev + 1));
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [isAnimating, hasBeenInView, speakersAnnounced]);

    const activeSpeaker = speakers[activeSpeakerIndex];
    const orbitingSpeakers = speakers.filter((_, index) => index !== activeSpeakerIndex);

    return (
        <div className='min-h-screen bg-black'>
            {/* Header with back button */}
            <div className='container mx-auto px-4 pt-8'>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link
                        to='/'
                        className='inline-flex items-center gap-2 text-gray-400 hover:text-(--color-tedx-red) transition-colors mb-8'
                    >
                        <ArrowLeft className='w-4 h-4' />
                        Back to Home
                    </Link>
                </motion.div>
            </div>

            {/* Main content */}
            <section
                ref={sectionRef}
                className='py-12 bg-black'
            >
                <div className='container mx-auto px-4'>
                    <div className='max-w-7xl mx-auto'>
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className='text-center max-w-4xl mx-auto mb-16'
                        >
                            <div className='space-y-6'>
                                <div className='space-y-4'>
                                    <h1 className='text-5xl md:text-6xl font-bold text-white'>
                                        Our <span className='text-(--color-tedx-red)'>Speakers</span>
                                    </h1>

                                    <div className='w-24 h-1 bg-(--color-tedx-red) mx-auto' />
                                </div>

                                <p className='text-xl text-gray-300 leading-relaxed'>
                                    Meet the extraordinary individuals who will share their journeys of turning lessons
                                    into legacies. Each speaker brings unique insights and inspiring stories from
                                    diverse fields.
                                </p>
                            </div>
                        </motion.div>

                        {/* Speakers Content */}
                        {speakersAnnounced ? (
                            <>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    className='speakers-content-grid grid lg:grid-cols-2 gap-12 items-center mb-16'
                                >
                                    {/* Left Column: Orbital Image Display */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.8, delay: 0.4 }}
                                        className='orbital-display flex justify-center'
                                    >
                                        <div className='orbital-container relative w-80 h-80 md:w-96 md:h-96'>
                                            {/* Active Speaker Image (Center) */}
                                            <AnimatePresence mode='wait'>
                                                <motion.div
                                                    key={activeSpeaker.id}
                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    exit={{ scale: 0.8, opacity: 0 }}
                                                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                                                    className='active-speaker-image-wrapper absolute inset-0 flex items-center justify-center'
                                                >
                                                    <div className='relative w-32 h-32 md:w-40 md:h-40'>
                                                        <img
                                                            src={activeSpeaker.image}
                                                            alt={activeSpeaker.name}
                                                            className='w-full h-full object-cover rounded-full border-4 border-(--color-tedx-red) shadow-2xl'
                                                        />
                                                        <div className='absolute inset-0 rounded-full bg-gradient-to-tr from-(--color-tedx-red)/20 to-transparent' />
                                                    </div>
                                                </motion.div>
                                            </AnimatePresence>

                                            {/* Orbiting Speaker Images */}
                                            <div className='orbiting-speakers-container absolute inset-0'>
                                                {orbitingSpeakers.map((speaker, index) => {
                                                    const angle =
                                                        index * (360 / orbitingSpeakers.length) * (Math.PI / 180);
                                                    const radius = 140;
                                                    const x = Math.cos(angle) * radius;
                                                    const y = Math.sin(angle) * radius;

                                                    return (
                                                        <motion.button
                                                            key={speaker.id}
                                                            onClick={() =>
                                                                handleSpeakerClick(speakers.indexOf(speaker))
                                                            }
                                                            initial={{ scale: 0, opacity: 0 }}
                                                            animate={{ scale: 1, opacity: 1 }}
                                                            transition={{
                                                                duration: 0.4,
                                                                delay: 0.6 + index * 0.1,
                                                                ease: 'easeOut'
                                                            }}
                                                            whileHover={{ scale: 1.2 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            className='absolute w-16 h-16 md:w-20 md:h-20 transform -translate-x-1/2 -translate-y-1/2 orbital-speaker-image'
                                                            style={{
                                                                left: `calc(50% + ${x}px)`,
                                                                top: `calc(50% + ${y}px)`
                                                            }}
                                                        >
                                                            <img
                                                                src={speaker.image}
                                                                alt={speaker.name}
                                                                className='w-full h-full object-cover rounded-full border-2 border-gray-600 hover:border-(--color-tedx-red) transition-colors shadow-lg'
                                                            />
                                                        </motion.button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Right Column: Speaker Details */}
                                    <motion.div
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.8, delay: 0.5 }}
                                        className='speaker-details-wrapper space-y-8'
                                    >
                                        {/* Speaker Details */}
                                        <AnimatePresence mode='wait'>
                                            <motion.div
                                                key={activeSpeaker.id}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                                                className='speaker-details-container'
                                            >
                                                <div className='space-y-6'>
                                                    <div className='space-y-2'>
                                                        <h2 className='text-3xl md:text-4xl font-bold text-white'>
                                                            {activeSpeaker.name}
                                                        </h2>
                                                        <p className='text-(--color-tedx-red) text-lg font-medium'>
                                                            {activeSpeaker.title}
                                                        </p>
                                                        <p className='text-gray-400'>{activeSpeaker.company}</p>
                                                    </div>

                                                    <div className='space-y-4'>
                                                        <h3 className='text-xl font-semibold text-white'>
                                                            {activeSpeaker.talkTitle}
                                                        </h3>
                                                        <p className='text-gray-300 leading-relaxed'>
                                                            {activeSpeaker.talkDescription}
                                                        </p>
                                                    </div>

                                                    <p className='text-gray-400 text-sm leading-relaxed'>
                                                        {activeSpeaker.bio}
                                                    </p>

                                                    {/* Social Links */}
                                                    {activeSpeaker.socialLinks && (
                                                        <div className='flex gap-4 pt-4'>
                                                            {activeSpeaker.socialLinks.linkedin && (
                                                                <a
                                                                    href={activeSpeaker.socialLinks.linkedin}
                                                                    target='_blank'
                                                                    rel='noopener noreferrer'
                                                                    className='text-gray-400 hover:text-(--color-tedx-red) transition-colors'
                                                                >
                                                                    LinkedIn
                                                                </a>
                                                            )}
                                                            {activeSpeaker.socialLinks.twitter && (
                                                                <a
                                                                    href={activeSpeaker.socialLinks.twitter}
                                                                    target='_blank'
                                                                    rel='noopener noreferrer'
                                                                    className='text-gray-400 hover:text-(--color-tedx-red) transition-colors'
                                                                >
                                                                    Twitter
                                                                </a>
                                                            )}
                                                            {activeSpeaker.socialLinks.website && (
                                                                <a
                                                                    href={activeSpeaker.socialLinks.website}
                                                                    target='_blank'
                                                                    rel='noopener noreferrer'
                                                                    className='text-gray-400 hover:text-(--color-tedx-red) transition-colors'
                                                                >
                                                                    Website
                                                                </a>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        </AnimatePresence>

                                        {/* Navigation Controls */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.7 }}
                                            className='navigation-controls flex justify-center lg:justify-start'
                                        >
                                            <div className='nav-buttons-bg flex gap-2 bg-gray-800/50 rounded-lg p-2 backdrop-blur-sm'>
                                                <button
                                                    onClick={handlePrevSpeaker}
                                                    disabled={isAnimating}
                                                    className='p-3 bg-gray-700 hover:bg-(--color-tedx-red) text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                                                    aria-label='Previous speaker'
                                                >
                                                    <ChevronLeft className='w-5 h-5' />
                                                </button>
                                                <button
                                                    onClick={handleNextSpeaker}
                                                    disabled={isAnimating}
                                                    className='p-3 bg-gray-700 hover:bg-(--color-tedx-red) text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                                                    aria-label='Next speaker'
                                                >
                                                    <ChevronRight className='w-5 h-5' />
                                                </button>
                                            </div>
                                        </motion.div>

                                        {/* Speaker Counter */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.6, delay: 0.8 }}
                                            className='text-center lg:text-left'
                                        >
                                            <span className='text-gray-400 text-sm'>
                                                {activeSpeakerIndex + 1} of {speakers.length}
                                            </span>
                                        </motion.div>
                                    </motion.div>
                                </motion.div>

                                {/* All Speakers Grid */}
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                    className='mt-20'
                                >
                                    <h2 className='text-3xl font-bold text-white text-center mb-12'>All Speakers</h2>
                                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                                        {speakers.map((speaker, index) => (
                                            <motion.div
                                                key={speaker.id}
                                                initial={{ opacity: 0, y: 50 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                                className='bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800 hover:border-(--color-tedx-red)/50 transition-all cursor-pointer'
                                                onClick={() => handleSpeakerClick(index)}
                                            >
                                                <div className='flex flex-col items-center text-center space-y-4'>
                                                    <img
                                                        src={speaker.image}
                                                        alt={speaker.name}
                                                        className='w-24 h-24 object-cover rounded-full border-2 border-gray-600'
                                                    />
                                                    <div className='space-y-2'>
                                                        <h3 className='text-xl font-bold text-white'>{speaker.name}</h3>
                                                        <p className='text-(--color-tedx-red) font-medium'>
                                                            {speaker.title}
                                                        </p>
                                                        <p className='text-gray-400 text-sm'>{speaker.company}</p>
                                                    </div>
                                                    <p className='text-gray-300 text-sm leading-relaxed'>
                                                        {speaker.talkTitle}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            </>
                        ) : (
                            // Speakers Not Announced State
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className='text-center max-w-2xl mx-auto'
                            >
                                <div className='space-y-8'>
                                    {/* Icon */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.6, delay: 0.5, type: 'spring', stiffness: 200 }}
                                        className='flex justify-center'
                                    >
                                        <div className='relative'>
                                            <div className='w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center border-2 border-gray-700'>
                                                <Users className='w-16 h-16 md:w-20 md:h-20 text-gray-400' />
                                            </div>
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                                className='absolute -inset-2 border-2 border-dashed border-(--color-tedx-red)/30 rounded-full'
                                            />
                                        </div>
                                    </motion.div>

                                    {/* Text Content */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.7 }}
                                        className='space-y-6'
                                    >
                                        <div className='space-y-4'>
                                            <div className='flex items-center justify-center gap-3'>
                                                <Clock className='w-6 h-6 text-(--color-tedx-red)' />
                                                <h2 className='text-2xl md:text-3xl font-bold text-white'>
                                                    **Speakers Will Be Announced Soon**
                                                </h2>
                                            </div>

                                            <div className='w-16 h-1 bg-(--color-tedx-red) mx-auto' />
                                        </div>

                                        <div className='space-y-4 text-gray-300'>
                                            <p className='text-lg leading-relaxed'>
                                                We're curating an extraordinary lineup of speakers who will share their
                                                inspiring stories of turning challenges into opportunities.
                                            </p>

                                            <p className='text-base leading-relaxed'>
                                                Stay tuned as we unveil the visionaries, innovators, and changemakers
                                                who will grace the TEDx NIT Silchar stage on{' '}
                                                <span className='text-(--color-tedx-red) font-semibold'>
                                                    February 8, 2026
                                                </span>
                                                .
                                            </p>
                                        </div>

                                        {/* Notification Sign-up Call to Action */}
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.5, delay: 0.9 }}
                                            className='pt-6'
                                        >
                                            <div className='bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700'>
                                                <p className='text-sm text-gray-400 mb-4'>
                                                    Be the first to know when we announce our speakers
                                                </p>
                                                <div className='flex flex-col sm:flex-row gap-3'>
                                                    <input
                                                        type='email'
                                                        placeholder='Enter your email'
                                                        className='flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-(--color-tedx-red) transition-colors'
                                                    />
                                                    <button className='px-6 py-3 bg-(--color-tedx-red) hover:bg-red-700 text-white font-medium rounded-md transition-colors whitespace-nowrap'>
                                                        Notify Me
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};
