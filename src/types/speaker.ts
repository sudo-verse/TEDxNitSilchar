export interface Speaker {
    id: string;
    name: string;
    title: string;
    company?: string;
    bio: string;
    talkTitle: string;
    talkDescription: string;
    image: string;
    socialLinks: {
        linkedin?: string;
        twitter?: string;
        website?: string;
    };
}
