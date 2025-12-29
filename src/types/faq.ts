export interface FAQ {
    id: string;
    question: string;
    answer: string;
    category: 'general' | 'tickets' | 'event' | 'speakers' | 'volunteers';
}
