import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
    Mail,
    Phone,
    MapPin,
    User,
    FileText,
    Clock,
    MessageCircle,
    Instagram,
    Linkedin,
    Twitter,
    Youtube,
    Globe,
    Users,
    Calendar
} from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { CTAButton } from '@/components/ui/cta-button';
import { useCreateContactMessage } from '@/services/contact';
import type { CreateContactMessageInput } from '@/types/contact';

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    category: string;
    message: string;
}

const contactCategories = [
    'General Inquiry',
    'Speaker Nomination',
    'Partnership',
    'Sponsorship',
    'Media & Press',
    'Volunteer Opportunity',
    'Event Information',
    'Technical Support',
    'Other'
];

const contactInfo = [
    {
        icon: Mail,
        title: 'Email Us',
        details: ['tedxnitsilcharteam@gmail.com'],
        description: "Send us an email and we'll respond within 24 hours"
    },
    {
        icon: Phone,
        title: 'Call Us',
        details: ['+91 93414 48805', '+91 94700 40511'],
        description: 'Available Mon-Fri, 9:00 AM - 6:00 PM IST'
    },
    {
        icon: MapPin,
        title: 'Visit Us',
        details: ['National Institute of Technology', 'Silchar, Assam 788010, India'],
        description: 'Campus visits by appointment only'
    },
    {
        icon: Clock,
        title: 'Response Time',
        details: ['24-48 hours', 'General inquiries'],
        description: 'We aim to respond to all inquiries promptly'
    }
];

