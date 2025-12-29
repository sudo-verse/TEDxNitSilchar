import { Venue } from '@/types/venue';

export const venueData: Venue = {
    id: 'nit-silchar-auditorium',
    name: 'Bhupen Hazarika Auditorium',
    address: 'National Institute of Technology Silchar',
    city: 'Silchar',
    state: 'Assam',
    pincode: '788010',
    description:
        'A state-of-the-art auditorium at NIT Silchar, equipped with modern audio-visual facilities and comfortable seating for 500+ attendees. Named after the legendary Assamese musician and filmmaker Dr. Bhupen Hazarika.',
    capacity: 500,
    facilities: [
        'High-definition projection systems',
        'Professional sound system',
        'Air conditioning',
        'Accessible seating',
        'WiFi connectivity',
        'Live streaming capability',
        'Green rooms for speakers',
        'Parking facility'
    ],
    images: [
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1562813733-b31f71025d54?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1571863533956-01c88e79957e?w=800&h=600&fit=crop'
    ],
    coordinates: {
        lat: 24.7597,
        lng: 92.7926
    },
    directionsUrl: 'https://maps.google.com/?q=NIT+Silchar'
};

export const nitSilcharInfo = {
    description:
        'National Institute of Technology Silchar, established in 1967, is one of the premier technical institutions in India. Located in the picturesque Barak Valley of Assam, the institute is known for its excellent academic programs and vibrant campus life. The campus spans over 625 acres and provides a perfect blend of natural beauty and modern infrastructure.',
    highlights: [
        'Established in 1967 as one of the 31 NITs in India',
        'Beautiful 625-acre campus in Barak Valley',
        'Over 3,000 students and 200+ faculty members',
        'Strong alumni network across the globe',
        'Research excellence in engineering and technology'
    ]
};
