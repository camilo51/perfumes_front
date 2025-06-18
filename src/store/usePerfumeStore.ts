import { create } from "zustand";
import { PerfumesType } from "../utils/types";

type Store = {
    perfume: PerfumesType;
    setPerfume: (perfume: PerfumesType) => void;
}

export const usePerfumeStore = create<Store>((set) => ({
    perfume: {
        name: "",
        price: 0,
        description: "",
        image: "",
        stock: 0,
        categories: [], 
        aromas: [],
        brand: 0,
    },
    setPerfume: (perfume) => set({perfume})
}))