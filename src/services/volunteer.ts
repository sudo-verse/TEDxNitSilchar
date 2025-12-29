import { useMutation, useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { VolunteerApplication, CreateVolunteerApplicationInput } from '@/types/volunteer';

export const createVolunteerApplication = async (
    data: CreateVolunteerApplicationInput
): Promise<VolunteerApplication> => {
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
        .from('volunteer_applications')
        .insert([
            {
                name: data.name,
                email: data.email,
                phone: data.phone,
                university: data.university,
                year: data.year,
                selected_roles: data.selectedRoles,
                experience: data.experience,
                motivation: data.motivation,
                availability: data.availability,
                status: 'pending'
            }
        ])
        .select()
        .single();

    if (error) {
        throw new Error(`Error creating volunteer application: ${error.message}`);
    }

    // Transform database result to match frontend types
    return {
        id: result.id,
        name: result.name,
        email: result.email,
        phone: result.phone,
        university: result.university,
        year: result.year,
        selectedRoles: result.selected_roles,
        experience: result.experience,
        motivation: result.motivation,
        availability: result.availability,
        status: result.status,
        createdAt: result.created_at,
        updatedAt: result.updated_at
    };
};

export const getVolunteerApplications = async (): Promise<VolunteerApplication[]> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
        // Return empty array for mock data
        return [];
    }

    const { data, error } = await supabase
        .from('volunteer_applications')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        throw new Error(`Error fetching volunteer applications: ${error.message}`);
    }

    // Transform database results to match frontend types
    return data.map(item => ({
        id: item.id,
        name: item.name,
        email: item.email,
        phone: item.phone,
        university: item.university,
        year: item.year,
        selectedRoles: item.selected_roles,
        experience: item.experience,
        motivation: item.motivation,
        availability: item.availability,
        status: item.status,
        createdAt: item.created_at,
        updatedAt: item.updated_at
    }));
};

export const getVolunteerApplicationById = async (id: string): Promise<VolunteerApplication> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
        throw new Error('Mock data not available for this operation');
    }

    const { data, error } = await supabase.from('volunteer_applications').select('*').eq('id', id).single();

    if (error) {
        throw new Error(`Error fetching volunteer application: ${error.message}`);
    }

    // Transform database result to match frontend types
    return {
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        university: data.university,
        year: data.year,
        selectedRoles: data.selected_roles,
        experience: data.experience,
        motivation: data.motivation,
        availability: data.availability,
        status: data.status,
        createdAt: data.created_at,
        updatedAt: data.updated_at
    };
};

export const updateVolunteerApplicationStatus = async (id: string, status: string): Promise<VolunteerApplication> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
        throw new Error('Mock data not available for this operation');
    }

    const { data, error } = await supabase
        .from('volunteer_applications')
        .update({
            status,
            updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        throw new Error(`Error updating volunteer application: ${error.message}`);
    }

    // Transform database result to match frontend types
    return {
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        university: data.university,
        year: data.year,
        selectedRoles: data.selected_roles,
        experience: data.experience,
        motivation: data.motivation,
        availability: data.availability,
        status: data.status,
        createdAt: data.created_at,
        updatedAt: data.updated_at
    };
};

// React Query hooks
export const useCreateVolunteerApplication = () => {
    return useMutation({
        mutationFn: createVolunteerApplication
    });
};

export const useGetVolunteerApplications = () => {
    return useQuery({
        queryKey: ['volunteer-applications'],
        queryFn: getVolunteerApplications
    });
};

export const useGetVolunteerApplicationById = (id: string) => {
    return useQuery({
        queryKey: ['volunteer-application', id],
        queryFn: () => getVolunteerApplicationById(id),
        enabled: !!id
    });
};

export const useUpdateVolunteerApplicationStatus = () => {
    return useMutation({
        mutationFn: ({ id, status }: { id: string; status: string }) => updateVolunteerApplicationStatus(id, status)
    });
};
