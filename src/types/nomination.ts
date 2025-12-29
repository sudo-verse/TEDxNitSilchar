export interface SpeakerNomination {
    id: string;
    // Speaker Information
    speakerName: string;
    speakerEmail?: string;
    speakerPhone?: string;
    speakerWebsite?: string;
    speakerBio: string;
    speakerAchievements: string;
    // Talk Information
    talkTitle: string;
    talkDescription: string;
    talkDuration?: string;
    talkRelevance: string;
    // Nominator Information
    nominatorName: string;
    nominatorEmail: string;
    nominatorPhone?: string;
    nominatorRelation: string;
    // Additional Information
    previousTalks?: string;
    additionalInfo?: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateSpeakerNominationInput {
    // Speaker Information
    speakerName: string;
    speakerEmail?: string;
    speakerPhone?: string;
    speakerWebsite?: string;
    speakerBio: string;
    speakerAchievements: string;
    // Talk Information
    talkTitle: string;
    talkDescription: string;
    talkDuration?: string;
    talkRelevance: string;
    // Nominator Information
    nominatorName: string;
    nominatorEmail: string;
    nominatorPhone?: string;
    nominatorRelation: string;
    // Additional Information
    previousTalks?: string;
    additionalInfo?: string;
}

export interface UpdateSpeakerNominationInput extends Partial<CreateSpeakerNominationInput> {
    status?: string;
}
