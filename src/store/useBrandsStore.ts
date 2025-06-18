import { create } from "zustand";
import { BrandsType } from "../utils/types";

type Store = {
    brands: BrandsType[];
    setBrands: (brands: BrandsType[]) => void;
}

export const useBrandsStore = create<Store>((set) => ({
    brands: [],
    setBrands: (brands) => set({brands})
})) 