import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Globe, Award, MessageSquare, CheckCircle } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { CTAButton } from '@/components/ui/cta-button';
import { useCreateSpeakerNomination } from '@/services/nomination';

const nominationCriteria = [
    {
        title: 'Ideas Worth Spreading',
        description: 'Speaker has compelling ideas that can inspire and educate our audience'
    },
    {
        title: 'Expertise & Credibility',
        description: 'Demonstrated expertise in their field with proven track record'
    },
    {
        title: 'Communication Skills',
        description: 'Ability to communicate complex ideas in an engaging and accessible way'
    },
    {
        title: 'Alignment with Theme',
        description: 'Content aligns with our theme "Turning Lessons into Legacies"'
    }
];

export const SpeakerNominationPage = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const { hasBeenInView } = useInView(sectionRef, { threshold: 0.1 });
    const [formData, setFormData] = useState({
        // Nominee Information
        speakerName: '',
        speakerEmail: '',
        speakerPhone: '',
        speakerWebsite: '',
        speakerBio: '',
        speakerAchievements: '',
        talkTitle: '',
        talkDescription: '',
        talkDuration: '',
        talkRelevance: '',
        // Nominator Information
        nominatorName: '',
        nominatorEmail: '',
        nominatorPhone: '',
        nominatorRelation: '',
        // Additional Information
        previousTalks: '',
        additionalInfo: ''
    });
    const createSpeakerNominationMutation = useCreateSpeakerNomination();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await createSpeakerNominationMutation.mutateAsync({
                speakerName: formData.speakerName,
                speakerEmail: formData.speakerEmail || undefined,
                speakerPhone: formData.speakerPhone || undefined,
                speakerWebsite: formData.speakerWebsite || undefined,
                speakerBio: formData.speakerBio,
                speakerAchievements: formData.speakerAchievements,
                talkTitle: formData.talkTitle,
                talkDescription: formData.talkDescription,
                talkDuration: formData.talkDuration || undefined,
                talkRelevance: formData.talkRelevance,
                nominatorName: formData.nominatorName,
                nominatorEmail: formData.nominatorEmail,
                nominatorPhone: formData.nominatorPhone || undefined,
                nominatorRelation: formData.nominatorRelation,
                previousTalks: formData.previousTalks || undefined,
                additionalInfo: formData.additionalInfo || undefined
            });

            alert('Thank you for the speaker nomination! Our team will review the submission and contact you soon.');

            // Reset form
            setFormData({
                speakerName: '',
                speakerEmail: '',
                speakerPhone: '',
                speakerWebsite: '',
                speakerBio: '',
                speakerAchievements: '',
                talkTitle: '',
                talkDescription: '',
                talkDuration: '',
                talkRelevance: '',
                nominatorName: '',
                nominatorEmail: '',
                nominatorPhone: '',
                nominatorRelation: '',
                previousTalks: '',
                additionalInfo: ''
            });
        } catch (error) {
            console.error('Error submitting speaker nomination:', error);
            alert('Failed to submit nomination. Please try again.');
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
                            Nominate a <span className='text-[var(--color-tedx-red)]'>Speaker</span>
                        </h1>
                        <p className='text-xl text-gray-300 max-w-3xl mx-auto mb-8'>
                            Do you know someone with ideas worth spreading? Help us find exceptional speakers who can
                            inspire our audience and contribute to our theme: "Turning Lessons into Legacies."
                        </p>
                    </motion.div>

                    {/* Nomination Criteria */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className='mb-16'
                    >
                        <h2 className='text-2xl font-bold text-white text-center mb-8'>What We Look For</h2>
                        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
                            {nominationCriteria.map((criteria, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                                    className='bg-gray-900 p-6 rounded-xl'
                                >
                                    <div className='w-12 h-12 bg-[var(--color-tedx-red)]/20 rounded-full flex items-center justify-center mb-4'>
                                        <CheckCircle className='w-6 h-6 text-[var(--color-tedx-red)]' />
                                    </div>
                                    <h3 className='text-lg font-bold text-white mb-2'>{criteria.title}</h3>
                                    <p className='text-gray-300 text-sm'>{criteria.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Nomination Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className='max-w-4xl mx-auto'
                    >
                        <div className='bg-gray-900 p-8 rounded-2xl'>
                            <h2 className='text-3xl font-bold text-white mb-8 text-center'>Speaker Nomination Form</h2>

                            <form
                                onSubmit={handleSubmit}
                                className='space-y-8'
                            >
                                {/* Speaker Information */}
                                <div>
                                    <h3 className='text-xl font-bold text-[var(--color-tedx-red)] mb-6'>
                                        Speaker Information
                                    </h3>

                                    <div className='grid md:grid-cols-2 gap-6'>
                                        <div>
                                            <label className='block text-white text-sm font-medium mb-2'>
                                                <User className='w-4 h-4 inline mr-2' />
                                                Speaker Full Name *
                                            </label>
                                            <input
                                                type='text'
                                                name='speakerName'
                                                required
                                                value={formData.speakerName}
                                                onChange={handleInputChange}
                                                className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[var(--color-tedx-red)] focus:outline-none'
                                                placeholder="Enter speaker's full name"
                                            />
                                        </div>

                                        <div>
                                            <label className='block text-white text-sm font-medium mb-2'>
                                                <Mail className='w-4 h-4 inline mr-2' />
                                                Speaker Email
                                            </label>
                                            <input
                                                type='email'
                                                name='speakerEmail'
                                                value={formData.speakerEmail}
                                                onChange={handleInputChange}
                                                className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[var(--color-tedx-red)] focus:outline-none'
                                                placeholder="Speaker's email address"
                                            />
                                        </div>
                                    </div>

                                    <div className='grid md:grid-cols-2 gap-6 mt-6'>
                                        <div>
                                            <label className='block text-white text-sm font-medium mb-2'>
                                                <Phone className='w-4 h-4 inline mr-2' />
                                                Speaker Phone
                                            </label>
                                            <input
                                                type='tel'
                                                name='speakerPhone'
                                                value={formData.speakerPhone}
                                                onChange={handleInputChange}
                                                className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[var(--color-tedx-red)] focus:outline-none'
                                                placeholder="Speaker's phone number"
                                            />
                                        </div>

                                        <div>
                                            <label className='block text-white text-sm font-medium mb-2'>
                                                <Globe className='w-4 h-4 inline mr-2' />
                                                Website/LinkedIn
                                            </label>
                                            <input
                                                type='url'
                                                name='speakerWebsite'
                                                value={formData.speakerWebsite}
                                                onChange={handleInputChange}
                                                className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[var(--color-tedx-red)] focus:outline-none'
                                                placeholder="Speaker's website or LinkedIn profile"
                                            />
                                        </div>
                                    </div>

                                    <div className='mt-6'>
                                        <label className='block text-white text-sm font-medium mb-2'>
                                            Speaker Biography *
                                        </label>
                                        <textarea
                                            name='speakerBio'
                                            required
                                            value={formData.speakerBio}
                                            onChange={handleInputChange}
                                            rows={4}
                                            className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[var(--color-tedx-red)] focus:outline-none'
                                            placeholder='Brief biography of the speaker including their background, expertise, and current role...'
                                        />
                                    </div>

                                    <div className='mt-6'>
                                        <label className='block text-white text-sm font-medium mb-2'>
                                            <Award className='w-4 h-4 inline mr-2' />
                                            Key Achievements *
                                        </label>
                                        <textarea
                                            name='speakerAchievements'
                                            required
                                            value={formData.speakerAchievements}
                                            onChange={handleInputChange}
                                            rows={3}
                                            className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[var(--color-tedx-red)] focus:outline-none'
                                            placeholder="List the speaker's notable achievements, awards, publications, or recognition..."
                                        />
                                    </div>
                                </div>

                                {/* Talk Information */}
                                <div>
                                    <h3 className='text-xl font-bold text-[var(--color-tedx-red)] mb-6'>
                                        Talk Information
                                    </h3>

                                    <div>
                                        <label className='block text-white text-sm font-medium mb-2'>
                                            <MessageSquare className='w-4 h-4 inline mr-2' />
                                            Proposed Talk Title *
                                        </label>
                                        <input
                                            type='text'
                                            name='talkTitle'
                                            required
                                            value={formData.talkTitle}
                                            onChange={handleInputChange}
                                            className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[var(--color-tedx-red)] focus:outline-none'
                                            placeholder='Title of the proposed talk'
                                        />
                                    </div>

                                    <div className='mt-6'>
                                        <label className='block text-white text-sm font-medium mb-2'>
                                            Talk Description *
                                        </label>
                                        <textarea
                                            name='talkDescription'
                                            required
                                            value={formData.talkDescription}
                                            onChange={handleInputChange}
                                            rows={5}
                                            className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[var(--color-tedx-red)] focus:outline-none'
                                            placeholder='Describe what the talk will be about, key points to be covered, and main takeaways for the audience...'
                                        />
                                    </div>

                                    <div className='grid md:grid-cols-2 gap-6 mt-6'>
                                        <div>
                                            <label className='block text-white text-sm font-medium mb-2'>
                                                Talk Duration
                                            </label>
                                            <select
                                                name='talkDuration'
                                                value={formData.talkDuration}
                                                onChange={handleInputChange}
                                                className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[var(--color-tedx-red)] focus:outline-none'
                                            >
                                                <option value=''>Select duration</option>
                                                <option value='10-12-minutes'>10-12 minutes</option>
                                                <option value='15-18-minutes'>15-18 minutes (Standard)</option>
                                                <option value='flexible'>Flexible</option>
                                            </select>
                                        </div>

                                        <div className='md:col-span-1'></div>
                                    </div>

                                    <div className='mt-6'>
                                        <label className='block text-white text-sm font-medium mb-2'>
                                            Relevance to Theme *
                                        </label>
                                        <textarea
                                            name='talkRelevance'
                                            required
                                            value={formData.talkRelevance}
                                            onChange={handleInputChange}
                                            rows={4}
                                            className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[var(--color-tedx-red)] focus:outline-none'
                                            placeholder='How does this talk relate to our theme "Turning Lessons into Legacies"? What lessons or legacies will be shared?'
                                        />
                                    </div>
                                </div>

                                {/* Nominator Information */}
                                <div>
                                    <h3 className='text-xl font-bold text-[var(--color-tedx-red)] mb-6'>
                                        Your Information
                                    </h3>

                                    <div className='grid md:grid-cols-2 gap-6'>
                                        <div>
                                            <label className='block text-white text-sm font-medium mb-2'>
                                                <User className='w-4 h-4 inline mr-2' />
                                                Your Name *
                                            </label>
                                            <input
                                                type='text'
                                                name='nominatorName'
                                                required
                                                value={formData.nominatorName}
                                                onChange={handleInputChange}
                                                className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[var(--color-tedx-red)] focus:outline-none'
                                                placeholder='Your full name'
                                            />
                                        </div>

                                        <div>
                                            <label className='block text-white text-sm font-medium mb-2'>
                                                <Mail className='w-4 h-4 inline mr-2' />
                                                Your Email *
                                            </label>
                                            <input
                                                type='email'
                                                name='nominatorEmail'
                                                required
                                                value={formData.nominatorEmail}
                                                onChange={handleInputChange}
                                                className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[var(--color-tedx-red)] focus:outline-none'
                                                placeholder='Your email address'
                                            />
                                        </div>
                                    </div>

                                    <div className='grid md:grid-cols-2 gap-6 mt-6'>
                                        <div>
                                            <label className='block text-white text-sm font-medium mb-2'>
                                                <Phone className='w-4 h-4 inline mr-2' />
                                                Your Phone
                                            </label>
                                            <input
                                                type='tel'
                                                name='nominatorPhone'
                                                value={formData.nominatorPhone}
                                                onChange={handleInputChange}
                                                className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[var(--color-tedx-red)] focus:outline-none'
                                                placeholder='Your phone number'
                                            />
                                        </div>

                                        <div>
                                            <label className='block text-white text-sm font-medium mb-2'>
                                                Relation to Speaker *
                                            </label>
                                            <select
                                                name='nominatorRelation'
                                                required
                                                value={formData.nominatorRelation}
                                                onChange={handleInputChange}
                                                className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[var(--color-tedx-red)] focus:outline-none'
                                            >
                                                <option value=''>Select relation</option>
                                                <option value='colleague'>Colleague</option>
                                                <option value='friend'>Friend</option>
                                                <option value='student'>Student/Mentee</option>
                                                <option value='fan'>Admirer/Fan</option>
                                                <option value='self'>Self-nomination</option>
                                                <option value='other'>Other</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Information */}
                                <div>
                                    <h3 className='text-xl font-bold text-[var(--color-tedx-red)] mb-6'>
                                        Additional Information
                                    </h3>

                                    <div className='mb-6'>
                                        <label className='block text-white text-sm font-medium mb-2'>
                                            Previous Speaking Experience
                                        </label>
                                        <textarea
                                            name='previousTalks'
                                            value={formData.previousTalks}
                                            onChange={handleInputChange}
                                            rows={3}
                                            className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[var(--color-tedx-red)] focus:outline-none'
                                            placeholder='List any previous speaking engagements, conferences, or public talks the speaker has given...'
                                        />
                                    </div>

                                    <div>
                                        <label className='block text-white text-sm font-medium mb-2'>
                                            Additional Comments
                                        </label>
                                        <textarea
                                            name='additionalInfo'
                                            value={formData.additionalInfo}
                                            onChange={handleInputChange}
                                            rows={4}
                                            className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[var(--color-tedx-red)] focus:outline-none'
                                            placeholder="Any additional information you'd like to share about the speaker or the proposed talk..."
                                        />
                                    </div>
                                </div>

                                <CTAButton
                                    type='submit'
                                    className='w-full text-lg py-4'
                                    isLoading={createSpeakerNominationMutation.isPending}
                                    disabled={createSpeakerNominationMutation.isPending}
                                >
                                    {createSpeakerNominationMutation.isPending
                                        ? 'Submitting Nomination...'
                                        : 'Submit Speaker Nomination'}
                                </CTAButton>

                                <p className='text-xs text-gray-400 text-center'>
                                    Our speaker selection committee will review all nominations carefully. We'll contact
                                    you within 2-3 weeks with an update.
                                </p>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
};
