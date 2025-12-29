import { EventDetails, EventStats } from '@/types/event';

export const eventDetails: EventDetails = {
    id: 'tedx-nit-silchar-2026',
    name: 'TEDxNITSilchar',
    tagline: 'Ideas worth spreading from the heart of NIT Silchar',
    theme: 'Turning Lessons into Legacies',
    date: 'February 08, 2026',
    time: '9:00 AM - 6:00 PM',
    venue: 'Bhupen Hazarika Auditorium',
    location: 'National Institute of Technology Silchar, Assam',
    expectedAttendees: 500,
    registrationUrl: '#register',
    partnershipUrl: '#partner',
    calendarUrl: '#calendar',
    directionsUrl: 'https://maps.google.com/?q=NIT+Silchar'
};

export const eventStats: EventStats = {
    speakers: 8,
    attendees: 500,
    yearsRunning: 1,
    sessions: 12
};

export const themeDescription = {
    title: 'Turning Lessons into Legacies',
    description:
        'Every experience teaches us something valuable. In 2026, we explore how the lessons we learn can become the legacies we leave behind. From personal growth to societal impact, from technological innovation to cultural preservation, our speakers will share how they transformed their learnings into lasting change.',
    pillars: [
        {
            id: 1,
            title: 'Innovation & Technology',
            description: 'How breakthrough technologies emerge from lessons learned through failure and perseverance.',
            icon: 'Lightbulb'
        },
        {
            id: 2,
            title: 'Social Impact',
            description: 'Transforming personal experiences into movements that create positive societal change.',
            icon: 'Users'
        },
        {
            id: 3,
            title: 'Cultural Heritage',
            description:
                'Preserving and celebrating the rich cultural legacy of Northeast India for future generations.',
            icon: 'Mountain'
        },
        {
            id: 4,
            title: 'Entrepreneurial Spirit',
            description: 'Building sustainable businesses and solutions from hard-earned insights and experiences.',
            icon: 'TrendingUp'
        }
    ]
};
