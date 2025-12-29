import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Linkedin, Twitter, ExternalLink, X } from 'lucide-react';
import { Speaker } from '@/types/speaker';

interface SpeakerModalProps {
    speaker: Speaker | null;
    isOpen: boolean;
    onClose: () => void;
}

export const SpeakerModal = ({ speaker, isOpen, onClose }: SpeakerModalProps) => {
    if (!speaker) return null;

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogContent className='max-w-4xl max-h-[90vh] overflow-y-auto p-0'>
                <button
                    onClick={onClose}
                    className='absolute right-4 top-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors'
                >
                    <X className='w-5 h-5' />
                </button>

                <div className='grid md:grid-cols-2 gap-0'>
                    {/* Image */}
                    <div className='aspect-square md:aspect-auto relative'>
                        <img
                            src={speaker.image}
                            alt={speaker.name}
                            className='w-full h-full object-cover'
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent' />
                    </div>

                    {/* Content */}
                    <div className='p-8 space-y-6'>
                        <DialogHeader className='space-y-4'>
                            <div className='space-y-2'>
                                <DialogTitle className='text-3xl font-bold text-gray-900'>{speaker.name}</DialogTitle>

                                <p className='text-xl text-(--color-tedx-red) font-semibold'>{speaker.title}</p>

                                {speaker.company && <p className='text-gray-600'>{speaker.company}</p>}
                            </div>

                            {/* Social Links */}
                            <div className='flex gap-3'>
                                {speaker.socialLinks.linkedin && (
                                    <Button
                                        variant='outline'
                                        size='sm'
                                        onClick={() => window.open(speaker.socialLinks.linkedin, '_blank')}
                                    >
                                        <Linkedin className='w-4 h-4 mr-2' />
                                        LinkedIn
                                    </Button>
                                )}

                                {speaker.socialLinks.twitter && (
                                    <Button
                                        variant='outline'
                                        size='sm'
                                        onClick={() => window.open(speaker.socialLinks.twitter, '_blank')}
                                    >
                                        <Twitter className='w-4 h-4 mr-2' />
                                        Twitter
                                    </Button>
                                )}

                                {speaker.socialLinks.website && (
                                    <Button
                                        variant='outline'
                                        size='sm'
                                        onClick={() => window.open(speaker.socialLinks.website, '_blank')}
                                    >
                                        <ExternalLink className='w-4 h-4 mr-2' />
                                        Website
                                    </Button>
                                )}
                            </div>
                        </DialogHeader>

                        {/* Talk Details */}
                        <div className='space-y-4'>
                            <div>
                                <h3 className='text-xl font-bold text-gray-900 mb-2'>Talk Title</h3>
                                <p className='text-lg text-(--color-tedx-red) font-medium'>
                                    "{speaker.talkTitle}"
                                </p>
                            </div>

                            <div>
                                <h3 className='text-xl font-bold text-gray-900 mb-2'>About the Talk</h3>
                                <p className='text-gray-700 leading-relaxed'>{speaker.talkDescription}</p>
                            </div>

                            <div>
                                <h3 className='text-xl font-bold text-gray-900 mb-2'>
                                    About {speaker.name.split(' ')[0]}
                                </h3>
                                <p className='text-gray-700 leading-relaxed'>{speaker.bio}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
