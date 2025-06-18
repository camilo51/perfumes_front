import { create } from "zustand";
import { AromasType } from "../utils/types";

type Store = {
    aromas: AromasType[];
    setAromas: (aromas: AromasType[]) => void;
}

export const useAromasStore = create<Store>((set) => ({
    aromas: [],
    setAromas: (aromas) => set({aromas})
})) 