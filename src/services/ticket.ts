import { useMutation, useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Ticket, CreateTicketInput, UpdateTicketInput } from '@/types/ticket';

export const createTicket = async (data: CreateTicketInput): Promise<Ticket> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
        // Mock response
        await new Promise(resolve => setTimeout(resolve, 1000));
        return {
            id: Math.random().toString(36).substr(2, 9),
            ...data,
            status: 'pending',
            purchasedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
    }

    // Use Supabase directly
    const { data: result, error } = await supabase
        .from('tickets')
        .insert([
            {
                ticket_type: data.ticketType,
                name: data.name,
                email: data.email,
                phone: data.phone,
                organization: data.organization,
                dietary: data.dietary,
                price: data.price,
                processing_fee: data.processingFee,
                total_amount: data.totalAmount,
                status: 'pending'
            }
        ])
        .select()
        .single();

    if (error) {
        throw new Error(`Error creating ticket: ${error.message}`);
    }

    // Transform database result to match frontend types
    return {
        id: result.id,
        ticketType: result.ticket_type,
        name: result.name,
        email: result.email,
        phone: result.phone,
        organization: result.organization,
        dietary: result.dietary,
        price: result.price,
        processingFee: result.processing_fee,
        totalAmount: result.total_amount,
        status: result.status,
        purchasedAt: result.purchased_at,
        updatedAt: result.updated_at
    };
};

export const getTickets = async (): Promise<Ticket[]> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
        // Return empty array for mock data
        return [];
    }

    const { data, error } = await supabase.from('tickets').select('*').order('purchased_at', { ascending: false });

    if (error) {
        throw new Error(`Error fetching tickets: ${error.message}`);
    }

    // Transform database results to match frontend types
    return data.map(item => ({
        id: item.id,
        ticketType: item.ticket_type,
        name: item.name,
        email: item.email,
        phone: item.phone,
        organization: item.organization,
        dietary: item.dietary,
        price: item.price,
        processingFee: item.processing_fee,
        totalAmount: item.total_amount,
        status: item.status,
        purchasedAt: item.purchased_at,
        updatedAt: item.updated_at
    }));
};

export const getTicketById = async (id: string): Promise<Ticket> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
        throw new Error('Mock data not available for this operation');
    }

    const { data, error } = await supabase.from('tickets').select('*').eq('id', id).single();

    if (error) {
        throw new Error(`Error fetching ticket: ${error.message}`);
    }

    // Transform database result to match frontend types
    return {
        id: data.id,
        ticketType: data.ticket_type,
        name: data.name,
        email: data.email,
        phone: data.phone,
        organization: data.organization,
        dietary: data.dietary,
        price: data.price,
        processingFee: data.processing_fee,
        totalAmount: data.total_amount,
        status: data.status,
        purchasedAt: data.purchased_at,
        updatedAt: data.updated_at
    };
};

export const updateTicket = async (id: string, data: UpdateTicketInput): Promise<Ticket> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
        throw new Error('Mock data not available for this operation');
    }

    // Prepare update data with snake_case field names
    const updateData: any = {
        updated_at: new Date().toISOString()
    };

    if (data.ticketType !== undefined) updateData.ticket_type = data.ticketType;
    if (data.name !== undefined) updateData.name = data.name;
    if (data.email !== undefined) updateData.email = data.email;
    if (data.phone !== undefined) updateData.phone = data.phone;
    if (data.organization !== undefined) updateData.organization = data.organization;
    if (data.dietary !== undefined) updateData.dietary = data.dietary;
    if (data.price !== undefined) updateData.price = data.price;
    if (data.processingFee !== undefined) updateData.processing_fee = data.processingFee;
    if (data.totalAmount !== undefined) updateData.total_amount = data.totalAmount;
    if (data.status !== undefined) updateData.status = data.status;

    const { data: result, error } = await supabase.from('tickets').update(updateData).eq('id', id).select().single();

    if (error) {
        throw new Error(`Error updating ticket: ${error.message}`);
    }

    // Transform database result to match frontend types
    return {
        id: result.id,
        ticketType: result.ticket_type,
        name: result.name,
        email: result.email,
        phone: result.phone,
        organization: result.organization,
        dietary: result.dietary,
        price: result.price,
        processingFee: result.processing_fee,
        totalAmount: result.total_amount,
        status: result.status,
        purchasedAt: result.purchased_at,
        updatedAt: result.updated_at
    };
};

// React Query hooks
export const useCreateTicket = () => {
    return useMutation({
        mutationFn: createTicket
    });
};

export const useGetTickets = () => {
    return useQuery({
        queryKey: ['tickets'],
        queryFn: getTickets
    });
};

export const useGetTicketById = (id: string) => {
    return useQuery({
        queryKey: ['ticket', id],
        queryFn: () => getTicketById(id),
        enabled: !!id
    });
};

export const useUpdateTicket = () => {
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateTicketInput }) => updateTicket(id, data)
    });
};
