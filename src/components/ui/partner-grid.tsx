import { motion } from 'framer-motion';
import { PartnerTier } from '@/types/partner';
import { cn } from '@/lib/utils';

interface PartnerGridProps {
    partnerTier: PartnerTier;
    inView: boolean;
    index: number;
}

export const PartnerGrid = ({ partnerTier, inView, index }: PartnerGridProps) => {
    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: index * 0.2,
                ease: [0.23, 1, 0.32, 1]
            }
        }
    };

    const gridVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: index * 0.2 + 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.23, 1, 0.32, 1]
            }
        }
    };

    return (
        <motion.div
            className='space-y-8'
            variants={containerVariants}
            initial='hidden'
            animate={inView ? 'visible' : 'hidden'}
        >
            <motion.h3
                className='text-2xl font-bold text-white text-center'
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.1 }}
            >
                {partnerTier.name}
            </motion.h3>

            <motion.div
                className={cn(
                    'grid gap-8 justify-items-center',
                    partnerTier.name === 'Title Partner'
                        ? 'grid-cols-1'
                        : partnerTier.name === 'Gold Partners'
                          ? 'grid-cols-1 md:grid-cols-3'
                          : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                )}
                variants={gridVariants}
                initial='hidden'
                animate={inView ? 'visible' : 'hidden'}
            >
                {partnerTier.partners.map((partner) => (
                    <motion.div
                        key={partner.id}
                        className='group cursor-pointer w-full h-full'
                        variants={itemVariants}
                        whileHover={{ scale: 1.08, y: -4 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        onClick={() => partner.website && window.open(partner.website, '_blank')}
                    >
                        <div className='bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-2xl transition-shadow border border-gray-600 h-full'>
                            <img
                                src={partner.logo}
                                alt={partner.name}
                                className='w-full h-auto max-h-16 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300'
                            />
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};
