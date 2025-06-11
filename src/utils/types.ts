export type UserType = {
    id: number;
    name: string;
    email: string;
    phone: string;
    address?: string;
    role: number;
}

export type PerfumesType = {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    category: null | string;
    brand: null | string;
}