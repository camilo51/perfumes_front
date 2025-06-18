import { create } from "zustand";
import { CategoriesType } from "../utils/types";

type Store = {
    categories: CategoriesType[];
    setCategories: (categories: CategoriesType[]) => void;
}

export const useCategoriesStore = create<Store>((set) => ({
    categories: [],
    setCategories: (categories) => set({categories})
})) 