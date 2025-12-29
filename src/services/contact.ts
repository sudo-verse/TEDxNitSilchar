import { useMutation, useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { ContactMessage, CreateContactMessageInput, UpdateContactMessageInput } from '@/types/contact';

export const createContactMessage = async (data: CreateContactMessageInput): Promise<ContactMessage> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
        // Mock response
        await new Promise(resolve => setTimeout(resolve, 1000));
        return {
            id: Math.random().toString(36).substr(2, 9),
            ...data,
            status: 'new',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
    }

    // Use Supabase directly
    const { data: result, error } = await supabase
        .from('contact_messages')
        .insert([
            {
                name: data.name,
                email: data.email,
                phone: data.phone || null,
                subject: data.subject,
                category: data.category || null,
                message: data.message,
                status: 'new'
            }
        ])
        .select()
        .single();

    if (error) {
        throw new Error(`Error creating contact message: ${error.message}`);
    }

    // Transform database result to match frontend types
    return {
        id: result.id,
        name: result.name,
        email: result.email,
        phone: result.phone,
        subject: result.subject,
        category: result.category,
        message: result.message,
        status: result.status,
        createdAt: result.created_at,
        updatedAt: result.updated_at
    };
};

export const getContactMessages = async (): Promise<ContactMessage[]> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
        // Return empty array for mock data
        return [];
    }

    const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        throw new Error(`Error fetching contact messages: ${error.message}`);
    }

    // Transform database results to match frontend types
    return data.map(item => ({
        id: item.id,
        name: item.name,
        email: item.email,
        phone: item.phone,
        subject: item.subject,
        category: item.category,
        message: item.message,
        status: item.status,
        createdAt: item.created_at,
        updatedAt: item.updated_at
    }));
};

export const getContactMessageById = async (id: string): Promise<ContactMessage> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
        throw new Error('Mock data not available for this operation');
    }

    const { data, error } = await supabase.from('contact_messages').select('*').eq('id', id).single();

    if (error) {
        throw new Error(`Error fetching contact message: ${error.message}`);
    }

    // Transform database result to match frontend types
    return {
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        category: data.category,
        message: data.message,
        status: data.status,
        createdAt: data.created_at,
        updatedAt: data.updated_at
    };
};

export const updateContactMessage = async (id: string, updates: UpdateContactMessageInput): Promise<ContactMessage> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
        throw new Error('Mock data not available for this operation');
    }

    const { data, error } = await supabase
        .from('contact_messages')
        .update({
            ...updates,
            updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        throw new Error(`Error updating contact message: ${error.message}`);
    }

    // Transform database result to match frontend types
    return {
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        category: data.category,
        message: data.message,
        status: data.status,
        createdAt: data.created_at,
        updatedAt: data.updated_at
    };
};

// React Query hooks
export const useCreateContactMessage = () => {
    return useMutation({
        mutationFn: createContactMessage
    });
};

export const useGetContactMessages = () => {
    return useQuery({
        queryKey: ['contact-messages'],
        queryFn: getContactMessages
    });
};

export const useGetContactMessageById = (id: string) => {
    return useQuery({
        queryKey: ['contact-message', id],
        queryFn: () => getContactMessageById(id),
        enabled: !!id
    });
};

export const useUpdateContactMessage = () => {
    return useMutation({
        mutationFn: ({ id, updates }: { id: string; updates: UpdateContactMessageInput }) =>
            updateContactMessage(id, updates)
    });
};
