import { Clock, User, Coffee, Users } from 'lucide-react';
import { ScheduleSession } from '@/types/schedule';
import { cn } from '@/lib/utils';

interface ScheduleTimelineProps {
    sessions: ScheduleSession[];
    categoryName: string;
    inView: boolean;
}

const getSessionIcon = (type: ScheduleSession['type']) => {
    switch (type) {
        case 'talk':
            return User;
        case 'break':
            return Coffee;
        case 'networking':
            return Users;
        case 'performance':
            return Users;
        default:
            return Clock;
    }
};

const getSessionColor = (type: ScheduleSession['type']) => {
    switch (type) {
        case 'talk':
            return 'bg-[var(--color-tedx-red)] text-white';
        case 'break':
            return 'bg-blue-500 text-white';
        case 'networking':
            return 'bg-green-500 text-white';
        case 'performance':
            return 'bg-purple-500 text-white';
        default:
            return 'bg-gray-500 text-white';
    }
};

export const ScheduleTimeline = ({ sessions, categoryName, inView }: ScheduleTimelineProps) => {
    return (
        <div className='space-y-6'>
            <h3 className='text-2xl font-bold text-white flex items-center gap-3'>
                <div className='w-3 h-8 bg-[var(--color-tedx-red)] rounded' />
                {categoryName}
            </h3>

            <div className='space-y-4'>
                {sessions.map((session, index) => {
                    const Icon = getSessionIcon(session.type);
                    const colorClass = getSessionColor(session.type);

                    return (
                        <div
                            key={session.id}
                            className={cn(
                                'flex gap-4 p-4 bg-gray-800 rounded-lg border border-gray-600 hover:shadow-md transition-all duration-500 transform',
                                inView
                                    ? 'translate-x-0 opacity-100'
                                    : 'translate-x-4 opacity-80 md:translate-x-8 md:opacity-0'
                            )}
                            style={{ transitionDelay: inView ? `${index * 100}ms` : '0ms' }}
                        >
                            {/* Time & Icon */}
                            <div className='flex-shrink-0 text-center'>
                                <div className='text-lg font-bold text-white mb-1'>{session.time}</div>
                                <div
                                    className={cn(
                                        'w-10 h-10 rounded-full flex items-center justify-center',
                                        colorClass
                                    )}
                                >
                                    <Icon className='w-5 h-5' />
                                </div>
                                <div className='text-sm text-gray-400 mt-1'>{session.duration}m</div>
                            </div>

                            {/* Content */}
                            <div className='flex-1 space-y-2'>
                                <div className='flex items-start justify-between'>
                                    <h4 className='text-lg font-semibold text-white'>{session.title}</h4>
                                    <span
                                        className={cn(
                                            'px-2 py-1 text-xs font-medium rounded-full',
                                            session.type === 'talk'
                                                ? 'bg-[var(--color-tedx-red)]/10 text-[var(--color-tedx-red)]'
                                                : session.type === 'break'
                                                  ? 'bg-blue-100 text-blue-800'
                                                  : session.type === 'networking'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-purple-100 text-purple-800'
                                        )}
                                    >
                                        {session.type}
                                    </span>
                                </div>

                                {session.speaker && (
                                    <p className='text-[var(--color-tedx-red)] font-medium'>{session.speaker}</p>
                                )}

                                <p className='text-gray-300'>{session.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
