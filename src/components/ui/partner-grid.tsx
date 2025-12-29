import { PartnerTier } from '@/types/partner';
import { cn } from '@/lib/utils';

interface PartnerGridProps {
    partnerTier: PartnerTier;
    inView: boolean;
    index: number;
}

export const PartnerGrid = ({ partnerTier, inView, index }: PartnerGridProps) => {
    return (
        <div
            className={cn(
                'space-y-8 transition-all duration-1000 transform',
                inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            )}
            style={{ transitionDelay: `${index * 200}ms` }}
        >
            <h3 className='text-2xl font-bold text-white text-center'>{partnerTier.name}</h3>

            <div
                className={cn(
                    'grid gap-8 justify-items-center',
                    partnerTier.name === 'Title Partner'
                        ? 'grid-cols-1'
                        : partnerTier.name === 'Gold Partners'
                          ? 'grid-cols-1 md:grid-cols-3'
                          : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                )}
            >
                {partnerTier.partners.map((partner, partnerIndex) => (
                    <div
                        key={partner.id}
                        className={cn(
                            'group cursor-pointer transition-all duration-500 transform hover:scale-105',
                            inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                        )}
                        style={{ transitionDelay: `${index * 200 + partnerIndex * 100}ms` }}
                        onClick={() => partner.website && window.open(partner.website, '_blank')}
                    >
                        <div className='bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-600'>
                            <img
                                src={partner.logo}
                                alt={partner.name}
                                className='w-full h-auto max-h-16 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300'
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
