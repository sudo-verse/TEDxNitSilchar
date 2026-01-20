import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Building, Users, Zap, Globe, Mail, Phone, User, FileText, DollarSign, Calendar } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { CTAButton } from '@/components/ui/cta-button';
import { useCreatePartnershipInquiry } from '@/services/partnership';
import type { CreatePartnershipInquiryInput } from '@/types/partner';

interface PartnershipTier {
    id: string;
    name: string;
    price: string;
    features: string[];
    popular?: boolean;
    color: string;
}

const partnershipTiers: PartnershipTier[] = [
    {
        id: 'title',
        name: 'Title Partner',
        price: 'Custom',
        features: [
            'Event co-branding opportunity',
            'Prime logo placement on all materials',
            'Dedicated speaker slot',
            'VIP networking access',
            'Custom exhibition space',
            'Social media co-promotion',
            'Press release inclusion'
        ],
        popular: true,
        color: 'from-red-600 to-red-800'
    },
    {
        id: 'presenting',
        name: 'Presenting Partner',
        price: '₹2,50,000',
        features: [
            'Logo on all marketing materials',
            'Exhibition booth space',
            'Speaking opportunity',
            'Attendee database access',
            'Social media mentions',
            'Event photography rights',
            '10 complimentary tickets'
        ],
        color: 'from-blue-600 to-blue-800'
    },
    {
        id: 'supporting',
        name: 'Supporting Partner',
        price: '₹1,00,000',
        features: [
            'Logo on select materials',
            'Small exhibition space',
            'Networking opportunities',
            'Social media recognition',
            'Event updates and reports',
            '5 complimentary tickets'
        ],
        color: 'from-green-600 to-green-800'
    },
    {
        id: 'community',
        name: 'Community Partner',
        price: '₹50,000',
        features: [
            'Logo on website',
            'Networking access',
            'Event mentions',
            'Digital marketing inclusion',
            '2 complimentary tickets'
        ],
        color: 'from-purple-600 to-purple-800'
    }
];

const partnershipBenefits = [
    {
        icon: Users,
        title: 'Brand Visibility',
        description: 'Reach a diverse audience of students, professionals, and thought leaders from Northeast India'
    },
    {
        icon: Zap,
        title: 'Innovation Network',
        description: 'Connect with innovative minds and emerging technologies in the region'
    },
    {
        icon: Globe,
        title: 'CSR Opportunity',
        description: 'Support education and idea sharing while fulfilling corporate social responsibility goals'
    },
    {
        icon: Building,
        title: 'Business Development',
        description: 'Network with potential clients, partners, and talented individuals'
    }
];

