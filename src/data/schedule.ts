import { ScheduleCategory } from '@/types/schedule';

export const scheduleData: ScheduleCategory[] = [
    {
        name: 'Morning Session',
        sessions: [
            {
                id: 'registration',
                title: 'Registration & Welcome Coffee',
                time: '8:30 AM',
                duration: 30,
                type: 'networking',
                description: 'Check-in, networking, and light refreshments',
                category: 'morning'
            },
            {
                id: 'opening',
                title: 'Opening Ceremony',
                time: '9:00 AM',
                duration: 20,
                type: 'talk',
                description: 'Welcome to TEDxNITSilchar 2026',
                category: 'morning'
            },
            {
                id: 'talk-1',
                title: 'From Failed Algorithms to Saving Lives',
                time: '9:20 AM',
                duration: 18,
                type: 'talk',
                speaker: 'Dr. Priya Sharma',
                description: 'AI innovations in healthcare accessibility',
                category: 'morning'
            },
            {
                id: 'talk-2',
                title: 'Weaving Heritage into the Future',
                time: '9:45 AM',
                duration: 18,
                type: 'talk',
                speaker: 'Rahul Borthakur',
                description: 'Traditional crafts meet modern technology',
                category: 'morning'
            },
            {
                id: 'break-1',
                title: 'Coffee Break',
                time: '10:10 AM',
                duration: 20,
                type: 'break',
                description: 'Networking and refreshments',
                category: 'morning'
            },
            {
                id: 'talk-3',
                title: 'Lessons from the Himalayas',
                time: '10:30 AM',
                duration: 18,
                type: 'talk',
                speaker: 'Ananya Das',
                description: 'Climate resilience and adaptation',
                category: 'morning'
            },
            {
                id: 'performance-1',
                title: 'Traditional Bihu Dance Performance',
                time: '10:55 AM',
                duration: 10,
                type: 'performance',
                description: 'Cultural performance by NIT Silchar students',
                category: 'morning'
            }
        ]
    },
    {
        name: 'Afternoon Session',
        sessions: [
            {
                id: 'lunch',
                title: 'Lunch & Networking',
                time: '12:00 PM',
                duration: 60,
                type: 'networking',
                description: 'Assamese cuisine and networking opportunities',
                category: 'afternoon'
            },
            {
                id: 'talk-4',
                title: 'Building Silicon Valleys Beyond Silicon Valley',
                time: '1:00 PM',
                duration: 18,
                type: 'talk',
                speaker: 'Vikram Singh',
                description: 'Innovation ecosystems in unexpected places',
                category: 'afternoon'
            },
            {
                id: 'talk-5',
                title: 'Engineering Hope for Remote Communities',
                time: '1:25 PM',
                duration: 18,
                type: 'talk',
                speaker: 'Dr. Maya Thakur',
                description: 'Affordable medical technology solutions',
                category: 'afternoon'
            },
            {
                id: 'break-2',
                title: 'Tea Break',
                time: '1:50 PM',
                duration: 20,
                type: 'break',
                description: 'Assamese tea and light snacks',
                category: 'afternoon'
            },
            {
                id: 'talk-6',
                title: 'Stories That Bridge Worlds',
                time: '2:10 PM',
                duration: 18,
                type: 'talk',
                speaker: 'Arjun Deka',
                description: 'Authentic storytelling and cultural connection',
                category: 'afternoon'
            }
        ]
    },
    {
        name: 'Evening Session',
        sessions: [
            {
                id: 'panel',
                title: 'Panel Discussion: The Future of Northeast India',
                time: '4:00 PM',
                duration: 45,
                type: 'talk',
                description: 'All speakers discuss regional development',
                category: 'evening'
            },
            {
                id: 'performance-2',
                title: 'Musical Performance',
                time: '4:50 PM',
                duration: 15,
                type: 'performance',
                description: 'Contemporary fusion by local artists',
                category: 'evening'
            },
            {
                id: 'closing',
                title: 'Closing Ceremony',
                time: '5:10 PM',
                duration: 20,
                type: 'talk',
                description: 'Thank you and closing remarks',
                category: 'evening'
            },
            {
                id: 'networking-final',
                title: 'Final Networking & Photo Sessions',
                time: '5:30 PM',
                duration: 30,
                type: 'networking',
                description: 'Final networking and group photos',
                category: 'evening'
            }
        ]
    }
];
