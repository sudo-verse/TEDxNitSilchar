import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CTAButton } from '@/components/ui/cta-button';
import { eventDetails } from '@/data/event';
import { useInView } from '@/hooks/useInView';

export const HeroSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { hasBeenInView } = useInView(sectionRef, { threshold: 0.3 });
    const [typingState, setTypingState] = useState("hidden");

    useEffect(() => {
        if (hasBeenInView) {
            let timeoutId: NodeJS.Timeout;

            const runLoop = () => {
                setTypingState("visible");
                // Wait for typing (Approx 2s) + Hold (3s) = 5s
                timeoutId = setTimeout(() => {
                    setTypingState("hidden");
                    // Wait for fade out (0.5s) before restarting
                    timeoutId = setTimeout(runLoop, 500);
                }, 5000);
            };

            runLoop();

            return () => clearTimeout(timeoutId);
        }
    }, [hasBeenInView]);

    return (
        <section
            id='home'
            ref={sectionRef}
            className='relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20 pb-20'
        >
            {/* Background Image & Overlays */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/campus.jpg"
                    alt="NIT Silchar Campus"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                        filter: 'brightness(0.85) contrast(1.15) saturate(0.7) sepia(0.1)',
                    }}
                />

                {/* Red-tinted Dark Overlay - warmer, less blue */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a0505]/75 via-black/70 to-[#080505]/75" />

                {/* Gradient fade to background at bottom - seamless blend */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-50% to-black" />

                {/* Extra solid cover at very bottom for seamless transition */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black to-transparent" />
            </div>

            {/* Content Overlay */}
            <div className='absolute inset-0 bg-black/20 z-0 pointer-events-none' />

            <div className='container mx-auto px-4 relative z-10 text-center'>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className='space-y-8 flex flex-col items-center'
                >
                    {/* Main Headline - Theme */}
                    <div className='space-y-4'>
                        <h1 className='text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-[family-name:var(--font-serif)] font-normal text-white leading-tight tracking-tight overflow-hidden'>
                            <span className="sr-only">{eventDetails.theme}</span>
                            <motion.span
                                initial="hidden"
                                animate={typingState}
                                aria-hidden
                            >
                                {eventDetails.theme.split(' ').map((word, wordIndex) => {
                                    // Calculate the starting index for this word's characters based on previous words
                                    const previousCharsCount = eventDetails.theme
                                        .split(' ')
                                        .slice(0, wordIndex)
                                        .reduce((acc, w) => acc + w.length + 1, 0); // +1 for space

                                    return (
                                        <span key={wordIndex} className="inline-block whitespace-nowrap">
                                            {word.split('').map((char, charIndex) => (
                                                <motion.span
                                                    key={`${wordIndex}-${charIndex}`}
                                                    custom={previousCharsCount + charIndex}
                                                    variants={{
                                                        hidden: {
                                                            opacity: 0,
                                                            y: 20,
                                                            transition: { duration: 0.3 }
                                                        },
                                                        visible: (i) => ({
                                                            opacity: 1,
                                                            y: 0,
                                                            transition: {
                                                                delay: 0.2 + (i * 0.05),
                                                                duration: 0.4,
                                                                ease: "easeOut"
                                                            }
                                                        }),
                                                    }}
                                                    className="inline-block"
                                                >
                                                    {char}
                                                </motion.span>
                                            ))}
                                            <span className="inline-block">&nbsp;</span>
                                        </span>
                                    );
                                })}
                            </motion.span>
                        </h1>
                    </div>

                    {/* Tagline / Subtitle */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={hasBeenInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 1, delay: 1.5 }}
                        className='text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-[family-name:var(--font-body-serif)] leading-relaxed'
                    >
                        {eventDetails.tagline}
                    </motion.p>

                    {/* Date and Location Chip */}
                    <div className='inline-flex items-center gap-2 border border-white/20 rounded-full px-6 py-2 bg-white/5 backdrop-blur-sm'>
                        <span className='text-sm text-white/80 font-[family-name:var(--font-body-serif)]'>
                            {eventDetails.date} • {eventDetails.location.split(',')[0]}
                        </span>
                    </div>

                    {/* CTA Button */}
                    <div className='pt-8'>
                        <CTAButton
                            href='#register'
                            size='lg'
                            className='bg-transparent border border-white/40 hover:bg-white hover:text-black hover:border-white text-white rounded-none px-10 py-4 text-sm tracking-widest uppercase transition-all duration-300 font-[family-name:var(--font-body-serif)]'
                        >
                            Book your Tickets
                        </CTAButton>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};