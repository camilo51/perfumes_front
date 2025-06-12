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
    categories: [number];
    brand: null | string;
}

export type CategoriesType = {
    id: number;
    name: string;
}