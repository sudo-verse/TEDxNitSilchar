export interface Partner {
    id: string;
    name: string;
    logo: string;
    website?: string;
    tier: 'title' | 'gold' | 'associate' | 'community';
    description?: string;
}

export interface PartnerTier {
    name: string;
    partners: Partner[];
}

export interface PartnershipInquiry {
    id: string;
    companyName: string;
    contactName: string;
    email: string;
    phone?: string;
    website?: string;
    industry?: string;
    companySize?: string;
    selectedTier?: string;
    interests?: string;
    budget?: string;
    timeline?: string;
    message?: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreatePartnershipInquiryInput {
    companyName: string;
    contactName: string;
    email: string;
    phone?: string;
    website?: string;
    industry?: string;
    companySize?: string;
    selectedTier?: string;
    interests?: string;
    budget?: string;
    timeline?: string;
    message?: string;
}
