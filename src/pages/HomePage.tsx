import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ThemeSection } from '@/components/sections/ThemeSection';
import { SpeakersSection } from '@/components/sections/SpeakersSection';
import { ScheduleSection } from '@/components/sections/ScheduleSection';
import { CTABand } from '@/components/sections/CTABand';

export const HomePage = () => {
    return (
        <>
            <HeroSection />
            <AboutSection />
            <ThemeSection />
            <SpeakersSection />
            <ScheduleSection />
            <CTABand />
        </>
    );
};
