import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Linkedin, Twitter, ExternalLink } from 'lucide-react';
import { Speaker } from '@/types/speaker';
import { cn } from '@/lib/utils';

interface SpeakerCardProps {
    speaker: Speaker;
    index: number;
    inView: boolean;
    onClick: () => void;
}

export const SpeakerCard = ({ speaker, index, inView, onClick }: SpeakerCardProps) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <Card
            className={cn(
                'group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-700 transform bg-white',
                inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            )}
            style={{ transitionDelay: `${index * 100}ms` }}
            onClick={onClick}
        >
            <CardContent className='p-0'>
                {/* Image */}
                <div className='relative aspect-square overflow-hidden'>
                    <img
                        src={speaker.image}
                        alt={speaker.name}
                        className={cn(
                            'w-full h-full object-cover transition-all duration-500 group-hover:scale-110',
                            imageLoaded ? 'opacity-100' : 'opacity-0'
                        )}
                        onLoad={() => setImageLoaded(true)}
                    />

                    {!imageLoaded && <div className='absolute inset-0 bg-gray-200 animate-pulse' />}

                    {/* Overlay */}
                    <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

                    {/* Social Links - Visible on Hover */}
                    <div className='absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0'>
                        {speaker.socialLinks.linkedin && (
                            <button
                                onClick={e => {
                                    e.stopPropagation();
                                    window.open(speaker.socialLinks.linkedin, '_blank');
                                }}
                                className='p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors'
                            >
                                <Linkedin className='w-4 h-4 text-white' />
                            </button>
                        )}

                        {speaker.socialLinks.twitter && (
                            <button
                                onClick={e => {
                                    e.stopPropagation();
                                    window.open(speaker.socialLinks.twitter, '_blank');
                                }}
                                className='p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors'
                            >
                                <Twitter className='w-4 h-4 text-white' />
                            </button>
                        )}

                        {speaker.socialLinks.website && (
                            <button
                                onClick={e => {
                                    e.stopPropagation();
                                    window.open(speaker.socialLinks.website, '_blank');
                                }}
                                className='p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors'
                            >
                                <ExternalLink className='w-4 h-4 text-white' />
                            </button>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className='p-6 space-y-3'>
                    <div className='space-y-1'>
                        <h3 className='text-xl font-bold text-gray-900 group-hover:text-[var(--color-tedx-red)] transition-colors'>
                            {speaker.name}
                        </h3>

                        <p className='text-[var(--color-tedx-red)] font-medium'>{speaker.title}</p>

                        {speaker.company && <p className='text-gray-600 text-sm'>{speaker.company}</p>}
                    </div>

                    <p className='text-gray-700 text-sm leading-relaxed line-clamp-3'>"{speaker.talkTitle}"</p>

                    <div className='pt-2'>
                        <button className='text-sm text-[var(--color-tedx-red)] hover:underline font-medium'>
                            View Details →
                        </button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
