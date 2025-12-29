export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    category?: string;
    message: string;
    status: 'new' | 'read' | 'responded' | 'closed';
    createdAt: string;
    updatedAt: string;
}

export interface CreateContactMessageInput {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    category?: string;
    message: string;
}

export interface UpdateContactMessageInput {
    status?: 'new' | 'read' | 'responded' | 'closed';
}
