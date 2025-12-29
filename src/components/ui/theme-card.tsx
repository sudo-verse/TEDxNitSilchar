import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ThemeCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    index: number;
    inView: boolean;
}

export const ThemeCard = ({ title, description, icon: Icon, index, inView }: ThemeCardProps) => {
    return (
        <Card
            className={cn(
                'group hover:shadow-xl transition-all duration-500 transform border-0 bg-gray-800 will-change-transform',
                inView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            )}
            style={{
                transitionDelay: `${index * 100}ms`,
                backfaceVisibility: 'hidden',
                perspective: '1000px'
            }}
        >
            <CardContent className='p-6 md:p-8 text-center space-y-4'>
                <div className='w-14 h-14 md:w-16 md:h-16 mx-auto bg-gradient-to-br from-(--color-tedx-red)/10 to-(--color-tedx-red)/20 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200'>
                    <Icon className='w-7 h-7 md:w-8 md:h-8 text-(--color-tedx-red)' />
                </div>

                <h3 className='text-lg md:text-xl font-bold text-white group-hover:text-(--color-tedx-red) transition-colors duration-200'>
                    {title}
                </h3>

                <p className='text-gray-300 leading-relaxed text-sm md:text-base'>{description}</p>
            </CardContent>
        </Card>
    );
};
