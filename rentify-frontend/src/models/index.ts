export interface IProperty {
    _id: string;
    owner: string;
    place: string;
    area: string;
    bedrooms: number;
    bathrooms: number;
    nearbyAmenities: string;
    likes: number;
}

export interface IUser {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    isSeller: boolean;
    likedProperties: string[];
}