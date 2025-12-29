import { useMutation, useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { PartnershipInquiry, CreatePartnershipInquiryInput } from '@/types/partner';

export const createPartnershipInquiry = async (data: CreatePartnershipInquiryInput): Promise<PartnershipInquiry> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
        // Mock response
        await new Promise(resolve => setTimeout(resolve, 1000));
        return {
            id: Math.random().toString(36).substr(2, 9),
            ...data,
            status: 'pending',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
    }

    // Use Supabase directly
    const { data: result, error } = await supabase
        .from('partnership_inquiries')
        .insert([
            {
                company_name: data.companyName,
                contact_name: data.contactName,
                email: data.email,
                phone: data.phone,
                website: data.website,
                industry: data.industry,
                company_size: data.companySize,
                selected_tier: data.selectedTier,
                interests: data.interests,
                budget: data.budget,
                timeline: data.timeline,
                message: data.message,
                status: 'pending'
            }
        ])
        .select()
        .single();

    if (error) {
        throw new Error(`Error creating partnership inquiry: ${error.message}`);
    }

    // Transform database result to match frontend types
    return {
        id: result.id,
        companyName: result.company_name,
        contactName: result.contact_name,
        email: result.email,
        phone: result.phone,
        website: result.website,
        industry: result.industry,
        companySize: result.company_size,
        selectedTier: result.selected_tier,
        interests: result.interests,
        budget: result.budget,
        timeline: result.timeline,
        message: result.message,
        status: result.status,
        createdAt: result.created_at,
        updatedAt: result.updated_at
    };
};

export const getPartnershipInquiries = async (): Promise<PartnershipInquiry[]> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
        // Return empty array for mock data
        return [];
    }

    const { data, error } = await supabase
        .from('partnership_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        throw new Error(`Error fetching partnership inquiries: ${error.message}`);
    }

    // Transform database results to match frontend types
    return data.map(item => ({
        id: item.id,
        companyName: item.company_name,
        contactName: item.contact_name,
        email: item.email,
        phone: item.phone,
        website: item.website,
        industry: item.industry,
        companySize: item.company_size,
        selectedTier: item.selected_tier,
        interests: item.interests,
        budget: item.budget,
        timeline: item.timeline,
        message: item.message,
        status: item.status,
        createdAt: item.created_at,
        updatedAt: item.updated_at
    }));
};

export const getPartnershipInquiryById = async (id: string): Promise<PartnershipInquiry> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
        throw new Error('Mock data not available for this operation');
    }

    const { data, error } = await supabase.from('partnership_inquiries').select('*').eq('id', id).single();

    if (error) {
        throw new Error(`Error fetching partnership inquiry: ${error.message}`);
    }

    // Transform database result to match frontend types
    return {
        id: data.id,
        companyName: data.company_name,
        contactName: data.contact_name,
        email: data.email,
        phone: data.phone,
        website: data.website,
        industry: data.industry,
        companySize: data.company_size,
        selectedTier: data.selected_tier,
        interests: data.interests,
        budget: data.budget,
        timeline: data.timeline,
        message: data.message,
        status: data.status,
        createdAt: data.created_at,
        updatedAt: data.updated_at
    };
};

export const updatePartnershipInquiryStatus = async (id: string, status: string): Promise<PartnershipInquiry> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
        throw new Error('Mock data not available for this operation');
    }

    const { data, error } = await supabase
        .from('partnership_inquiries')
        .update({
            status,
            updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        throw new Error(`Error updating partnership inquiry: ${error.message}`);
    }

    // Transform database result to match frontend types
    return {
        id: data.id,
        companyName: data.company_name,
        contactName: data.contact_name,
        email: data.email,
        phone: data.phone,
        website: data.website,
        industry: data.industry,
        companySize: data.company_size,
        selectedTier: data.selected_tier,
        interests: data.interests,
        budget: data.budget,
        timeline: data.timeline,
        message: data.message,
        status: data.status,
        createdAt: data.created_at,
        updatedAt: data.updated_at
    };
};

// React Query hooks
export const useCreatePartnershipInquiry = () => {
    return useMutation({
        mutationFn: createPartnershipInquiry
    });
};

export const useGetPartnershipInquiries = () => {
    return useQuery({
        queryKey: ['partnership-inquiries'],
        queryFn: getPartnershipInquiries
    });
};

export const useGetPartnershipInquiryById = (id: string) => {
    return useQuery({
        queryKey: ['partnership-inquiry', id],
        queryFn: () => getPartnershipInquiryById(id),
        enabled: !!id
    });
};

export const useUpdatePartnershipInquiryStatus = () => {
    return useMutation({
        mutationFn: ({ id, status }: { id: string; status: string }) => updatePartnershipInquiryStatus(id, status)
    });
};
