import { create } from "zustand";
import { AromasType } from "../utils/types";

type Store = {
    aroma: AromasType;
    setAroma: (aroma: AromasType) => void;
}

export const useAromaStore = create<Store>((set) => ({
    aroma: {
        name: "",
        price: 0
    },
    setAroma: (aroma) => set({aroma})
})) 