export const ContactUsPage = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { hasBeenInView } = useInView(sectionRef, { threshold: 0.1 });
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        phone: '',
        subject: '',
        category: '',
        message: ''
    });
    const createContactMutation = useCreateContactMessage();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const contactData: CreateContactMessageInput = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone || undefined,
                subject: formData.subject,
                category: formData.category || undefined,
                message: formData.message
            };

            await createContactMutation.mutateAsync(contactData);

            alert(
                'Thank you for contacting TEDxNITSilchar 2026! We have received your message and will respond within 24-48 hours.'
            );

            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                category: '',
                message: ''
            });
        } catch (error) {
            console.error('Error submitting contact form:', error);
            alert('There was an error submitting your message. Please try again or contact us directly.');
        }
    };

    return (
        <main className='min-h-screen bg-black pt-20'>
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
                            Contact <span className='text-(--color-tedx-red)'>Us</span>
                        </h1>
                        <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
                            Have a question, idea, or want to get involved with TEDxNITSilchar 2026? We'd love to hear
                            from you. Reach out and let's start a conversation.
                        </p>
                    </motion.div>

                    {/* Contact Information Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className='mb-16'
                    >
                        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
                            {contactInfo.map((info, index) => {
                                const IconComponent = info.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                        transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                                        className='bg-gray-900 p-6 rounded-2xl text-center hover:bg-gray-800 transition-colors'
                                    >
                                        <div className='w-12 h-12 bg-(--color-tedx-red)/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                                            <IconComponent className='w-6 h-6 text-(--color-tedx-red)' />
                                        </div>
                                        <h3 className='text-lg font-bold text-white mb-3'>{info.title}</h3>
                                        <div className='space-y-1 mb-3'>
                                            {info.details.map((detail, idx) => (
                                                <p
                                                    key={idx}
                                                    className='text-(--color-tedx-red) font-medium'
                                                >
                                                    {detail}
                                                </p>
                                            ))}
                                        </div>
                                        <p className='text-sm text-gray-400'>{info.description}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className='max-w-4xl mx-auto'
                    >
                        <div className='bg-gray-900 p-8 rounded-2xl'>
                            <div className='text-center mb-8'>
                                <h2 className='text-3xl font-bold text-white mb-4'>Send us a Message</h2>
                                <p className='text-gray-300'>
                                    Fill out the form below and we'll get back to you as soon as possible.
                                </p>
                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className='space-y-6'
                            >
                                {/* Personal Information */}
                                <div>
                                    <h3 className='text-xl font-bold text-(--color-tedx-red) mb-6'>
                                        Personal Information
                                    </h3>

                                    <div className='grid md:grid-cols-2 gap-6'>
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
                                                placeholder='Your full name'
                                            />
                                        </div>

                                        <div>
                                            <label className='block text-white text-sm font-medium mb-2'>
                                                <Mail className='w-4 h-4 inline mr-2' />
                                                Email Address *
                                            </label>
                                            <input
                                                type='email'
                                                name='email'
                                                required
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-(--color-tedx-red) focus:outline-none'
                                                placeholder='your.email@example.com'
                                            />
                                        </div>
                                    </div>

                                    <div className='mt-6'>
                                        <label className='block text-white text-sm font-medium mb-2'>
                                            <Phone className='w-4 h-4 inline mr-2' />
                                            Phone Number
                                        </label>
                                        <input
                                            type='tel'
                                            name='phone'
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-(--color-tedx-red) focus:outline-none'
                                            placeholder='+91 9999999999'
                                        />
                                    </div>
                                </div>

                                {/* Message Details */}
                                <div>
                                    <h3 className='text-xl font-bold text-(--color-tedx-red) mb-6'>
                                        Message Details
                                    </h3>

                                    <div className='grid md:grid-cols-2 gap-6'>
                                        <div>
                                            <label className='block text-white text-sm font-medium mb-2'>
                                                Subject *
                                            </label>
                                            <input
                                                type='text'
                                                name='subject'
                                                required
                                                value={formData.subject}
                                                onChange={handleInputChange}
                                                className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-(--color-tedx-red) focus:outline-none'
                                                placeholder='Brief subject of your message'
                                            />
                                        </div>

                                        <div>
                                            <label className='block text-white text-sm font-medium mb-2'>
                                                <MessageCircle className='w-4 h-4 inline mr-2' />
                                                Category
                                            </label>
                                            <select
                                                name='category'
                                                value={formData.category}
                                                onChange={handleInputChange}
                                                className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-(--color-tedx-red) focus:outline-none'
                                            >
                                                <option value=''>Select a category</option>
                                                {contactCategories.map(category => (
                                                    <option
                                                        key={category}
                                                        value={category}
                                                    >
                                                        {category}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className='mt-6'>
                                        <label className='block text-white text-sm font-medium mb-2'>
                                            <FileText className='w-4 h-4 inline mr-2' />
                                            Your Message *
                                        </label>
                                        <textarea
                                            name='message'
                                            required
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            rows={6}
                                            className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-(--color-tedx-red) focus:outline-none'
                                            placeholder='Tell us more about your inquiry, ideas, or how you would like to get involved with TEDxNITSilchar 2026...'
                                        />
                                    </div>
                                </div>

                                <CTAButton
                                    type='submit'
                                    className='w-full text-lg py-4'
                                    isLoading={createContactMutation.isPending}
                                    disabled={createContactMutation.isPending}
                                >
                                    {createContactMutation.isPending ? 'Sending Message...' : 'Send Message'}
                                </CTAButton>

                                <p className='text-xs text-gray-400 text-center'>
                                    We typically respond to all inquiries within 24-48 hours during business days.
                                </p>
                            </form>
                        </div>
                    </motion.div>

                    {/* Other Ways to Connect */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className='mt-16'
                    >
                        <div className='text-center mb-12'>
                            <h3 className='text-3xl font-bold text-white mb-4'>Other Ways to Connect</h3>
                            <p className='text-gray-300 max-w-2xl mx-auto'>
                                Stay connected with TEDxNITSilchar 2026 through various channels and be part of our
                                growing community.
                            </p>
                        </div>

                        {/* Social Media Links */}
                        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
                            <motion.a
                                href='https://www.instagram.com/tedx.nitsilchar/'
                                target='_blank'
                                rel='noopener noreferrer'
                                initial={{ opacity: 0, y: 20 }}
                                animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                                className='bg-gradient-to-br from-purple-600 to-pink-600 p-6 rounded-2xl text-center hover:scale-105 transition-transform group'
                            >
                                <Instagram className='w-8 h-8 text-white mx-auto mb-4' />
                                <h4 className='text-lg font-bold text-white mb-2'>Instagram</h4>
                                <p className='text-sm text-gray-200'>
                                    Follow for behind-the-scenes content and updates
                                </p>
                                <div className='mt-3 text-xs text-gray-300 group-hover:text-white transition-colors'>
                                    @tedxnitsilchar
                                </div>
                            </motion.a>

                            <motion.a
                                href='https://www.linkedin.com/in/tedxnitsilchar-1b7124389/'
                                target='_blank'
                                rel='noopener noreferrer'
                                initial={{ opacity: 0, y: 20 }}
                                animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                                className='bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-2xl text-center hover:scale-105 transition-transform group'
                            >
                                <Linkedin className='w-8 h-8 text-white mx-auto mb-4' />
                                <h4 className='text-lg font-bold text-white mb-2'>LinkedIn</h4>
                                <p className='text-sm text-gray-200'>Connect with us professionally</p>
                                <div className='mt-3 text-xs text-gray-300 group-hover:text-white transition-colors'>
                                    TEDxNITSilchar
                                </div>
                            </motion.a>

                            <motion.a
                                href='https://twitter.com/tedxnitsilchar'
                                target='_blank'
                                rel='noopener noreferrer'
                                initial={{ opacity: 0, y: 20 }}
                                animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, delay: 0.9 }}
                                className='bg-gradient-to-br from-blue-400 to-blue-500 p-6 rounded-2xl text-center hover:scale-105 transition-transform group'
                            >
                                <Twitter className='w-8 h-8 text-white mx-auto mb-4' />
                                <h4 className='text-lg font-bold text-white mb-2'>Twitter</h4>
                                <p className='text-sm text-gray-200'>
                                    Get real-time updates and engage with our community
                                </p>
                                <div className='mt-3 text-xs text-gray-300 group-hover:text-white transition-colors'>
                                    @tedxnitsilchar
                                </div>
                            </motion.a>

                            <motion.a
                                href='https://youtube.com/@tedxnitsilchar'
                                target='_blank'
                                rel='noopener noreferrer'
                                initial={{ opacity: 0, y: 20 }}
                                animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, delay: 1.0 }}
                                className='bg-gradient-to-br from-red-600 to-red-700 p-6 rounded-2xl text-center hover:scale-105 transition-transform group'
                            >
                                <Youtube className='w-8 h-8 text-white mx-auto mb-4' />
                                <h4 className='text-lg font-bold text-white mb-2'>YouTube</h4>
                                <p className='text-sm text-gray-200'>Watch past talks and event highlights</p>
                                <div className='mt-3 text-xs text-gray-300 group-hover:text-white transition-colors'>
                                    TEDxNITSilchar
                                </div>
                            </motion.a>
                        </div>

                        {/* Additional Connection Methods */}
                        <div className='grid md:grid-cols-3 gap-6'>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, delay: 1.1 }}
                                className='bg-gray-900 p-6 rounded-2xl text-center hover:bg-gray-800 transition-colors group'
                            >
                                <div className='w-12 h-12 bg-(--color-tedx-red)/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                                    <Globe className='w-6 h-6 text-(--color-tedx-red)' />
                                </div>
                                <h4 className='text-lg font-bold text-white mb-3'>Official Website</h4>
                                <p className='text-sm text-gray-300 mb-4'>
                                    Visit our main website for comprehensive information about our events and
                                    initiatives.
                                </p>
                                <a
                                    href='https://tedxnitsilchar.com'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='text-(--color-tedx-red) hover:text-red-400 transition-colors text-sm font-medium'
                                >
                                    tedxnitsilchar.com →
                                </a>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, delay: 1.2 }}
                                className='bg-gray-900 p-6 rounded-2xl text-center hover:bg-gray-800 transition-colors group'
                            >
                                <div className='w-12 h-12 bg-(--color-tedx-red)/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                                    <Users className='w-6 h-6 text-(--color-tedx-red)' />
                                </div>
                                <h4 className='text-lg font-bold text-white mb-3'>Join Our Community</h4>
                                <p className='text-sm text-gray-300 mb-4'>
                                    Become a volunteer, attend our meetups, or join our organizing committee to be part
                                    of the journey.
                                </p>
                                <button className='text-(--color-tedx-red) hover:text-red-400 transition-colors text-sm font-medium'>
                                    Learn More →
                                </button>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, delay: 1.3 }}
                                className='bg-gray-900 p-6 rounded-2xl text-center hover:bg-gray-800 transition-colors group'
                            >
                                <div className='w-12 h-12 bg-(--color-tedx-red)/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                                    <Calendar className='w-6 h-6 text-(--color-tedx-red)' />
                                </div>
                                <h4 className='text-lg font-bold text-white mb-3'>Event Updates</h4>
                                <p className='text-sm text-gray-300 mb-4'>
                                    Subscribe to our newsletter for exclusive updates, early bird tickets, and speaker
                                    announcements.
                                </p>
                                <button className='text-(--color-tedx-red) hover:text-red-400 transition-colors text-sm font-medium'>
                                    Subscribe Now →
                                </button>
                            </motion.div>
                        </div>

                        {/* Call-to-Action */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 1.4 }}
                            className='text-center mt-12 p-8 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl'
                        >
                            <h4 className='text-2xl font-bold text-white mb-4'>Ready to Spread Ideas Worth Sharing?</h4>
                            <p className='text-gray-300 mb-6 max-w-2xl mx-auto'>
                                Whether you're a speaker, volunteer, sponsor, or simply someone passionate about ideas,
                                there's a place for you in the TEDxNITSilchar community.
                            </p>
                            <div className='flex flex-wrap justify-center gap-4'>
                                <CTAButton className='px-8 py-3'>Get Involved</CTAButton>
                                <button className='px-8 py-3 bg-transparent border border-(--color-tedx-red) text-(--color-tedx-red) rounded-full hover:bg-(--color-tedx-red) hover:text-white transition-colors'>
                                    Learn More
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
};
