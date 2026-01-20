import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, CreditCard, User, Mail, Phone, MapPin, Building2 } from 'lucide-react';
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
        price: 499,
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
        id: 'professional',
        name: 'Professional',
        price: 799,
        originalPrice: 999,
        features: [
            'Full day access to all talks',
            'Networking lunch included',
            'Digital certificate',
            'Photo opportunities',
            'Priority seating'
        ],
        available: true
    },
    {
        id: 'student',
        name: 'Student',
        price: 299,
        originalPrice: 499,
        features: [
            'Full day access to all talks',
            'Valid student ID required',
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
                            Register for <span className='text-[var(--color-tedx-red)]'>TEDxNITSilchar 2026</span>
                        </h1>
                        <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
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
                                        className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${selectedTicket === ticket.id
                                            ? 'border-[var(--color-tedx-red)] bg-[var(--color-tedx-red)]/10'
                                            : 'border-gray-700 bg-gray-900'
                                            } ${ticket.popular ? 'ring-2 ring-[var(--color-tedx-red)]/50' : ''}`}
                                        onClick={() => setSelectedTicket(ticket.id)}
                                    >
                                        {ticket.popular && (
                                            <div className='absolute -top-3 left-6 bg-[var(--color-tedx-red)] text-white px-4 py-1 rounded-full text-sm font-semibold'>
                                                Most Popular
                                            </div>
                                        )}

                                        <div className='flex items-start justify-between mb-4'>
                                            <div>
                                                <h3 className='text-xl font-bold text-white'>{ticket.name}</h3>
                                                <div className='flex items-center gap-2 mt-2'>
                                                    <span className='text-2xl font-bold text-[var(--color-tedx-red)]'>
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
                                                className={`w-6 h-6 rounded-full border-2 ${selectedTicket === ticket.id
                                                    ? 'border-[var(--color-tedx-red)] bg-[var(--color-tedx-red)]'
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
                                                    <Check className='w-4 h-4 text-[var(--color-tedx-red)] flex-shrink-0' />
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
                            <h2 className='text-2xl font-bold text-white mb-8'>Join Us at the Auditorium</h2>

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
                                            <p className='text-2xl font-bold text-[var(--color-tedx-red)]'>
                                                {selectedTicketData.price === 0
                                                    ? 'FREE'
                                                    : `₹${selectedTicketData.price}`}
                                            </p>
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
                                            Full Name
                                        </label>
                                        <input
                                            type='text'
                                            name='name'
                                            required
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[var(--color-tedx-red)] focus:outline-none'
                                            placeholder='Enter your full name'
                                        />
                                    </div>

                                    <div>
                                        <label className='block text-white text-sm font-medium mb-2'>
                                            <Mail className='w-4 h-4 inline mr-2' />
                                            Email Address
                                        </label>
                                        <input
                                            type='email'
                                            name='email'
                                            required
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[var(--color-tedx-red)] focus:outline-none'
                                            placeholder='Enter your email'
                                        />
                                    </div>
                                </div>

                                <div className='grid md:grid-cols-2 gap-4'>
                                    <div>
                                        <label className='block text-white text-sm font-medium mb-2'>
                                            <Phone className='w-4 h-4 inline mr-2' />
                                            Contact Number
                                        </label>
                                        <input
                                            type='tel'
                                            name='phone'
                                            required
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[var(--color-tedx-red)] focus:outline-none'
                                            placeholder='Enter your phone number'
                                        />
                                    </div>

                                    <div>
                                        <label className='block text-white text-sm font-medium mb-2'>
                                            <Building2 className='w-4 h-4 inline mr-2' />
                                            Institution / Organization
                                        </label>
                                        <input
                                            type='text'
                                            name='organization'
                                            value={formData.organization}
                                            onChange={handleInputChange}
                                            className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[var(--color-tedx-red)] focus:outline-none'
                                            placeholder='Your institution or organization'
                                        />
                                    </div>
                                </div>

                                <CTAButton
                                    type='submit'
                                    className='w-full text-lg py-4'
                                    isLoading={createTicketMutation.isPending}
                                    disabled={createTicketMutation.isPending}
                                >
                                    📩 Submit & Reserve Seat
                                </CTAButton>

                                <div className='text-center space-y-4'>
                                    <p className='text-sm text-gray-400'>
                                        Don’t miss out! Seats are limited, and the experience is unforgettable.
                                        After registration, you’ll receive a confirmation email with event details, arrival timing, venue guide, and more.
                                    </p>

                                    <div className="bg-[var(--color-tedx-red)]/10 border border-[var(--color-tedx-red)]/20 rounded-lg p-4 text-left">
                                        <p className="text-[var(--color-tedx-red)] font-semibold mb-2">Note:</p>
                                        <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                                            <li>All attendees are requested to carry a valid ID.</li>
                                            <li>Students must bring a valid student ID card at the venue for verification.</li>
                                        </ul>
                                    </div>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
};