export const PartnershipPage = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { hasBeenInView } = useInView(sectionRef, { threshold: 0.1 });
    const [selectedTier, setSelectedTier] = useState<string>('');
    const [formData, setFormData] = useState({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        website: '',
        industry: '',
        companySize: '',
        interests: '',
        budget: '',
        timeline: '',
        message: ''
    });

    const createInquiryMutation = useCreatePartnershipInquiry();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const inquiryData: CreatePartnershipInquiryInput = {
                ...formData,
                selectedTier
            };

            await createInquiryMutation.mutateAsync(inquiryData);

            alert(
                'Thank you for your interest in partnering with TEDxNITSilchar 2026! Our partnerships team will contact you within 24-48 hours.'
            );

            // Reset form
            setFormData({
                companyName: '',
                contactName: '',
                email: '',
                phone: '',
                website: '',
                industry: '',
                companySize: '',
                interests: '',
                budget: '',
                timeline: '',
                message: ''
            });
            setSelectedTier('');
        } catch (error) {
            console.error('Error submitting partnership inquiry:', error);
            alert('There was an error submitting your inquiry. Please try again or contact us directly.');
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
                            Partner with <span className='text-(--color-tedx-red)'>Us</span>
                        </h1>
                        <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
                            Join us in spreading ideas worth spreading. Partner with TEDxNITSilchar 2026 and connect
                            with innovative minds while supporting education and thought leadership in Northeast India.
                        </p>
                    </motion.div>

                    {/* Partnership Benefits */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className='mb-16'
                    >
                        <h2 className='text-3xl font-bold text-white text-center mb-12'>
                            Why Partner with TEDxNITSilchar?
                        </h2>
                        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
                            {partnershipBenefits.map((benefit, index) => {
                                const IconComponent = benefit.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                        transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                                        className='text-center'
                                    >
                                        <div className='w-16 h-16 bg-(--color-tedx-red)/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                                            <IconComponent className='w-8 h-8 text-(--color-tedx-red)' />
                                        </div>
                                        <h3 className='text-xl font-bold text-white mb-3'>{benefit.title}</h3>
                                        <p className='text-gray-300'>{benefit.description}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Partnership Tiers */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className='mb-16'
                    >
                        <h2 className='text-3xl font-bold text-white text-center mb-12'>Partnership Tiers</h2>
                        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
                            {partnershipTiers.map((tier, index) => (
                                <motion.div
                                    key={tier.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                    className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 ${selectedTier === tier.id
                                            ? 'ring-2 ring-(--color-tedx-red) bg-gray-800'
                                            : 'bg-gray-900 hover:bg-gray-800'
                                        } ${tier.popular ? 'border-2 border-(--color-tedx-red)/50' : ''}`}
                                    onClick={() => setSelectedTier(tier.id)}
                                >
                                    {tier.popular && (
                                        <div className='absolute -top-3 left-1/2 transform -translate-x-1/2 bg-(--color-tedx-red) text-white px-4 py-1 rounded-full text-sm font-semibold'>
                                            Most Popular
                                        </div>
                                    )}

                                    <div className={`w-full h-2 rounded-full bg-gradient-to-r ${tier.color} mb-6`} />

                                    <div className='text-center mb-6'>
                                        <h3 className='text-xl font-bold text-white mb-2'>{tier.name}</h3>
                                        <div className='text-2xl font-bold text-(--color-tedx-red)'>
                                            {tier.price}
                                        </div>
                                    </div>

                                    <ul className='space-y-3'>
                                        {tier.features.map((feature, featureIndex) => (
                                            <li
                                                key={featureIndex}
                                                className='flex items-start gap-3 text-gray-300'
                                            >
                                                <div className='w-2 h-2 bg-(--color-tedx-red) rounded-full mt-2 flex-shrink-0' />
                                                <span className='text-sm'>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Partnership Inquiry Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className='max-w-4xl mx-auto'
                    >
                        <div className='bg-gray-900 p-8 rounded-2xl'>
                            <h2 className='text-3xl font-bold text-white mb-8 text-center'>Partnership Inquiry</h2>

                            <form
                                onSubmit={handleSubmit}
                                className='space-y-6'
                            >
                                {/* Company Information */}
                                <div>
                                    <h3 className='text-xl font-bold text-(--color-tedx-red) mb-6'>
                                        Company Information
                                    </h3>

                                    <div className='grid md:grid-cols-2 gap-6'>
                                        <div>
                                            <label className='block text-white text-sm font-medium mb-2'>
                                                <Building className='w-4 h-4 inline mr-2' />
                                                Company Name *
                                            </label>
                                            <input
                                                type='text'
                                                name='companyName'
                                                required
                                                value={formData.companyName}
                                                onChange={handleInputChange}
                                                className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-(--color-tedx-red) focus:outline-none'
                                                placeholder='Your company name'
                                            />
                                        </div>

                                        <div>
                                            <label className='block text-white text-sm font-medium mb-2'>
                                                <Globe className='w-4 h-4 inline mr-2' />
                                                Website
                                            </label>
                                            <input
                                                type='url'
                                                name='website'
                                                value={formData.website}
                                                onChange={handleInputChange}
                                                className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-(--color-tedx-red) focus:outline-none'
                                                placeholder='https://your-company.com'
                                            />
                                        </div>
                                    </div>

                                    <div className='grid md:grid-cols-2 gap-6 mt-6'>
                                        <div>
                                            <label className='block text-white text-sm font-medium mb-2'>
                                                Industry
                                            </label>
                                            <select
                                                name='industry'
                                                value={formData.industry}
                                                onChange={handleInputChange}
                                                className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-(--color-tedx-red) focus:outline-none'
                                            >
                                                <option value=''>Select industry</option>
                                                <option value='technology'>Technology</option>
                                                <option value='finance'>Finance</option>
                                                <option value='healthcare'>Healthcare</option>
                                                <option value='education'>Education</option>
                                                <option value='manufacturing'>Manufacturing</option>
                                                <option value='consulting'>Consulting</option>
                                                <option value='retail'>Retail</option>
                                                <option value='media'>Media & Entertainment</option>
                                                <option value='other'>Other</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className='block text-white text-sm font-medium mb-2'>
                                                Company Size
                                            </label>
                                            <select
                                                name='companySize'
                                                value={formData.companySize}
                                                onChange={handleInputChange}
                                                className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-(--color-tedx-red) focus:outline-none'
                                            >
                                                <option value=''>Select size</option>
                                                <option value='startup'>Startup (1-50)</option>
                                                <option value='small'>Small (51-200)</option>
                                                <option value='medium'>Medium (201-1000)</option>
                                                <option value='large'>Large (1000+)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Information */}
                                <div>
                                    <h3 className='text-xl font-bold text-(--color-tedx-red) mb-6'>
                                        Contact Information
                                    </h3>

                                    <div className='grid md:grid-cols-2 gap-6'>
                                        <div>
                                            <label className='block text-white text-sm font-medium mb-2'>
                                                <User className='w-4 h-4 inline mr-2' />
                                                Contact Person *
                                            </label>
                                            <input
                                                type='text'
                                                name='contactName'
                                                required
                                                value={formData.contactName}
                                                onChange={handleInputChange}
                                                className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-(--color-tedx-red) focus:outline-none'
                                                placeholder='Your full name'
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
                                                placeholder='your.email@company.com'
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

                                {/* Partnership Details */}
                                <div>
                                    <h3 className='text-xl font-bold text-(--color-tedx-red) mb-6'>
                                        Partnership Details
                                    </h3>

                                    {selectedTier && (
                                        <div className='bg-gray-800 p-4 rounded-lg mb-6'>
                                            <h4 className='text-white font-semibold mb-2'>
                                                Selected Partnership Tier:
                                            </h4>
                                            <span className='bg-(--color-tedx-red) text-white px-3 py-1 rounded-full text-sm'>
                                                {partnershipTiers.find(tier => tier.id === selectedTier)?.name}
                                            </span>
                                        </div>
                                    )}

                                    <div className='grid md:grid-cols-2 gap-6'>
                                        <div>
                                            <label className='block text-white text-sm font-medium mb-2'>
                                                <DollarSign className='w-4 h-4 inline mr-2' />
                                                Budget Range
                                            </label>
                                            <select
                                                name='budget'
                                                value={formData.budget}
                                                onChange={handleInputChange}
                                                className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-(--color-tedx-red) focus:outline-none'
                                            >
                                                <option value=''>Select budget range</option>
                                                <option value='under-50k'>Under ₹50,000</option>
                                                <option value='50k-1l'>₹50,000 - ₹1,00,000</option>
                                                <option value='1l-2.5l'>₹1,00,000 - ₹2,50,000</option>
                                                <option value='above-2.5l'>Above ₹2,50,000</option>
                                                <option value='custom'>Custom/Flexible</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className='block text-white text-sm font-medium mb-2'>
                                                <Calendar className='w-4 h-4 inline mr-2' />
                                                Decision Timeline
                                            </label>
                                            <select
                                                name='timeline'
                                                value={formData.timeline}
                                                onChange={handleInputChange}
                                                className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-(--color-tedx-red) focus:outline-none'
                                            >
                                                <option value=''>Select timeline</option>
                                                <option value='immediate'>Immediate (within 1 week)</option>
                                                <option value='short'>Short term (1-2 weeks)</option>
                                                <option value='medium'>Medium term (2-4 weeks)</option>
                                                <option value='long'>Long term (1+ months)</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className='mt-6'>
                                        <label className='block text-white text-sm font-medium mb-2'>
                                            Partnership Interests
                                        </label>
                                        <textarea
                                            name='interests'
                                            value={formData.interests}
                                            onChange={handleInputChange}
                                            rows={3}
                                            className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-(--color-tedx-red) focus:outline-none'
                                            placeholder='What specific benefits or opportunities are you most interested in?'
                                        />
                                    </div>

                                    <div className='mt-6'>
                                        <label className='block text-white text-sm font-medium mb-2'>
                                            <FileText className='w-4 h-4 inline mr-2' />
                                            Additional Message
                                        </label>
                                        <textarea
                                            name='message'
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            rows={4}
                                            className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-(--color-tedx-red) focus:outline-none'
                                            placeholder='Tell us more about your company and why you want to partner with TEDxNITSilchar...'
                                        />
                                    </div>
                                </div>

                                <CTAButton
                                    type='submit'
                                    className='w-full text-lg py-4'
                                    isLoading={createInquiryMutation.isPending}
                                    disabled={createInquiryMutation.isPending}
                                >
                                    {createInquiryMutation.isPending
                                        ? 'Submitting Inquiry...'
                                        : 'Submit Partnership Inquiry'}
                                </CTAButton>

                                <p className='text-xs text-gray-400 text-center'>
                                    Our partnerships team will review your inquiry and contact you within 24-48 hours to
                                    discuss opportunities.
                                </p>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
};
