export interface EventDetails {
    id: string;
    name: string;
    tagline: string;
    theme: string;
    date: string;
    time: string;
    venue: string;
    location: string;
    expectedAttendees: number;
    registrationUrl: string;
    partnershipUrl: string;
    calendarUrl: string;
    directionsUrl: string;
}

export interface EventStats {
    speakers: number;
    attendees: number;
    yearsRunning: number;
    sessions: number;
}
