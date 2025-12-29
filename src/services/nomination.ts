import { useMutation, useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { SpeakerNomination, CreateSpeakerNominationInput } from '@/types/nomination';

export const createSpeakerNomination = async (data: CreateSpeakerNominationInput): Promise<SpeakerNomination> => {
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
        .from('speaker_nominations')
        .insert([
            {
                speaker_name: data.speakerName,
                speaker_email: data.speakerEmail,
                speaker_phone: data.speakerPhone,
                speaker_website: data.speakerWebsite,
                speaker_bio: data.speakerBio,
                speaker_achievements: data.speakerAchievements,
                talk_title: data.talkTitle,
                talk_description: data.talkDescription,
                talk_duration: data.talkDuration,
                talk_relevance: data.talkRelevance,
                nominator_name: data.nominatorName,
                nominator_email: data.nominatorEmail,
                nominator_phone: data.nominatorPhone,
                nominator_relation: data.nominatorRelation,
                previous_talks: data.previousTalks,
                additional_info: data.additionalInfo,
                status: 'pending'
            }
        ])
        .select()
        .single();

    if (error) {
        throw new Error(`Error creating speaker nomination: ${error.message}`);
    }

    // Transform database result to match frontend types
    return {
        id: result.id,
        speakerName: result.speaker_name,
        speakerEmail: result.speaker_email,
        speakerPhone: result.speaker_phone,
        speakerWebsite: result.speaker_website,
        speakerBio: result.speaker_bio,
        speakerAchievements: result.speaker_achievements,
        talkTitle: result.talk_title,
        talkDescription: result.talk_description,
        talkDuration: result.talk_duration,
        talkRelevance: result.talk_relevance,
        nominatorName: result.nominator_name,
        nominatorEmail: result.nominator_email,
        nominatorPhone: result.nominator_phone,
        nominatorRelation: result.nominator_relation,
        previousTalks: result.previous_talks,
        additionalInfo: result.additional_info,
        status: result.status,
        createdAt: result.created_at,
        updatedAt: result.updated_at
    };
};

export const getSpeakerNominations = async (): Promise<SpeakerNomination[]> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
        // Return empty array for mock data
        return [];
    }

    const { data, error } = await supabase
        .from('speaker_nominations')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        throw new Error(`Error fetching speaker nominations: ${error.message}`);
    }

    // Transform database results to match frontend types
    return data.map(item => ({
        id: item.id,
        speakerName: item.speaker_name,
        speakerEmail: item.speaker_email,
        speakerPhone: item.speaker_phone,
        speakerWebsite: item.speaker_website,
        speakerBio: item.speaker_bio,
        speakerAchievements: item.speaker_achievements,
        talkTitle: item.talk_title,
        talkDescription: item.talk_description,
        talkDuration: item.talk_duration,
        talkRelevance: item.talk_relevance,
        nominatorName: item.nominator_name,
        nominatorEmail: item.nominator_email,
        nominatorPhone: item.nominator_phone,
        nominatorRelation: item.nominator_relation,
        previousTalks: item.previous_talks,
        additionalInfo: item.additional_info,
        status: item.status,
        createdAt: item.created_at,
        updatedAt: item.updated_at
    }));
};

export const getSpeakerNominationById = async (id: string): Promise<SpeakerNomination> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
        throw new Error('Mock data not available for this operation');
    }

    const { data, error } = await supabase.from('speaker_nominations').select('*').eq('id', id).single();

    if (error) {
        throw new Error(`Error fetching speaker nomination: ${error.message}`);
    }

    // Transform database result to match frontend types
    return {
        id: data.id,
        speakerName: data.speaker_name,
        speakerEmail: data.speaker_email,
        speakerPhone: data.speaker_phone,
        speakerWebsite: data.speaker_website,
        speakerBio: data.speaker_bio,
        speakerAchievements: data.speaker_achievements,
        talkTitle: data.talk_title,
        talkDescription: data.talk_description,
        talkDuration: data.talk_duration,
        talkRelevance: data.talk_relevance,
        nominatorName: data.nominator_name,
        nominatorEmail: data.nominator_email,
        nominatorPhone: data.nominator_phone,
        nominatorRelation: data.nominator_relation,
        previousTalks: data.previous_talks,
        additionalInfo: data.additional_info,
        status: data.status,
        createdAt: data.created_at,
        updatedAt: data.updated_at
    };
};

export const updateSpeakerNominationStatus = async (id: string, status: string): Promise<SpeakerNomination> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
        throw new Error('Mock data not available for this operation');
    }

    const { data, error } = await supabase
        .from('speaker_nominations')
        .update({
            status,
            updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        throw new Error(`Error updating speaker nomination: ${error.message}`);
    }

    // Transform database result to match frontend types
    return {
        id: data.id,
        speakerName: data.speaker_name,
        speakerEmail: data.speaker_email,
        speakerPhone: data.speaker_phone,
        speakerWebsite: data.speaker_website,
        speakerBio: data.speaker_bio,
        speakerAchievements: data.speaker_achievements,
        talkTitle: data.talk_title,
        talkDescription: data.talk_description,
        talkDuration: data.talk_duration,
        talkRelevance: data.talk_relevance,
        nominatorName: data.nominator_name,
        nominatorEmail: data.nominator_email,
        nominatorPhone: data.nominator_phone,
        nominatorRelation: data.nominator_relation,
        previousTalks: data.previous_talks,
        additionalInfo: data.additional_info,
        status: data.status,
        createdAt: data.created_at,
        updatedAt: data.updated_at
    };
};

// React Query hooks
export const useCreateSpeakerNomination = () => {
    return useMutation({
        mutationFn: createSpeakerNomination
    });
};

export const useGetSpeakerNominations = () => {
    return useQuery({
        queryKey: ['speaker-nominations'],
        queryFn: getSpeakerNominations
    });
};

export const useGetSpeakerNominationById = (id: string) => {
    return useQuery({
        queryKey: ['speaker-nomination', id],
        queryFn: () => getSpeakerNominationById(id),
        enabled: !!id
    });
};

export const useUpdateSpeakerNominationStatus = () => {
    return useMutation({
        mutationFn: ({ id, status }: { id: string; status: string }) => updateSpeakerNominationStatus(id, status)
    });
};
