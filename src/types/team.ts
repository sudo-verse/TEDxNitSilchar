export interface TeamMember {
    id: string;
    name: string;
    role: string;
    department: 'curation' | 'operations' | 'design' | 'tech' | 'partnerships' | 'marketing';
    image: string;
    bio?: string;
    linkedinUrl?: string;
}
