export interface ScheduleSession {
    id: string;
    title: string;
    time: string;
    duration: number; // in minutes
    type: 'talk' | 'performance' | 'break' | 'networking';
    speaker?: string;
    description: string;
    category: 'morning' | 'afternoon' | 'evening';
}

export interface ScheduleCategory {
    name: string;
    sessions: ScheduleSession[];
}
