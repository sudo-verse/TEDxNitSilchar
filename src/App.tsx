import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { TeamPage } from '@/pages/TeamPage';
import { SchedulePage } from '@/pages/SchedulePage';
import { PartnersPage } from '@/pages/PartnersPage';
import { TicketsPage } from '@/pages/TicketsPage';
import { VolunteerPage } from '@/pages/VolunteerPage';
import { SpeakersPage } from '@/pages/SpeakersPage';
import { SpeakerNominationPage } from '@/pages/SpeakerNominationPage';
import { PartnershipPage } from '@/pages/PartnershipPage';
import { ContactUsPage } from '@/pages/ContactUsPage';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { TedxLoader } from '@/components/ui/tedx-loader';
import { Toaster } from '@/components/ui/sonner';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            staleTime: 5 * 60 * 1000 // 5 minutes
        }
    }
});

export const App = () => {
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    useEffect(() => {
        // Simulate initial loading time
        const loadingTimer = setTimeout(() => {
            setIsInitialLoading(false);
        }, 1200);

        return () => clearTimeout(loadingTimer);
    }, []);

    useEffect(() => {
        // Force dark mode by default
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');

        // Set document title and favicon
        document.title = 'TEDxNITSilchar 2026 - Turning Lessons into Legacies';

        // Add favicon
        const favicon = document.createElement('link');
        favicon.rel = 'icon';
        favicon.type = 'image/x-icon';
        favicon.href =
            'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="0.9em" font-size="90">🎯</text></svg>';
        document.head.appendChild(favicon);

        // Add meta tags for better SEO
        const metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        metaDescription.content =
            'Join TEDxNITSilchar 2026 - Turning Lessons into Legacies. An independently organized TED event at NIT Silchar featuring inspiring speakers and ideas worth spreading.';
        document.head.appendChild(metaDescription);

        const metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        metaKeywords.content =
            'TEDx, NIT Silchar, TED, Ideas worth spreading, Northeast India, Innovation, Technology, Entrepreneurship';
        document.head.appendChild(metaKeywords);

        // Enable smooth scrolling
        document.documentElement.style.scrollBehavior = 'smooth';

        return () => {
            document.head.removeChild(favicon);
            document.head.removeChild(metaDescription);
            document.head.removeChild(metaKeywords);
        };
    }, []);

    if (isInitialLoading) return <TedxLoader />;

    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <ScrollToTop />
                <Layout>
                    <Routes>
                        <Route
                            path='/'
                            element={<HomePage />}
                        />
                        <Route
                            path='/team'
                            element={<TeamPage />}
                        />
                        <Route
                            path='/schedule'
                            element={<SchedulePage />}
                        />
                        <Route
                            path='/partners'
                            element={<PartnersPage />}
                        />
                        <Route
                            path='/tickets'
                            element={<TicketsPage />}
                        />
                        <Route
                            path='/volunteer'
                            element={<VolunteerPage />}
                        />
                        <Route
                            path='/speakers'
                            element={<SpeakersPage />}
                        />
                        <Route
                            path='/nominate-speaker'
                            element={<SpeakerNominationPage />}
                        />
                        <Route
                            path='/partnership'
                            element={<PartnershipPage />}
                        />
                        <Route
                            path='/contact'
                            element={<ContactUsPage />}
                        />
                    </Routes>
                    <Footer />
                </Layout>
            </Router>
            <Toaster />
        </QueryClientProvider>
    );
};
