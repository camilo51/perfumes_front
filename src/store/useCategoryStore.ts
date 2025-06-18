import { create } from "zustand";
import { CategoriesType } from "../utils/types";

type Store = {
    category: CategoriesType;
    setCategory: (category: CategoriesType) => void;
}

export const useCategoryStore = create<Store>((set) => ({
    category: {
        name: "",
    },
    setCategory: (category) => set({category})
})) 