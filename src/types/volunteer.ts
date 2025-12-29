export interface VolunteerApplication {
    id: string;
    name: string;
    email: string;
    phone: string;
    university: string;
    year?: string;
    selectedRoles: string[];
    experience?: string;
    motivation: string;
    availability: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateVolunteerApplicationInput {
    name: string;
    email: string;
    phone: string;
    university: string;
    year?: string;
    selectedRoles: string[];
    experience?: string;
    motivation: string;
    availability: string;
}

export interface UpdateVolunteerApplicationInput extends Partial<CreateVolunteerApplicationInput> {
    status?: string;
}
