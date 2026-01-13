import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, CreditCard, User, Mail, Phone, MapPin } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { CTAButton } from '@/components/ui/cta-button';
import { useCreateTicket } from '@/services/ticket';

interface TicketType {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    features: string[];
    popular?: boolean;
    available: boolean;
}

const ticketTypes: TicketType[] = [
    {
        id: 'early-bird',
        name: 'Early Bird',
        price: 0,
        originalPrice: 799,
        features: [
            'Full day access to all talks',
            'Networking lunch included',
            'TEDxNITSilchar merchandise',
            'Digital certificate',
            'Photo opportunities'
        ],
        popular: true,
        available: true
    },
    {
        id: 'regular',
        name: 'Regular',
        price: 0,
        originalPrice: 799,
        features: [
            'Full day access to all talks',
            'Networking lunch included',
            'Digital certificate',
            'Photo opportunities'
        ],
        available: true
    },
    {
        id: 'student',
        name: 'Student',
        price: 0,
        originalPrice: 299,
        features: [
            'Full day access to all talks',
            'Student ID required',
            'Digital certificate',
            'Networking opportunities'
        ],
        available: true
    }
];

export const TicketsPage = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { hasBeenInView } = useInView(sectionRef, { threshold: 0.1 });
    const [selectedTicket, setSelectedTicket] = useState<string>('early-bird');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        organization: '',
        dietary: ''
    });
    const createTicketMutation = useCreateTicket();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const selectedTicketData = ticketTypes.find(ticket => ticket.id === selectedTicket);
        if (!selectedTicketData) return;

        const processingFee = 0;
        const totalAmount = selectedTicketData.price + processingFee;

        try {
            await createTicketMutation.mutateAsync({
                ticketType: selectedTicket,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                organization: formData.organization || undefined,
                dietary: formData.dietary || undefined,
                price: selectedTicketData.price,
                processingFee,
                totalAmount
            });

            alert('Registration successful! You will receive a confirmation email shortly.');

            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                organization: '',
                dietary: ''
            });
        } catch (error) {
            console.error('Error purchasing ticket:', error);
            alert('Registration failed. Please try again.');
        }
    };

    const selectedTicketData = ticketTypes.find(ticket => ticket.id === selectedTicket);

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
                        <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6'>
                            Register for TEDx<span className='text-(--color-tedx-red)'>NITSilchar</span> 2026
                        </h1>
                        <p className='text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed'>
                            Secure your seat for a day of bold ideas, powerful stories, and meaningful connection.
                        </p>
                    </motion.div>

                    <div className='grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto'>
                        {/* Ticket Selection */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={hasBeenInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <h2 className='text-2xl font-bold text-white mb-8'>Choose Your Ticket</h2>

                            <div className='space-y-6'>
                                {ticketTypes.map(ticket => (
                                    <motion.div
                                        key={ticket.id}
                                        whileHover={{ scale: 1.02 }}
                                        className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                                            selectedTicket === ticket.id
                                                ? 'border-(--color-tedx-red) bg-(--color-tedx-red)/10'
                                                : 'border-gray-700 bg-gray-900'
                                        } ${ticket.popular ? 'ring-2 ring-(--color-tedx-red)/50' : ''}`}
                                        onClick={() => setSelectedTicket(ticket.id)}
                                    >
                                        {ticket.popular && (
                                            <div className='absolute -top-3 left-6 bg-(--color-tedx-red) text-white px-4 py-1 rounded-full text-sm font-semibold'>
                                                Most Popular
                                            </div>
                                        )}

                                        <div className='flex items-start justify-between mb-4'>
                                            <div>
                                                <h3 className='text-xl font-bold text-white'>{ticket.name}</h3>
                                                <div className='flex items-center gap-2 mt-2'>
                                                    <span className='text-2xl font-bold text-(--color-tedx-red)'>
                                                        {ticket.price === 0 ? 'FREE' : `₹${ticket.price}`}
                                                    </span>
                                                    {ticket.originalPrice && (
                                                        <span className='text-gray-500 line-through'>
                                                            ₹{ticket.originalPrice}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div
                                                className={`w-6 h-6 rounded-full border-2 ${
                                                    selectedTicket === ticket.id
                                                        ? 'border-(--color-tedx-red) bg-(--color-tedx-red)'
                                                        : 'border-gray-500'
                                                } flex items-center justify-center`}
                                            >
                                                {selectedTicket === ticket.id && (
                                                    <Check className='w-4 h-4 text-white' />
                                                )}
                                            </div>
                                        </div>

                                        <ul className='space-y-2'>
                                            {ticket.features.map((feature, index) => (
                                                <li
                                                    key={index}
                                                    className='flex items-center gap-3 text-gray-300'
                                                >
                                                    <Check className='w-4 h-4 text-(--color-tedx-red) flex-shrink-0' />
                                                    <span className='text-sm'>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Purchase Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={hasBeenInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className='bg-gray-900 p-8 rounded-2xl'
                        >
                            <h2 className='text-2xl font-bold text-white mb-8'>Purchase Details</h2>

                            {selectedTicketData && (
                                <div className='bg-gray-800 p-4 rounded-xl mb-6'>
                                    <div className='flex items-center justify-between'>
                                        <div>
                                            <h3 className='font-semibold text-white'>
                                                {selectedTicketData.name} Ticket
                                            </h3>
                                            <p className='text-gray-400 text-sm'>TEDxNITSilchar 2026</p>
                                        </div>
                                        <div className='text-right'>
                                            <p className='text-2xl font-bold text-(--color-tedx-red)'>
                                                {selectedTicketData.price === 0
                                                    ? 'FREE'
                                                    : `₹${selectedTicketData.price}`}
                                            </p>
                                            {selectedTicketData.originalPrice && (
                                                <p className='text-gray-500 line-through text-sm'>
                                                    ₹{selectedTicketData.originalPrice}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

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
                                            <MapPin className='w-4 h-4 inline mr-2' />
                                            Organization
                                        </label>
                                        <input
                                            type='text'
                                            name='organization'
                                            value={formData.organization}
                                            onChange={handleInputChange}
                                            className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-(--color-tedx-red) focus:outline-none'
                                            placeholder='Your organization/institution'
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className='block text-white text-sm font-medium mb-2'>
                                        Dietary Requirements
                                    </label>
                                    <textarea
                                        name='dietary'
                                        value={formData.dietary}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-(--color-tedx-red) focus:outline-none'
                                        placeholder='Any dietary restrictions or special requirements?'
                                    />
                                </div>

                                <div className='bg-gray-800 p-4 rounded-lg'>
                                    <div className='flex items-center justify-between mb-2'>
                                        <span className='text-gray-300'>Subtotal:</span>
                                        <span className='text-white'>
                                            {selectedTicketData?.price === 0 ? 'FREE' : `₹${selectedTicketData?.price}`}
                                        </span>
                                    </div>
                                    <div className='flex items-center justify-between mb-2'>
                                        <span className='text-gray-300'>Processing Fee:</span>
                                        <span className='text-white'>₹0</span>
                                    </div>
                                    <hr className='border-gray-700 my-2' />
                                    <div className='flex items-center justify-between font-bold'>
                                        <span className='text-white'>Total:</span>
                                        <span className='text-(--color-tedx-red) text-xl'>
                                            {(selectedTicketData?.price || 0) + 0 === 0
                                                ? 'FREE'
                                                : `₹${(selectedTicketData?.price || 0) + 0}`}
                                        </span>
                                    </div>
                                </div>

                                <CTAButton
                                    type='submit'
                                    className='w-full text-lg py-4'
                                    isLoading={createTicketMutation.isPending}
                                    disabled={createTicketMutation.isPending}
                                >
                                    <CreditCard className='w-5 h-5 mr-2' />
                                    {createTicketMutation.isPending ? 'Processing...' : 'Register for Free'}
                                </CTAButton>

                                <p className='text-xs text-gray-400 text-center'>
                                    By registering, you agree to our terms and conditions. Registration is free for our
                                    inaugural event.
                                </p>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
};
