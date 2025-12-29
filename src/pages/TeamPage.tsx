import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { teamMembers } from '@/data/team';
import { TeamMember } from '@/types/team';
import { Linkedin, ArrowUpRight, Users, Target, Code, Palette, Handshake, Megaphone } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const departmentIcons = {
    curation: Target,
    operations: Users,
    tech: Code,
    design: Palette,
    partnerships: Handshake,
    marketing: Megaphone
};

const departmentColors = {
    curation: 'from-red-500/20 to-red-600/20',
    operations: 'from-blue-500/20 to-blue-600/20',
    tech: 'from-green-500/20 to-green-600/20',
    design: 'from-purple-500/20 to-purple-600/20',
    partnerships: 'from-orange-500/20 to-orange-600/20',
    marketing: 'from-pink-500/20 to-pink-600/20'
};

export const TeamPage = () => {
    const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
    const pageRef = useRef<HTMLDivElement>(null);
    const { hasBeenInView } = useInView(pageRef, { threshold: 0.1 });

    const departments = [
        { id: 'all', name: 'All Team', count: teamMembers.length },
        { id: 'curation', name: 'Curation', count: teamMembers.filter(m => m.department === 'curation').length },
        { id: 'operations', name: 'Operations', count: teamMembers.filter(m => m.department === 'operations').length },
        { id: 'tech', name: 'Technology', count: teamMembers.filter(m => m.department === 'tech').length },
        { id: 'design', name: 'Design', count: teamMembers.filter(m => m.department === 'design').length },
        {
            id: 'partnerships',
            name: 'Partnerships',
            count: teamMembers.filter(m => m.department === 'partnerships').length
        },
        { id: 'marketing', name: 'Marketing', count: teamMembers.filter(m => m.department === 'marketing').length }
    ];

    const filteredMembers =
        selectedDepartment === 'all'
            ? teamMembers
            : teamMembers.filter(member => member.department === selectedDepartment);

    return (
        <div
            ref={pageRef}
            className='min-h-screen bg-black text-white'
        >
            {/* Hero Section */}
            <section className='relative overflow-hidden pt-24 pb-16'>
                <div className='absolute inset-0 bg-gradient-to-b from-red-950/10 via-black/50 to-black'></div>
                <div
                    className='absolute inset-0 opacity-10'
                    style={{
                        backgroundImage: `radial-gradient(circle at 25% 25%, red 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }}
                ></div>

                <div className='container mx-auto px-6 relative z-10'>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className='text-center'
                    >
                        <div className='inline-flex items-center gap-2 bg-red-600/10 border border-red-600/20 rounded-full px-4 py-2 mb-6'>
                            <Users className='w-5 h-5 text-red-500' />
                            <span className='text-red-300 text-sm font-medium'>Meet Our Team</span>
                        </div>

                        <h1 className='text-5xl md:text-7xl font-bold mb-6'>
                            The <span className='text-red-500'>Visionaries</span>
                            <br />
                            Behind <span className='text-white'>TEDx</span>
                        </h1>

                        <p className='text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed'>
                            Meet the passionate individuals who make TEDxNITSilchar possible. Our diverse team of
                            students brings together creativity, innovation, and dedication to spread ideas worth
                            sharing.
                        </p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className='mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto'
                        >
                            {[
                                { label: 'Team Members', value: teamMembers.length },
                                { label: 'Departments', value: 6 },
                                { label: 'Years Experience', value: '3+' },
                                { label: 'Events Organized', value: '10+' }
                            ].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={hasBeenInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: 0.4 + index * 0.1,
                                        ease: 'easeOut'
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    className='text-center p-4 bg-white/5 rounded-lg border border-white/10'
                                >
                                    <div className='text-2xl font-bold text-red-500'>{stat.value}</div>
                                    <div className='text-sm text-gray-400 mt-1'>{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Department Filter */}
            <section className='py-12'>
                <div className='container mx-auto px-6'>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={hasBeenInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className='flex flex-wrap justify-center gap-3 mb-12'
                    >
                        {departments.map((dept, index) => (
                            <motion.button
                                key={dept.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={hasBeenInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                                transition={{
                                    duration: 0.4,
                                    delay: 0.3 + index * 0.05,
                                    ease: 'easeOut'
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedDepartment(dept.id)}
                                className={`px-6 py-3 rounded-full transition-all duration-300 border ${
                                    selectedDepartment === dept.id
                                        ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/25'
                                        : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
                                }`}
                            >
                                <span className='font-medium'>{dept.name}</span>
                                <span className='ml-2 text-sm opacity-75'>({dept.count})</span>
                            </motion.button>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Team Grid */}
            <section className='pb-20'>
                <div className='container mx-auto px-6'>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={hasBeenInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
                    >
                        {filteredMembers.map((member, index) => (
                            <TeamMemberCard
                                key={member.id}
                                member={member}
                                index={index}
                                isVisible={hasBeenInView}
                            />
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

interface TeamMemberCardProps {
    member: TeamMember;
    index: number;
    isVisible: boolean;
}

const TeamMemberCard = ({ member, index, isVisible }: TeamMemberCardProps) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const IconComponent = departmentIcons[member.department];
    const gradientColor = departmentColors[member.department];

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
            transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: 'easeOut'
            }}
            whileHover={{ scale: 1.05 }}
            className='group relative'
        >
            {/* Card Background with Gradient */}
            <div
                className={`absolute inset-0 bg-gradient-to-br ${gradientColor} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            ></div>

            {/* Main Card */}
            <div className='relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20'>
                {/* Department Icon */}
                <div className='absolute top-4 right-4 opacity-20 group-hover:opacity-60 transition-opacity duration-300'>
                    <IconComponent className='w-6 h-6' />
                </div>

                {/* Member Image */}
                <div className='relative mb-4'>
                    <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full ring-2 ring-white/20 group-hover:ring-red-500/50 transition-all duration-300'>
                        {!imageLoaded && (
                            <div className='absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-800 animate-pulse'></div>
                        )}
                        <img
                            src={member.image}
                            alt={member.name}
                            className={`w-full h-full object-cover transition-all duration-500 ${
                                imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                            }`}
                            onLoad={() => setImageLoaded(true)}
                        />
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                </div>

                {/* Member Info */}
                <div className='text-center space-y-2 mb-4'>
                    <h3 className='font-bold text-lg text-white group-hover:text-red-100 transition-colors duration-300'>
                        {member.name}
                    </h3>
                    <p className='text-red-400 font-medium text-sm uppercase tracking-wider'>{member.role}</p>
                    {member.bio && (
                        <p className='text-gray-400 text-sm leading-relaxed line-clamp-2 group-hover:text-gray-300 transition-colors duration-300'>
                            {member.bio}
                        </p>
                    )}
                </div>

                {/* LinkedIn Link */}
                {member.linkedinUrl && (
                    <div className='flex justify-center'>
                        <a
                            href={member.linkedinUrl}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-red-600 border border-white/20 hover:border-red-600 rounded-lg text-sm transition-all duration-300 group/link'
                        >
                            <Linkedin className='w-4 h-4' />
                            <span>Connect</span>
                            <ArrowUpRight className='w-3 h-3 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5' />
                        </a>
                    </div>
                )}

                {/* Animated Border Effect */}
                <div className='absolute inset-0 rounded-2xl border border-red-500/0 group-hover:border-red-500/30 transition-all duration-500'></div>
            </div>
        </motion.div>
    );
};
