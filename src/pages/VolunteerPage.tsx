import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Clock, Award, User, Mail, Phone, Calendar, BookOpen } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { CTAButton } from '@/components/ui/cta-button';
import { useCreateVolunteerApplication } from '@/services/volunteer';

interface VolunteerRole {
    id: string;
    title: string;
    description: string;
    icon: typeof Heart;
    requirements: string[];
    timeCommitment: string;
}

const volunteerRoles: VolunteerRole[] = [
    {
        id: 'event-coordination',
        title: 'Event Coordination',
        description:
            'Help coordinate various aspects of the event including logistics, scheduling, and attendee management.',
        icon: Users,
        requirements: ['Strong organizational skills', 'Good communication', 'Team player'],
        timeCommitment: '2-3 weeks before event + Event day'
    },
    {
        id: 'speaker-support',
        title: 'Speaker Support',
        description: 'Assist speakers with their needs, help with rehearsals, and ensure smooth talk transitions.',
        icon: Award,
        requirements: ['Professional demeanor', 'Punctual and reliable', 'Basic tech knowledge'],
        timeCommitment: '1 week before event + Event day'
    },
    {
        id: 'tech-support',
        title: 'Technical Support',
        description: 'Manage audio/visual equipment, live streaming, and technical aspects of presentations.',
        icon: BookOpen,
        requirements: ['Technical expertise', 'Problem-solving skills', 'Equipment handling experience'],
        timeCommitment: 'Event day + Setup (1 day before)'
    },
    {
        id: 'registration',
        title: 'Registration & Check-in',
        description: 'Welcome attendees, manage registration desk, and ensure smooth check-in process.',
        icon: Heart,
        requirements: ['Friendly personality', 'Customer service skills', 'Basic computer skills'],
        timeCommitment: 'Event day (Early morning to afternoon)'
    }
];

