import { create } from "zustand";
import { BrandsType } from "../utils/types";

type Store = {
    brand: BrandsType;
    setBrand: (brand: BrandsType) => void;
}

export const useBrandStore = create<Store>((set) => ({
    brand: {
        name: "",
    },
    setBrand: (brand) => set({brand})
})) 