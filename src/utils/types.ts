export type UserType = {
    id: number;
    name: string;
    email: string;
    phone: string;
    address?: string;
    role: number;
}



export type PerfumesType = {
    id?: number;
    name: string;
    price: number;
    description: string;
    image: string;
    stock: number;
    categories: number[];
    aromas: number[];
    brand: number;
}

export type CategoriesType = {
    id?: number;
    name: string;
}

export type AromasType = Pick<CategoriesType, "id" | "name"> & {
    price: number;
};
export type BrandsType = Pick<CategoriesType, "id" | "name">;

export type FiltersPerfumesType = {
    price: string;
    categories: number[];
    aromas: number[];
    brand: number | undefined; 
}