export const VolunteerPage = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { hasBeenInView } = useInView(sectionRef, { threshold: 0.1 });
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        university: '',
        year: '',
        experience: '',
        motivation: '',
        availability: ''
    });
    const createVolunteerApplicationMutation = useCreateVolunteerApplication();

    const handleRoleToggle = (roleId: string) => {
        setSelectedRoles(prev => (prev.includes(roleId) ? prev.filter(id => id !== roleId) : [...prev, roleId]));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedRoles.length === 0) {
            alert('Please select at least one volunteer role.');
            return;
        }

        try {
            await createVolunteerApplicationMutation.mutateAsync({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                university: formData.university,
                year: formData.year || undefined,
                selectedRoles,
                experience: formData.experience || undefined,
                motivation: formData.motivation,
                availability: formData.availability
            });

            alert('Thank you for your interest in volunteering! We will contact you soon with more details.');

            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                university: '',
                year: '',
                experience: '',
                motivation: '',
                availability: ''
            });
            setSelectedRoles([]);
        } catch (error) {
            console.error('Error submitting volunteer application:', error);
            alert('Failed to submit application. Please try again.');
        }
    };

    return (
        <main className='min-h-screen pt-20'>
            <section
                ref={sectionRef}
                className='py-16'
            >
                <div className='container mx-auto px-4'>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 0.8 }}
                        className='text-center mb-16'
                    >
                        <h1 className='text-4xl md:text-6xl font-bold text-white mb-6'>
                            Join Our <span className='text-(--color-tedx-red)'>Team</span>
                        </h1>
                        <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
                            Be part of the team that brings TEDxNITSilchar 2026 to life. Help us create an unforgettable
                            experience for speakers and attendees alike.
                        </p>
                    </motion.div>

                    {/* Benefits Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className='grid md:grid-cols-3 gap-8 mb-16'
                    >
                        <div className='text-center'>
                            <div className='w-16 h-16 bg-(--color-tedx-red)/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                                <Heart className='w-8 h-8 text-(--color-tedx-red)' />
                            </div>
                            <h3 className='text-xl font-bold text-white mb-2'>Make a Difference</h3>
                            <p className='text-gray-300'>
                                Help spread ideas worth spreading and impact your community.
                            </p>
                        </div>

                        <div className='text-center'>
                            <div className='w-16 h-16 bg-(--color-tedx-red)/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                                <Users className='w-8 h-8 text-(--color-tedx-red)' />
                            </div>
                            <h3 className='text-xl font-bold text-white mb-2'>Build Network</h3>
                            <p className='text-gray-300'>
                                Connect with inspiring speakers, organizers, and fellow volunteers.
                            </p>
                        </div>

                        <div className='text-center'>
                            <div className='w-16 h-16 bg-(--color-tedx-red)/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                                <Award className='w-8 h-8 text-(--color-tedx-red)' />
                            </div>
                            <h3 className='text-xl font-bold text-white mb-2'>Gain Experience</h3>
                            <p className='text-gray-300'>
                                Develop skills in event management, tech, and team coordination.
                            </p>
                        </div>
                    </motion.div>

                    <div className='grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto'>
                        {/* Volunteer Roles */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={hasBeenInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            <h2 className='text-2xl font-bold text-white mb-8'>Choose Your Role</h2>

                            <div className='space-y-6'>
                                {volunteerRoles.map(role => {
                                    const IconComponent = role.icon;
                                    const isSelected = selectedRoles.includes(role.id);

                                    return (
                                        <motion.div
                                            key={role.id}
                                            whileHover={{ scale: 1.02 }}
                                            className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${isSelected
                                                    ? 'border-(--color-tedx-red) bg-(--color-tedx-red)/10'
                                                    : 'border-gray-700 bg-gray-900 hover:border-gray-600'
                                                }`}
                                            onClick={() => handleRoleToggle(role.id)}
                                        >
                                            <div className='flex items-start gap-4'>
                                                <div
                                                    className={`p-3 rounded-full ${isSelected ? 'bg-(--color-tedx-red)' : 'bg-gray-700'
                                                        }`}
                                                >
                                                    <IconComponent className='w-6 h-6 text-white' />
                                                </div>

                                                <div className='flex-1'>
                                                    <h3 className='text-lg font-bold text-white mb-2'>{role.title}</h3>
                                                    <p className='text-gray-300 mb-4'>{role.description}</p>

                                                    <div className='space-y-3'>
                                                        <div>
                                                            <h4 className='text-sm font-semibold text-(--color-tedx-red) mb-1'>
                                                                Requirements:
                                                            </h4>
                                                            <ul className='text-sm text-gray-400'>
                                                                {role.requirements.map((req, index) => (
                                                                    <li key={index}>• {req}</li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        <div className='flex items-center gap-2 text-sm text-gray-400'>
                                                            <Clock className='w-4 h-4' />
                                                            <span>{role.timeCommitment}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* Application Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={hasBeenInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className='bg-gray-900 p-8 rounded-2xl'
                        >
                            <h2 className='text-2xl font-bold text-white mb-8'>Volunteer Application</h2>

                            <form
                                onSubmit={handleSubmit}
                                className='space-y-6'
                            >
                                <div className='grid md:grid-cols-2 gap-4'>
                                    <div>
                                        <label className='block text-white text-sm font-medium mb-2'>
                                            <User className='w-4 h-4 inline mr-2' />
                                            Full Name *
                                        </label>
                                        <input
                                            type='text'
                                            name='name'
                                            required
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-(--color-tedx-red) focus:outline-none'
                                            placeholder='Enter your full name'
                                        />
                                    </div>

                                    <div>
                                        <label className='block text-white text-sm font-medium mb-2'>
                                            <Mail className='w-4 h-4 inline mr-2' />
                                            Email *
                                        </label>
                                        <input
                                            type='email'
                                            name='email'
                                            required
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-(--color-tedx-red) focus:outline-none'
                                            placeholder='Enter your email'
                                        />
                                    </div>
                                </div>

                                <div className='grid md:grid-cols-2 gap-4'>
                                    <div>
                                        <label className='block text-white text-sm font-medium mb-2'>
                                            <Phone className='w-4 h-4 inline mr-2' />
                                            Phone *
                                        </label>
                                        <input
                                            type='tel'
                                            name='phone'
                                            required
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-(--color-tedx-red) focus:outline-none'
                                            placeholder='Enter your phone number'
                                        />
                                    </div>

                                    <div>
                                        <label className='block text-white text-sm font-medium mb-2'>
                                            <Calendar className='w-4 h-4 inline mr-2' />
                                            Year of Study
                                        </label>
                                        <select
                                            name='year'
                                            value={formData.year}
                                            onChange={handleInputChange}
                                            className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-(--color-tedx-red) focus:outline-none'
                                        >
                                            <option value=''>Select year</option>
                                            <option value='1st-year'>1st Year</option>
                                            <option value='2nd-year'>2nd Year</option>
                                            <option value='3rd-year'>3rd Year</option>
                                            <option value='4th-year'>4th Year</option>
                                            <option value='postgraduate'>Postgraduate</option>
                                            <option value='faculty'>Faculty</option>
                                            <option value='other'>Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className='block text-white text-sm font-medium mb-2'>
                                        University/Institution *
                                    </label>
                                    <input
                                        type='text'
                                        name='university'
                                        required
                                        value={formData.university}
                                        onChange={handleInputChange}
                                        className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-(--color-tedx-red) focus:outline-none'
                                        placeholder='Your university or institution'
                                    />
                                </div>

                                <div>
                                    <label className='block text-white text-sm font-medium mb-2'>
                                        Previous Experience
                                    </label>
                                    <textarea
                                        name='experience'
                                        value={formData.experience}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-(--color-tedx-red) focus:outline-none'
                                        placeholder='Any relevant volunteer or event management experience?'
                                    />
                                </div>

                                <div>
                                    <label className='block text-white text-sm font-medium mb-2'>
                                        Why do you want to volunteer? *
                                    </label>
                                    <textarea
                                        name='motivation'
                                        required
                                        value={formData.motivation}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-(--color-tedx-red) focus:outline-none'
                                        placeholder='Tell us about your motivation to volunteer for TEDxNITSilchar...'
                                    />
                                </div>

                                <div>
                                    <label className='block text-white text-sm font-medium mb-2'>Availability *</label>
                                    <textarea
                                        name='availability'
                                        required
                                        value={formData.availability}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-(--color-tedx-red) focus:outline-none'
                                        placeholder='When are you available? (weekdays/weekends, time slots, etc.)'
                                    />
                                </div>

                                {selectedRoles.length > 0 && (
                                    <div className='bg-gray-800 p-4 rounded-lg'>
                                        <h4 className='text-white font-semibold mb-2'>Selected Roles:</h4>
                                        <div className='flex flex-wrap gap-2'>
                                            {selectedRoles.map(roleId => {
                                                const role = volunteerRoles.find(r => r.id === roleId);
                                                return (
                                                    <span
                                                        key={roleId}
                                                        className='bg-(--color-tedx-red) text-white px-3 py-1 rounded-full text-sm'
                                                    >
                                                        {role?.title}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                <CTAButton
                                    type='submit'
                                    className='w-full text-lg py-4'
                                    isLoading={createVolunteerApplicationMutation.isPending}
                                    disabled={
                                        createVolunteerApplicationMutation.isPending || selectedRoles.length === 0
                                    }
                                >
                                    {createVolunteerApplicationMutation.isPending
                                        ? 'Submitting Application...'
                                        : 'Submit Application'}
                                </CTAButton>

                                <p className='text-xs text-gray-400 text-center'>
                                    We'll review your application and get back to you within 3-5 business days.
                                </p>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
};
