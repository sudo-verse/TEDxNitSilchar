export interface Venue {
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    description: string;
    capacity: number;
    facilities: string[];
    images: string[];
    coordinates: {
        lat: number;
        lng: number;
    };
    directionsUrl: string;
}
