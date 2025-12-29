export interface Ticket {
    id: string;
    ticketType: string;
    name: string;
    email: string;
    phone: string;
    organization?: string;
    dietary?: string;
    price: number;
    processingFee: number;
    totalAmount: number;
    status: string;
    purchasedAt: string;
    updatedAt: string;
}

export interface CreateTicketInput {
    ticketType: string;
    name: string;
    email: string;
    phone: string;
    organization?: string;
    dietary?: string;
    price: number;
    processingFee: number;
    totalAmount: number;
}

export interface UpdateTicketInput extends Partial<CreateTicketInput> {
    status?: string;
}
